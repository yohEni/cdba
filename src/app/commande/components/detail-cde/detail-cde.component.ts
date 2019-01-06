import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { LigneCommandeSrvService } from '../../services/ligne-commande-srv.service';
import { ClientSrvService } from '../../../client/services/client-srv.service';
import { FactureSrvService } from '../../services/facture-srv.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-detail-cde',
  templateUrl: './detail-cde.component.html',
  styleUrls: ['./detail-cde.component.scss']
})
export class DetailCdeComponent implements OnInit, OnDestroy {

  @Input() idCommande: string;
  @Output() apresChangementEvent: EventEmitter<any> = new EventEmitter<any>();
  private ligneCommandeObservable;
  private ligneCommandeSubscription;
  private lignesCommandes;
  private ligneClientCommande;
  public lignesClientsCommandes;
  public ligneDetail;
  private factureObservable;
  private factureSubscription;
  public ligneFacture;
  public ligneAModifier;
  public voirAjoutColis: boolean;

  private clientObservable;
  private clientSubscription;

  constructor(private viewportScroller: ViewportScroller,
              private ligneCommandeSrvService: LigneCommandeSrvService,
              private clientSrvService: ClientSrvService,
              private factureSrvService: FactureSrvService) {
  }

  ngOnInit() {
    this.lignesClientsCommandes = [];
    this.getLignesCommandes(this.idCommande);
    this.trierLignesClientsCommandes();
    this.viewportScroller.scrollToAnchor('titreDetailCommande');
  }

  ngOnDestroy() {
    if (!!this.ligneCommandeSubscription) {
      this.ligneCommandeSubscription.unsubscribe();
    }
    if (!!this.clientSubscription) {
      this.clientSubscription.unsubscribe();
    }
    if (!!this.factureSubscription) {
      this.factureSubscription.unsubscribe();
    }
  }

  /**
   * Récupère les lignes de la commande passée en paramètre
   * @param id id de la commande
   */
  private getLignesCommandes(id: string): void {
    this.ligneCommandeObservable = this.ligneCommandeSrvService.getLignesCommande(id);
    this.ligneCommandeSubscription = this.ligneCommandeObservable.subscribe(
      (l) => {
        this.lignesCommandes = l;
        for (const ligne of this.lignesCommandes) {
          this.clientObservable = this.clientSrvService.getClient(ligne.idClient);
          this.clientSubscription = this.clientObservable.subscribe(
          (c) => {
            this.ligneClientCommande = {
              'ligneCommande': ligne,
              'client': c[0]
            };
            this.lignesClientsCommandes.push(this.ligneClientCommande);
            this.trierLignesClientsCommandes();
          }, (error) => {
            console.log(error);
          }
        );
        }
      }, (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Trie le tableau par date de création des colis
   */
  private trierLignesClientsCommandes(): void {
    this.lignesClientsCommandes.sort((a, b) => {
      return a.ligneCommande.dateCreation - b.ligneCommande.dateCreation;
    });
  }

  /**
   * Emission évènement pour afficher le détail de la ligne
   * @param ligneClientCommande num ligne détail
   */
  public onAfficherDetail(numLigne: string): void {
    this.voirAjoutColis = false;
    this.ligneDetail = this.lignesClientsCommandes[numLigne];
    this.factureObservable = this.factureSrvService.getFacture(this.ligneDetail.ligneCommande.id);
    this.factureSubscription = this.factureObservable.subscribe(
      (f) => {
        this.ligneFacture = f[0];
      }, (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Vide la variable détail
   */
  public setNoDetail() {
    this.ligneDetail = null;
    this.ligneFacture = null;
  }

  /**
   * Affiche le formulaire d'ajout de colis
   */
  public ajouterColis(): void {
    this.voirAjoutColis = true;
  }

  /**
   * Masque le détail et affiche le formulaire de modif
   * @param ligne ligneCommande à modifier
   */
  public modifierColis(ligne: any): void {
    this.ligneAModifier = ligne;
    this.setNoDetail();
    this.voirAjoutColis = true;
  }

  /**
   * Masque le formulaire d'ajout de colis
   */
  public setNoAjout(): void {
    this.voirAjoutColis = false;
  }

  /**
   * Raffraichit le tableau suite à l'ajout d'un colis
   */
  public refresh(): void {
    this.voirAjoutColis = false;
    this.setNoDetail();
    this.lignesClientsCommandes.length = 0;
    this.getLignesCommandes(this.idCommande);
    // Appel de nouveau le tri pour éviter pb de la dernière ligne
    // TOFIX
    this.trierLignesClientsCommandes();
    this.apresChangementEvent.emit();
    // TOFIX : disparition affichage numCommande
  }
}

import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { LigneCommandeSrvService } from '../../services/ligne-commande-srv.service';
import { ClientSrvService } from '../../../client/services/client-srv.service';
import { FactureSrvService } from '../../services/facture-srv.service';

@Component({
  selector: 'app-detail-cde',
  templateUrl: './detail-cde.component.html',
  styleUrls: ['./detail-cde.component.scss']
})
export class DetailCdeComponent implements OnInit, OnDestroy {

  @Input() idCommande: string;
  private ligneCommandeObservable;
  private ligneCommandeSubscription;
  private lignesCommandes;
  private ligneClientCommande;
  public lignesClientsCommandes;
  public ligneDetail;
  private factureObservable;
  private factureSubscription;
  public ligneFacture;

  public voirAjoutColis: boolean;

  private clientObservable;
  private clientSubscription;

  // Bouchon
  refCde = 1;
  cde = [];

  constructor(private ligneCommandeSrvService: LigneCommandeSrvService,
              private clientSrvService: ClientSrvService, private factureSrvService: FactureSrvService) {
  }

  ngOnInit() {
    this.lignesClientsCommandes = [];
    this.getLignesCommandes(this.idCommande);
    // this.setBouchon();
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
          }, (error) => {
            console.log(error);
          }
        );
        }
      }, (error) => {
        console.log(error);
      }
    );
    console.log(this.lignesClientsCommandes);
  }

  /**
   * Emission évènement pour afficher le détail de la ligne
   * @param ligneClientCommande num ligne détail
   */
  public onAfficherDetail(numLigne: string): void {
    this.ligneDetail = this.lignesClientsCommandes[numLigne];
    this.factureObservable = this.factureSrvService.getFacture(this.ligneDetail.ligneCommande.id);
    this.factureSubscription = this.factureObservable.subscribe(
      (f) => {
        this.ligneFacture = f[0];
        console.log('ligneFacture :');
        console.log(this.ligneFacture);
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
    this.getLignesCommandes(this.idCommande);
  }

  /**
   * Bouchon
   */
  private setBouchon(): void {
    const client1 = {
      id : 1,
      nom : 'DUPOND',
      prenom : 'Jean',
      ville : 'Sérent',
      telephone : '06 12 34 56 78',
      colis : '15 Kg',
      statut : 'En attente',
      label : 'info'
    };
    const client2 = {
      id : 2,
      nom : 'MARTIN',
      prenom : 'Paul',
      ville : 'Malestroit',
      telephone : '02 97 74 12 34',
      colis : '12 Kg',
      statut : 'Livré',
      label : 'warning'
    };
    const client3 = {
      id : 3,
      nom : 'DURAND',
      prenom : 'Eric',
      ville : 'Lizio',
      telephone : '06 12 34 56 78',
      colis : '20 Kg',
      statut : 'Payé',
      label : 'success'
    };
    this.cde.push(client1, client2, client3);
  }

}

import { Component, OnInit, OnDestroy, Output, EventEmitter, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientSrvService } from '../../../client/services/client-srv.service';
import { LigneCommande } from 'src/app/shared/modeles/ligne-commande.model';
import { LigneCommandeSrvService } from '../../services/ligne-commande-srv.service';
import { PrixSrvService } from '../../services/prix-srv.service';
import { FactureSrvService } from '../../services/facture-srv.service';
import { TvaSrvService } from '../../services/tva-srv.service';

@Component({
  selector: 'app-ajouter-colis',
  templateUrl: './ajouter-colis.component.html',
  styleUrls: ['./ajouter-colis.component.scss']
})
export class AjouterColisComponent implements OnInit, OnDestroy {

  @Output() fermerDetail: EventEmitter<any> = new EventEmitter<any>();
  @Input() idCommandeColis;
  private clientsObservable;
  private clientsSubscription;
  public clients;

  private ligneCommandeObservable;
  private ligneCommandeSubscription;
  public ligneCommande;
  public isBourguignonTransforme;
  public isPotAuFeuTransforme;
  private idLigneCommande: string;

  private prixEstimeObservable;
  private prixEstimeSubscription;
  private idPrix: string;

  private tvaObservable;
  private tvaSubscription;
  private idTva: string;

  private factureObservable;
  private factureSubscription;
  private ligneFacture;

  private truc;

  constructor(private clientSrvService: ClientSrvService,
              private ligneCommandeSrvService: LigneCommandeSrvService,
              private prixSrvService: PrixSrvService,
              private factureService: FactureSrvService,
              private tvaService: TvaSrvService) { }

  ngOnInit() {
    this.getClients();
    this.ligneCommande = new LigneCommande('', this.idCommandeColis, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    this.isBourguignonTransforme = false;
    this.isPotAuFeuTransforme = false;
  }

  ngOnDestroy() {
    if (!!this.clientsSubscription) {
      this.clientsSubscription.unsubscribe();
    }
    if (!!this.ligneCommandeSubscription) {
      this.ligneCommandeSubscription.unsubscribe();
    }
    if (!!this.prixEstimeSubscription) {
      this.prixEstimeSubscription.unsubscribe();
    }
    if (!!this.tvaSubscription) {
      this.tvaSubscription.unsubscribe();
    }
    if (!!this.factureSubscription) {
      this.factureSubscription.unsubscribe();
    }
  }

  /**
   * Validation du formulaire : sauvegarde du colis
   */
  private onSubmit(): void {
    this.setInfos();
    console.log(this.ligneCommande);
  }

  /**
   * Récupère les clients
   */
  private getClients(): void {
    this.clientsObservable = this.clientSrvService.getClients();
    this.clientsSubscription = this.clientsObservable.subscribe(
      (c) => {
        this.clients = c;
      }, (error) => {
        console.log(error);
    }
    );
  }

  /**
   * Complète les infos du colis
   */
  private setInfos(): void {
    this.checkTransformation();
    const date = new Date().toString();
    this.ligneCommande.dateCommande = date;
    this.ligneCommande.dateCreation = date;
    this.ligneCommande.dateModification = date;
    this.ligneCommande.auteurCreation = 1;
    this.ligneCommande.auteurModification = 1;
    // TODO : changer système de statut
    this.ligneCommande.titreStatut = 'En cours';
    this.setPrixEstime();
  }

  /**
   * Affecte 0 si les valeurs sont vides
   */
  private checkTransformation(): void {
    if (this.ligneCommande.bourguignonSteakHache.length === 0) {
      this.ligneCommande.bourguignonSteakHache = 0;
    }
    if (this.ligneCommande.bourguignonVrac.length === 0) {
      this.ligneCommande.bourguignonVrac = 0;
    }
    if (this.ligneCommande.potAuFeuSteakHache.length === 0) {
      this.ligneCommande.potAuFeuSteakHache = 0;
    }
    if (this.ligneCommande.potAuFeuVrac.length === 0) {
      this.ligneCommande.potAuFeuVrac = 0;
    }
  }

  /**
   * Calcule le prix estime du colis
   */
  private setPrixEstime(): void {
    this.prixEstimeObservable = this.prixSrvService.getPrixActif();
    this.prixEstimeSubscription = this.prixEstimeObservable.subscribe(
      (p) => {
        this.idPrix = p[0].id;
        console.log(`id prix : ${p[0].id}`);
        console.log(`prix HT : ${p[0].prix_ht}`);
        this.ligneCommande.prixEstime = p[0].prix_ht * this.ligneCommande.poidsColis;
        console.log(`prix estimé : ${this.ligneCommande.prixEstime}`);
        if (!!this.ligneCommande.prixEstime) {
          this.sauvColis();
        } else {
          console.log('Erreur lors du calcul du prix estimé du colis');
        }
      }, (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Sauvegarde le colis
   */
  private sauvColis(): void {
    this.ligneCommandeObservable = this.ligneCommandeSrvService.addLigneCommande(this.ligneCommande);
    this.ligneCommandeSubscription = this.ligneCommandeObservable.subscribe(
      (l) => {
        console.log(`réponse insert : ${l.insertedId}`);
        // TODO : tester que l'ajout ait fonctionné
        // TODO : puis créer la ligne facture
        if (!!l && !!l.insertedId) {
          this.idLigneCommande = l.insertedId;
          this.getTva();
        }
        // TODO : puis fermer le détail et raffraichir la liste des lignesCommande
      }, (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Récupère la TVA active
   */
  private getTva(): void {
    this.tvaObservable = this.tvaService.getTvaActive();
    this.tvaSubscription = this.tvaObservable.subscribe(
      (t) => {
        if (!!t && !!t[0].id) {
          console.log(`idTva : ${t[0].id}`);
          this.idTva = t[0].id;
          this.createFacture();
        }
      }, (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Sauvegarde la facture
   * @param idLigneCommande id de la commande insérée en BDD
   */
  private createFacture(): void {
    this.ligneFacture = [{
      idLigneCommande: this.idLigneCommande,
      idPrix: this.idPrix,
      idTva: this.idTva,
      prixEstime: this.ligneCommande.prixEstime,
      idStatut: '1',
      auteurCreation: '1',
      auteurModification: '1'
    }];
    console.log(this.ligneFacture);
    this.factureObservable = this.factureService.addFacture(this.ligneFacture);
    this.factureSubscription = this.factureObservable.subscribe(
      (f) => {
        console.log(f);
        // TODO : récup id facture ?
      }, (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Ferme le formulaire d'ajout
   */
  public annulerAjout(): void {
    this.fermerDetail.emit();
  }

}

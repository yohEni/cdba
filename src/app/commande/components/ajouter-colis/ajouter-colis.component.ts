import { Component, OnInit, OnDestroy, Output, EventEmitter, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientSrvService } from '../../../client/services/client-srv.service';
import { LigneCommande } from 'src/app/shared/modeles/ligne-commande.model';
import { LigneCommandeSrvService } from '../../services/ligne-commande-srv.service';
import { PrixSrvService } from '../../services/prix-srv.service';
import { FactureSrvService } from '../../services/facture-srv.service';
import { TvaSrvService } from '../../services/tva-srv.service';
import { ViewportScroller } from '@angular/common';
import { Observable } from 'rxjs';
import { StatutSrvService } from '../../services/statut-srv.service';

@Component({
  selector: 'app-ajouter-colis',
  templateUrl: './ajouter-colis.component.html',
  styleUrls: ['./ajouter-colis.component.scss']
})
export class AjouterColisComponent implements OnInit, OnDestroy {

  @Output() fermerAjout: EventEmitter<any> = new EventEmitter<any>();
  @Output() apresAjout: EventEmitter<any> = new EventEmitter<any>();
  @Input() idCommandeColis;
  @Input() ligneCommandeInitiale;
  private clientsObservable;
  private clientsSubscription;
  public clients;

  private statutsObservable;
  private statutsSubscription;
  public statuts;

  private ligneCommandeObservable;
  private ligneCommandeSubscription;
  public ligneCommande;
  public isBourguignonTransforme = false;
  public isPotAuFeuTransforme = false;
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

  public txtTitre: string;
  public txtBtnAjouter: string;
  public msgOk: string;
  public msgKo: string;

  public modeModification  = false;

  public showAjouterClient: boolean;

  constructor(private viewportScroller: ViewportScroller,
              private clientSrvService: ClientSrvService,
              private statutSrvService: StatutSrvService,
              private ligneCommandeSrvService: LigneCommandeSrvService,
              private prixSrvService: PrixSrvService,
              private factureService: FactureSrvService,
              private tvaService: TvaSrvService) { }

  ngOnInit() {
    this.getClients();
    this.getStatuts();
    this.ligneCommande = new LigneCommande();
    this.ligneCommande.idCommande = this.idCommandeColis;
    this.ligneCommande.idStatut = '1';
    this.viewportScroller.scrollToAnchor('titreAjouterUnColis');
    this.checkIfModif();
  }

  ngOnDestroy() {
    if (!!this.clientsSubscription) {
      this.clientsSubscription.unsubscribe();
    }
    if (!!this.statutsSubscription) {
      this.statutsSubscription.unsubscribe();
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
   * Charge les variables si on est en modification de colis
   */
  private checkIfModif(): void {
    if (!!this.ligneCommandeInitiale) {
      this.ligneCommande = this.ligneCommandeInitiale[0];
      this.ligneFacture = this.ligneCommandeInitiale[1];
      this.modeModification = true;
      if (!!this.ligneCommande.bourguignonVrac || !!this.ligneCommande.bourguignonSteakHache) {
        this.isBourguignonTransforme = true;
      }
      if (!!this.ligneCommande.potAuFeuVrac || !!this.ligneCommande.potAuFeuSteakHache) {
        this.isPotAuFeuTransforme = true;
      }
      this.txtTitre = ' Modifier le colis';
      this.txtBtnAjouter = ' Modifier le colis';
    } else {
      this.txtTitre = ' Ajouter un colis';
      this.txtBtnAjouter = ' Ajouter le colis';
    }
  }

  /**
   * Validation du formulaire : sauvegarde du colis
   */
  private onSubmit(): void {
    this.msgKo = '';
    this.setInfos();
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
        this.setMsgKo('Une erreur est survenue lors de la récupération de la liste des clients');
    }
    );
  }

  /**
   * Récupère la liste des statuts
   */
  private getStatuts(): void {
    this.statutsObservable = this.statutSrvService.getStatuts();
    this.statutsSubscription = this.statutsObservable.subscribe(
      (s) => {
        this.statuts = s;
      }, (error) => {
        console.log(error);
        this.setMsgKo('Une erreur est survenue lors de la récupération de la liste des statuts');
      }
    );
  }

  /**
   * Complète les infos du colis
   */
  private setInfos(): void {
    this.checkTransformation();
    if (!this.msgKo || this.msgKo.length === 0) {
      const date = new Date().toString();
      if (!this.modeModification) {
        this.ligneCommande.dateCommande = date;
        this.ligneCommande.auteurCreation = 1;
      }
      this.ligneCommande.auteurModification = 1;
      this.setPrixEstime();
    }
  }

  /**
   * Affecte 0 si les valeurs sont vides
   * Vérifie que le total de la transformation ne dépasse pas 100
   */
  private checkTransformation(): void {
    /*
    if (!!this.ligneCommande.bourguignonSteakHache && this.ligneCommande.bourguignonSteakHache.length === 0) {
      this.ligneCommande.bourguignonSteakHache = 0;
    }
    if (!!this.ligneCommande.bourguignonVrac && this.ligneCommande.bourguignonVrac.length === 0) {
      this.ligneCommande.bourguignonVrac = 0;
    }
    if (!!this.ligneCommande.potAuFeuSteakHache && this.ligneCommande.potAuFeuSteakHache.length === 0) {
      this.ligneCommande.potAuFeuSteakHache = 0;
    }
    if (!!this.ligneCommande.potAuFeuVrac && this.ligneCommande.potAuFeuVrac.length === 0) {
      this.ligneCommande.potAuFeuVrac = 0;
    }
    */
    if (this.ligneCommande.bourguignonSteakHache + this.ligneCommande.bourguignonVrac > 100) {
      this.msgKo = 'Le total de la transformation bourguignon ne peut pas dépasser 100%';
    }
    if (this.ligneCommande.potAuFeuSteakHache + this.ligneCommande.potAuFeuVrac > 100) {
      this.msgKo = 'Le total de la transformation pot au feu ne peut pas dépasser 100%';
    }
    if (this.isBourguignonTransforme && (this.ligneCommande.bourguignonSteakHache + this.ligneCommande.bourguignonVrac) === 0) {
      this.msgKo = 'Merci de préciser le % de transformation du bourguignon';
    }
    if (this.isPotAuFeuTransforme && (this.ligneCommande.potAuFeuSteakHache + this.ligneCommande.potAuFeuVrac) === 0) {
      this.msgKo = 'Merci de préciser le % de transformation du pot au feu';
    }
  }

  /**
   * Calcule le prix estime du colis
   */
  private setPrixEstime(): void {
    const msgErreur = 'Erreur lors du calcul du prix estimé du colis';
    this.prixEstimeObservable = this.prixSrvService.getPrixActif();
    this.prixEstimeSubscription = this.prixEstimeObservable.subscribe(
      (p) => {
        this.idPrix = p[0].id;
        this.ligneCommande.prixEstime = p[0].prix_ht * this.ligneCommande.poidsColis;
        if (!!this.ligneCommande.prixEstime) {
          this.sauvColis();
        } else {
          console.log(msgErreur);
          this.setMsgKo(msgErreur);
        }
      }, (error) => {
        console.log(error);
        this.setMsgKo(`${msgErreur} : ${error}`);
      }
    );
  }

  /**
   * Sauvegarde le colis
   */
  private sauvColis(): void {
    if (!this.modeModification) {
      this.ligneCommandeObservable = this.ligneCommandeSrvService.addLigneCommande(this.ligneCommande);
      this.ligneCommandeSubscription = this.ligneCommandeObservable.subscribe(
      (l) => {
        if (!!l && !!l.insertedId) {
          this.idLigneCommande = l.insertedId;
          this.getTva();
        }
      }, (error) => {
        console.log(error);
        this.setMsgKo('Erreur lors de l\'ajout du colis');
      }
      );
    } else {
      this.ligneCommandeObservable = this.ligneCommandeSrvService.editLigneCommande(this.ligneCommande);
      this.ligneCommandeSubscription = this.ligneCommandeObservable.subscribe(
      (l) => {
        if (!!l) {
          this.getTva();
        }
      }, (error) => {
        console.log(error);
        this.setMsgKo('Erreur lors de la modification du colis');
      }
      );
    }
  }

  /**
   * Récupère la TVA active
   */
  private getTva(): void {
    this.tvaObservable = this.tvaService.getTvaActive();
    this.tvaSubscription = this.tvaObservable.subscribe(
      (t) => {
        if (!!t && !!t[0].id) {
          this.idTva = t[0].id;
          if (!this.modeModification) {
            this.createFacture();
          } else {
            this.editFacture();
          }
        }
      }, (error) => {
        console.log(`erreur de getTva : ${error}`);
        this.setMsgKo(`Erreur dans la récupération de la TVA : ${error}`);
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
    this.factureObservable = this.factureService.addFacture(this.ligneFacture);
    this.factureSubscription = this.factureObservable.subscribe(
      (f) => {
        if (!!f && !!f.insertedId) {
          this.ligneFacture.id = f.insertedId;
        }
        this.setMsgOk('Colis ajouté avec succès');
        // this.apresAjout.emit();
        // TODO : ou plutôt changer l'intitulé des boutons et proposer un update ?
      }, (error) => {
        console.log(error);
        this.setMsgKo('Erreur lors de la création de la facture');
      }
    );
  }

  /**
   * Modifie la facture
   */
  private editFacture(): void {
    this.ligneFacture.prixEstime = this.ligneCommande.prixEstime;
    this.ligneFacture.idStatut = '1';
    this.ligneFacture.auteurModification = '1';
    this.factureObservable = this.factureService.editFacture(this.ligneFacture);
    this.factureSubscription = this.factureObservable.subscribe(
      (f) => {
        this.setMsgOk('Colis modifié avec succès');
        this.apresAjout.emit();
        // TODO : ou plutôt changer l'intitulé des boutons et proposer un update ?
      }, (error) => {
        console.log(error);
        this.setMsgKo('Erreur lors de la modification de la facture');
      }
    );
  }

  /**
   * @param msg Affiche le message OK
   */
  private setMsgOk(msg: string) {
    this.msgKo = null;
    this.msgOk = msg;
  }

  /**
   * @param msg Affiche le message KO
   */
  private setMsgKo(msg: string) {
    this.msgOk = null;
    this.msgKo = msg;
  }

  /**
   * Affiche le formulaire ajout client
   */
  public onAjouterClient(): void {
    // TODO : verifier si technique propre
    this.showAjouterClient = true;
  }

  /**
   * Raffraichit la liste des clients et sélectionne celui qui vient d'être ajouté
   */
  public setClientAjoute(idClientAjoute: string): void {
    this.showAjouterClient = false;
    this.getClients();
    this.ligneCommande.idClient = idClientAjoute;
  }

  /**
   * Ferme le formulaire d'ajout
   */
  public annulerAjout(): void {
    this.fermerAjout.emit();
  }

}

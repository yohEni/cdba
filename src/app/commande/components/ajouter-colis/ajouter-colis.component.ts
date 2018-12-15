import { Component, OnInit, OnDestroy, Output, EventEmitter, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientSrvService } from '../../../client/services/client-srv.service';
import { LigneCommande } from 'src/app/shared/modeles/ligne-commande.model';
import { LigneCommandeSrvService } from '../../services/ligne-commande-srv.service';
import { PrixSrvService } from '../../services/prix-srv.service';

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

  private prixEstimeObservable;
  private prixEstimeSubscription;

  constructor(private clientSrvService: ClientSrvService,
              private ligneCommandeSrvService: LigneCommandeSrvService,
              private prixSrvService: PrixSrvService) { }

  ngOnInit() {
    this.getClients();
    this.ligneCommande = new LigneCommande('', this.idCommandeColis, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  }

  ngOnDestroy() {
    if (!!this.clientsSubscription) {
      this.clientsSubscription.unsubscribe();
    }
    if (!!this.ligneCommandeSubscription) {
      this.ligneCommandeSubscription.unsubscribe();
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
   * Calcule le prix estime du colis
   */
  private setPrixEstime(): void {
    this.prixEstimeObservable = this.prixSrvService.getPrixActif();
    this.prixEstimeSubscription = this.prixEstimeObservable.subscribe(
      (p) => {
        console.log(`prix HT : ${p[0].prix_ht}`);
        this.ligneCommande.prixEstime = p[0].prix_ht * this.ligneCommande.poidsColis;
        console.log(`prix estimé : ${this.ligneCommande.prixEstime}`);
        if (!!this.ligneCommande.prixEstime) {
          // TODO : fix pb CORS quand pt au feu est vide et commentaire aussi
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
        console.log(l);
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

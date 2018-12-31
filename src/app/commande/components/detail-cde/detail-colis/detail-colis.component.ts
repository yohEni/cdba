import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LigneCommandeSrvService } from 'src/app/commande/services/ligne-commande-srv.service';
import { FactureSrvService } from 'src/app/commande/services/facture-srv.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-detail-colis',
  templateUrl: './detail-colis.component.html',
  styleUrls: ['./detail-colis.component.scss']
})
export class DetailColisComponent implements OnInit, OnDestroy {

  @Input() ligneCommandeClient: any;
  @Input() facture: any;
  @Output() fermerDetail: EventEmitter<any> = new EventEmitter<any>();
  @Output() modifierEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() apresSuppression: EventEmitter<any> = new EventEmitter<any>();

  closeResult: string;

  ligneCommandeObservable;
  ligneCommandeSubscription;
  factureObservable;
  factureSubscription;

  refCde = 1;
  dateCde = 'samedi 04/02/18 10:15';
  poidsReelColis = 15.5;
  transBourguignon = '50% steak haché';
  coteFondue = 'Côte';
  prixColis = 172.05;
  statutCde = 'En attente de règlement';
  msgClient = 'Bonjour Annick, si tu as des abats cela m\'intéresse aussi. Merci';
  commentaire = 'Passera samedi 17 à 16h. Ajouter un paquet de foie.';
  client1;

  constructor(private viewportScroller: ViewportScroller,
              private modalService: NgbModal,
              private ligneCommandeSrvService: LigneCommandeSrvService,
              private factureSrvService: FactureSrvService) {
  }

  ngOnInit() {
    this.viewportScroller.scrollToAnchor('titreDetailColis');
    // this.setBouchon();
  }

  ngOnDestroy() {
    if (!!this.ligneCommandeSubscription) {
      this.ligneCommandeSubscription.unsubscribe();
    }
    if (!!this.factureSubscription) {
      this.factureSubscription.unsubscribe();
    }
  }

  /**
   * Affiche la modale de confirmation de suppression du colis
   * @param modaleSuppressionColis id de la modale
   */
  private open(modaleSuppressionColis) {
    this.modalService.open(modaleSuppressionColis, {ariaLabelledBy: 'Confirmation de suppression du colis'}).result.then((result) => {
      this.closeResult = result;
      if (this.closeResult === 'Supprimer') {
        this.supprimerFacture();
      }
    }, (reason) => {
      this.closeResult = this.getDismissReason(reason);
    });
  }

  /**
   * Interprétation de la raison de la fermeture de la modale
   * @param reason raison de la fermeture
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'en pressant ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `avec: ${reason}`;
    }
  }

  /**
   * Supprime la facture associée au colis (si elle existe)
   */
  private supprimerFacture() {
    if (!!this.facture && !!this.facture.id) {
      console.log(`appel de la suppression pour l\'id ${this.facture.id} de la facture`);
      this.factureObservable = this.factureSrvService.removeFacture(this.facture.id);
      this.factureSubscription = this.factureObservable.subscribe(
        (f) => {
          console.log(f);
          if (!!f) {
            this.supprimerColis();
          }
        }, (error) => {
          console.log('Erreur lors de la suppression de la facture associée au colis');
          console.log(error);
        }
      );
    } else {
      console.log('Pas de facture existante pour ce colis');
      this.supprimerColis();
    }
  }

  /**
   * Supprime le colis
   */
  private supprimerColis() {
    console.log(`appel de la suppression pour l\'idLigneCommande ${this.ligneCommandeClient.ligneCommande.id}`);
    this.ligneCommandeObservable = this.ligneCommandeSrvService.removeLigneCommande(this.ligneCommandeClient.ligneCommande.id);
    this.ligneCommandeSubscription = this.ligneCommandeObservable.subscribe(
    (l) => {
      console.log(l);
      this.apresSuppression.emit(event);
    }, (error) => {
      console.log('Erreur lors de la suppression du colis');
      console.log(error);
    }
    );
  }

  /**
   * Emet un event avec la ligne à modifier
   */
  public modifierColis() {
    this.modifierEvent.emit([this.ligneCommandeClient.ligneCommande, this.facture]);
  }

  /**
   * Masque le détail
   */
  public onFermer(event: any) {
    this.fermerDetail.emit(event);
  }

  /**
   * Bouchon
   */
  private setBouchon(): void {
    this.client1 = {
      id : 1,
      nom : 'DUPOND',
      prenom : 'Jean',
      adresse : '12 rue du Bois Vert',
      codePostal : '56460',
      ville : 'Sérent',
      telephone1 : '06 12 34 56 78',
      telephone2 : '06 12 34 56 78',
      mail : 'jean.dupond@orange.fr',
      colis : '15 Kg',
      statut : 'En attente',
      label : 'info'
    };
  }

}

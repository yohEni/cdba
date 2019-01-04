import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ClientSrvService } from '../../services/client-srv.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss']
})
export class DetailClientComponent implements OnInit, OnDestroy {

  @Input() client: any;
  @Output() fermerDetail: EventEmitter<any> = new EventEmitter<any>();
  @Output() modifierEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() apresSuppression: EventEmitter<any> = new EventEmitter<any>();

  private lignesCommandesClientObservable;
  private lignesCommandesClientSubscription;
  public lignesCommandesClient;

  closeResult: string;

  constructor(private viewportScroller: ViewportScroller,
              private modalService: NgbModal,
              private clientSrvService: ClientSrvService) { }

  ngOnInit() {
    this.viewportScroller.scrollToAnchor('titreDetailClient');
    this.chargerLignesCommandesClient();
  }

  ngOnDestroy() {
    if (!!this.lignesCommandesClientSubscription) {
      this.lignesCommandesClientSubscription.unsubscribe();
    }
  }

  /**
   * Charge l'historique de commande du client
   */
  private chargerLignesCommandesClient(): void {
    this.lignesCommandesClientObservable = this.clientSrvService.getHistoriqueClient(this.client.id);
    this.lignesCommandesClientSubscription = this.lignesCommandesClientObservable.subscribe(
      (l) => {
        this.lignesCommandesClient = l;
      }, (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Affiche la modale de confirmation de suppression du colis
   * @param modaleSuppressionClient id de la modale
   */
  private open(modaleSuppressionClient) {
    this.modalService.open(modaleSuppressionClient, {ariaLabelledBy: 'Confirmation de suppression du client'}).result.then((result) => {
      this.closeResult = result;
      if (this.closeResult === 'Supprimer') {
        this.supprimerClient();
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
   * Affiche le détail de la ligneCommande
   * @param id id de la ligneCommande
   */
  private onAfficherDetailLigneCommande(id: string) {
    // TODO : Implémenter
  }

  /**
   * Supprime le client
   */
  private supprimerClient(): void {
    // TODO : Implémenter
  }

  /**
   * Emet un event avec la ligne à modifier
   */
  public modifierClient() {
    this.modifierEvent.emit(this.client);
  }

  /**
   * Masque le détail
   */
  public onFermer(event: any) {
    this.fermerDetail.emit(event);
  }

}

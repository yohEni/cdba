import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-colis',
  templateUrl: './detail-colis.component.html',
  styleUrls: ['./detail-colis.component.scss']
})
export class DetailColisComponent implements OnInit {

  @Input() ligneCommandeClient: any;
  @Input() facture: any;
  @Output() fermerDetail: EventEmitter<any> = new EventEmitter<any>();

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

  constructor() {
    // this.setBouchon();
  }

  ngOnInit() {
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

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container-cde',
  templateUrl: './container-cde.component.html',
  styleUrls: ['./container-cde.component.scss']
})
export class ContainerCdeComponent implements OnInit {

  public idCommande: string;

  constructor() { }

  ngOnInit() {

  }

  /**
   * Affecte l'id de la commande reçu par l'event
   * @param id id de la commande
   */
  private setIdCommande(id: string): void {
    this.idCommande = id;
  }

}

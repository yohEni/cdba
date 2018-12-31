import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container-cde',
  templateUrl: './container-cde.component.html',
  styleUrls: ['./container-cde.component.scss']
})
export class ContainerCdeComponent implements OnInit {

  public idCommande: string;
  public commande: JSON[];

  constructor() { }

  ngOnInit() {

  }

  /**
   * Affecte l'id de la commande reçu par l'event
   * @param id id de la commande
   */
  private setIdCommande(id: string): void {
    this.commande = undefined;
    this.idCommande = id;
  }

  /**
   * Affecte la commande reçue comme commande à modifier
   * @param cde commande à modifier
   */
  private setCommande(cde: JSON[]): void {
    this.idCommande = undefined;
    this.commande = cde;
  }

  /**
   * Masque l'ajout / modification
   */
  private annulerAjoutModif(): void {
    this.commande = undefined;
  }

}

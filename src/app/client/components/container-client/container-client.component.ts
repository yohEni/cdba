import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container-client',
  templateUrl: './container-client.component.html',
  styleUrls: ['./container-client.component.scss']
})
export class ContainerClientComponent implements OnInit {

  public client;
  public clientAModifier;
  public showAjoutModif: boolean;

  constructor() { }

  ngOnInit() {
    this.showAjoutModif = false;
  }

  /**
   * Charge le client à détailler
   * @param c client
   */
  private setClient(c: any): void {
    this.clientAModifier = undefined;
    this.showAjoutModif = false;
    this.client = c;
  }

  /**
   * Masque le détail du client
   */
  private fermerDetail(): void {
    this.client = undefined;
  }

  /**
   * Affiche le formulaire d'ajout d'un client
   */
  private showAjout(): void {
    this.client = undefined;
    this.clientAModifier = undefined;
    this.showAjoutModif = true;
  }

  /**
   * Charge le client à modifier
   * @param c client
   */
  private setClientAModifier(c: any): void {
    this.client = undefined;
    this.clientAModifier = c;
    this.showAjoutModif = true;
  }

  /**
   * Ferme la partie Ajout/modif
   */
  private fermerAjout(): void {
    this.clientAModifier = undefined;
    this.showAjoutModif = false;
  }

}

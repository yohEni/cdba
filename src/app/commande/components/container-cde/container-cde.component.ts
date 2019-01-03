import { Component, OnInit, ViewChild } from '@angular/core';
import { SyntheseCdeComponent } from '../synthese-cde/synthese-cde.component';

@Component({
  selector: 'app-container-cde',
  templateUrl: './container-cde.component.html',
  styleUrls: ['./container-cde.component.scss']
})
export class ContainerCdeComponent implements OnInit {

  public idCommande: string;
  public commande: JSON[];
  public showAjoutColis: boolean;
  public showDetailCde: boolean;
  public showAjoutModifCde: boolean;

  @ViewChild(SyntheseCdeComponent) syntheseCdeComponent: SyntheseCdeComponent;

  constructor() { }

  ngOnInit() {
    this.showAjoutColis = false;
    this.showAjoutModifCde = false;
    this.showDetailCde = false;
  }

  /**
   * Affiche l'ajout du colis
   * @param id id de la commande
   */
  private voirAjoutColis(id: string): void {
    this.idCommande = id;
    this.showAjoutModifCde = false;
    this.showDetailCde = false;
    this.showAjoutColis = true;
  }

  /**
   * Affecte l'id de la commande reçu par l'event
   * @param id id de la commande
   */
  private voirDetail(id: string): void {
    this.commande = undefined;
    this.showAjoutModifCde = false;
    this.showAjoutColis = false;
    this.showDetailCde = true;
    this.idCommande = id;
  }

  /**
   * Affecte la commande reçue comme commande à modifier
   * @param cde commande à modifier
   */
  private setCommande(cde: JSON[]): void {
    this.idCommande = undefined;
    this.showAjoutModifCde = true;
    this.showDetailCde = false;
    this.showAjoutColis = false;
    this.commande = cde;
  }

  /**
   * Affiche l'ajout d'une commande
   */
  private showAjouterCommande(): void {
    // TODO : FIX clic sur nouvelle commande quand modif en cours (et vice versa)
    this.showAjoutModifCde = true;
    this.showDetailCde = false;
    this.showAjoutColis = false;
    this.idCommande = undefined;
    this.commande = undefined;
  }

  /**
   * Maque l'ajout du colis
   */
  private annulerAjoutColis(): void {
    this.idCommande = undefined;
    this.showAjoutColis = false;
  }

  /**
   * Masque l'ajout / modification
   */
  private annulerAjoutModif(): void {
    this.commande = undefined;
    this.idCommande = undefined;
    this.showAjoutModifCde = false;
  }

  /**
   * Flag pour refresh de la synthèse après ajout du colis
   */
  private refreshSynthese(): void {
    this.showAjoutColis = false;
    this.syntheseCdeComponent.getStat(this.idCommande);
    this.idCommande = undefined;
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Commande } from 'src/app/shared/modeles/commande.model';
import { Animal } from 'src/app/shared/modeles/animal.model';

@Component({
  selector: 'app-ajouter-cde',
  templateUrl: './ajouter-cde.component.html',
  styleUrls: ['./ajouter-cde.component.scss']
})
export class AjouterCdeComponent implements OnInit {

  @Input() commandeAModifier: JSON[];
  @Output() annulerEvent: EventEmitter<any> = new EventEmitter<any>();
  public modeModification: boolean;
  public commande;
  public animal;

  constructor() { }

  ngOnInit() {
    if (!!this.commandeAModifier) {
      this.commande = this.commandeAModifier[0];
      this.animal = this.commandeAModifier[1];
      this.modeModification = true;
    } else {
      this.commande = new Commande('', '', '', '', '', '', '', '', '');
      this.animal = new Animal('', '', '', '', '', '', '', '');
      this.modeModification = false;
    }
    console.log(this.commande);
    console.log(this.animal);
    // TODO : FIX affichage date
    // TODO : changer les libellés si modeModification
    // TODO : implémenter ajout / update
  }

  /**
   * Envoi d'un event pour fermer
   */
  public onAnnuler(): void {
    this.annulerEvent.emit(event);
  }

}

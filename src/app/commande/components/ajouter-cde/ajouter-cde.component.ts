import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Commande } from 'src/app/shared/modeles/commande.model';
import { Animal } from 'src/app/shared/modeles/animal.model';
import { AnimalSrvService } from '../../services/animal-srv.service';
import { CommandeSrvService } from '../../services/commande-srv.service';

@Component({
  selector: 'app-ajouter-cde',
  templateUrl: './ajouter-cde.component.html',
  styleUrls: ['./ajouter-cde.component.scss']
})
export class AjouterCdeComponent implements OnInit, OnDestroy {

  @Input() commandeAModifier: JSON[];
  @Output() annulerEvent: EventEmitter<any> = new EventEmitter<any>();
  public modeModification: boolean;
  public commande;
  public animal;

  private animalObservable;
  private animalSubscription;

  private commandeObservable;
  private commandeSubscription;

  public msgOk;
  public msgKo;

  constructor(private animalSrvService: AnimalSrvService, private commandeSrvService: CommandeSrvService) { }

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
    // TODO : changer les libellés si modeModification
    // TODO : ne pas faire de bind tant que la modif n'est pas enregistrée
    // TODO : implémenter gestion statut
  }

  ngOnDestroy() {
    if (!!this.animalSubscription) {
      this.animalSubscription.unsubscribe();
    }
    if (!!this.commandeSubscription) {
      this.commandeSubscription.unsubscribe();
    }
  }

  /**
   * Validation du formulaire
   */
  public onSubmit(): void {
    console.log(this.commande);
    console.log(this.animal);
    this.majAnimal();
  }

  /**
   * Mise à jour des infos de l'animal
   */
  private majAnimal(): void {
    this.animalObservable = this.animalSrvService.updateAnimal(this.animal);
    this.animalSubscription = this.animalObservable.subscribe(
      (a) => {
        console.log(a);
        if (!!a) {
          this.majCommande();
        }
      }, (error) => {
        console.log(error);
        this.msgKo = 'Une erreur est survenue lors de la modification de l\'animal';
      }
    );
  }
  /**
   * Mise à jour des infos de la commande
   */
  private majCommande(): void {
    this.commandeObservable = this.commandeSrvService.updateCommande(this.commande);
    this.commandeSubscription = this.commandeObservable.subscribe(
      (c) => {
        console.log(c);
        this.msgOk = 'La commande a été modifiée avec succès';
        this.msgKo = null;
      }, (error) => {
        console.log(error);
        this.msgKo = 'Une erreur est survenue lors de la modification de la commande';
      }
    );
  }

  /**
   * Envoi d'un event pour fermer
   */
  public onAnnuler(): void {
    this.annulerEvent.emit(event);
  }

}

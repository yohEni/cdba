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

  public txtTitre: String;
  public txtBtnAjouter: String;

  public msgOk;
  public msgKo;

  constructor(private animalSrvService: AnimalSrvService, private commandeSrvService: CommandeSrvService) { }

  ngOnInit() {
    if (!!this.commandeAModifier) {
      this.commande = this.commandeAModifier[0];
      this.animal = this.commandeAModifier[1];
      this.modeModification = true;
      this.txtTitre = 'Modifier la commande';
      this.txtBtnAjouter = ' Modifier la commande';
    } else {
      this.commande = new Commande('', '', '', '', '', '', '', '', '', '');
      this.animal = new Animal('', '', '', '', '', '', '', '');
      this.modeModification = false;
      this.txtTitre = 'Ajouter une commande';
      this.txtBtnAjouter = ' Ajouter la commande';
    }
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
   * Complète les infos de l'animal
   */
  private completerInfoAnimal(): void {
    this.animal.auteurCreation = '1';
    this.animal.auteurModification = '1';
    const date = new Date().toString();
    this.animal.dateCreation = date;
    this.animal.dateModification = date;
  }

  /**
   * Complète les infos de la commande
   */
  private completerInfoCommande(): void {
    this.commande.idStatut = '1';
    this.commande.auteurCreation = '1';
    this.commande.auteurModification = '1';
    const date = new Date().toString();
    this.commande.dateCreation = date;
    this.commande.dateModification = date;
  }

  /**
   * Mise à jour si besoin des infos de l'animal
   */
  private majAnimal(): void {
    if (this.commandeAModifier[1]['numeroNational'] === this.animal.numeroNational &&
      this.commandeAModifier[1]['poidsEstime'] === this.animal.poidsEstime) {
      this.majCommande();
    } else {
      const date = new Date().toString();
      this.animal.dateModification = date;
      this.animal.auteurModification = '1';
      this.animalObservable = this.animalSrvService.updateAnimal(this.animal);
      this.animalSubscription = this.animalObservable.subscribe(
        (a) => {
          if (!!a) {
            this.majCommande();
          }
        }, (error) => {
          console.log(error);
          this.msgKo = 'Une erreur est survenue lors de la modification de l\'animal';
        }
      );
    }
  }

  /**
   * Ajoute la commande
   */
  private ajouterCommande(): void {
    this.completerInfoCommande();
    this.commandeObservable = this.commandeSrvService.addCommande(this.commande);
    this.commandeSubscription = this.commandeObservable.subscribe(
      (c) => {
        this.commande.id = c.insertedId;
        this.msgOk = 'La commande a été ajoutée avec succès';
        this.msgKo = null;
      }, (error) => {
        console.log(error);
        this.msgKo = 'Une erreur est survenue lors de l\'ajout de la commande';
      }
    );
  }

  /**
   * Mise à jour si besoin des infos de la commande
   */
  private majCommande(): void {
    const date = new Date().toString();
    this.commande.dateModification = date;
    this.commande.auteurModification = '1';
    this.commandeObservable = this.commandeSrvService.updateCommande(this.commande);
    this.commandeSubscription = this.commandeObservable.subscribe(
      (c) => {
        this.msgOk = 'La commande a été modifiée avec succès';
        this.msgKo = null;
      }, (error) => {
        console.log(error);
        this.msgKo = 'Une erreur est survenue lors de la modification de la commande';
      }
    );
  }

  /**
   * Sauvegarde l'animal puis appelle la sauvegarde de la commande
   */
  private sauvAnimal(): void {
    this.completerInfoAnimal();
    this.animalObservable = this.animalSrvService.addAnimal(this.animal);
    this.animalSubscription = this.animalObservable.subscribe(
      (a) => {
        this.animal.id = a.insertedId;
        this.commande.idAnimal = this.animal.id;
        if (!!this.commande.idAnimal) {
          this.ajouterCommande();
        }
      }, (error) => {
        console.log(error);
        this.msgKo = 'Une erreur est survenue lors de l\'ajout de l\'animal';
      }
    );
  }

  /**
   * Validation du formulaire
   */
  public onSubmit(): void {
    if (this.modeModification) {
      this.majAnimal();
    } else {
      this.sauvAnimal();
    }
  }

  /**
   * Envoi d'un event pour fermer
   */
  public onAnnuler(): void {
    this.annulerEvent.emit(event);
  }

}

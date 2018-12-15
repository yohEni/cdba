import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommandeSrvService } from '../../services/commande-srv.service';
import { Observable } from 'rxjs';
import { AnimalSrvService } from '../../services/animal-srv.service';

import { Animal } from '../../../shared/modeles/animal.model';


@Component({
  selector: 'app-synthese-cde',
  templateUrl: './synthese-cde.component.html',
  styleUrls: ['./synthese-cde.component.scss']
})
export class SyntheseCdeComponent implements OnInit, OnDestroy {

  public lastCommande;
  private commandeObservable;
  private commandeSubscription;

  public animal;
  private animalObservable;
  private animalSubscription;

  public numRadical: string;
  public numTravail: string;

  @Output() voirDetailEvent: EventEmitter<string> = new EventEmitter<string>();

  // Bouchon
  progressionCde = '16%';
  kgRestant = 253;
  colisMinRestant = 12;
  colisMaxRestant = 21;

  constructor(private commandeSrvService: CommandeSrvService, private animalSrvService: AnimalSrvService) { }

  ngOnInit() {
    this.getLastCommande();
  }

  ngOnDestroy() {
    if (!!this.commandeSubscription) {
      this.commandeSubscription.unsubscribe();
    }
    if (!!this.animalSubscription) {
      this.animalSubscription.unsubscribe();
    }
  }

  /**
   * Récupération de la dernière commande
   */
  private getLastCommande(): void {
    this.commandeObservable = this.commandeSrvService.getLastCommande();
    this.commandeSubscription = this.commandeObservable.subscribe(
      (c) => {
        this.lastCommande = c[0];
        this.getAnimal(this.lastCommande.idAnimal);
      }, (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Récupération de l'animal en fonction de l'id passé en paramètre
   * @param id id de l'animal
   */
  private getAnimal(id): void {
    this.animalObservable = this.animalSrvService.getAnimal(id);
    this.animalSubscription = this.animalObservable.subscribe(
      (a) => {
        this.animal = a[0];
        if (!!a) {
          this.numRadical = this.animal.numeroNational.substring(0, 6);
          this.numTravail = this.animal.numeroNational.substring(6, 10);
        }
      }, (error) => {
        console.log(error);
      }
    );
  }

  private onVoirDetail(evt) {
    this.voirDetailEvent.emit(this.lastCommande.id);
  }

}

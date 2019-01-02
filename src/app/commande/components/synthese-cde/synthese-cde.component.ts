import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommandeSrvService } from '../../services/commande-srv.service';
import { Observable } from 'rxjs';
import { AnimalSrvService } from '../../services/animal-srv.service';

import { Animal } from '../../../shared/modeles/animal.model';
import { LigneCommandeSrvService } from '../../services/ligne-commande-srv.service';


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

  public stat;
  private statObservable;
  private statSubscription;

  @Output() voirDetailEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() modifierCdeEvent: EventEmitter<JSON[]> = new EventEmitter<JSON[]>();
  @Output() ajouterCdeEvent: EventEmitter<any> = new EventEmitter<any>();

  // Bouchon
  progressionCde = 0;
  colisMinRestant = 0;
  colisMaxRestant = 0;

  constructor(private commandeSrvService: CommandeSrvService,
              private animalSrvService: AnimalSrvService,
              private ligneCommandeSrvService: LigneCommandeSrvService) { }

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
    if (!!this.statSubscription) {
      this.statSubscription.unsubscribe();
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
        this.getStat(this.lastCommande.id);
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

  /**
   * Récupère les stats de la commande
   * @param id id de la commande
   */
  private getStat(id: string): void {
    this.statObservable = this.ligneCommandeSrvService.getStatLignesCommande(id);
    this.statSubscription = this.statObservable.subscribe(
      (s) => {
        this.stat = s[0];
        console.log(this.stat);
        this.colisMaxRestant = Math.floor(this.stat.kgRestant / 12);
        this.colisMinRestant = Math.floor(this.stat.kgRestant / 20);
        this.progressionCde = Math.round(this.stat.avancement);
      }, (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Voir le détail de la commande
   * @param evt event
   */
  private onVoirDetail(evt): void {
    this.voirDetailEvent.emit(this.lastCommande.id);
  }

  /**
   * Envoi un event avec la commande à modifier et l'animal
   */
  private onModifierCde(): void {
    this.modifierCdeEvent.emit([this.lastCommande, this.animal]);
  }

  /**
   * Envoi un event pour ajouter une commande
   */
  private onAjouterCde(): void {
    this.ajouterCdeEvent.emit(event);
  }

}

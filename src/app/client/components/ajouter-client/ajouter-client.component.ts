import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Client } from 'src/app/shared/modeles/client.model';
import { ClientSrvService } from '../../services/client-srv.service';

@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.component.html',
  styleUrls: ['./ajouter-client.component.scss']
})
export class AjouterClientComponent implements OnInit, OnDestroy {

  @Input() clientAModifier: any;
  @Output() fermerAjoutClient: EventEmitter<any> = new EventEmitter<any>();

  public client: Client;
  private clientObservable;
  private clientSubscription;

  private modeModification: boolean;
  public txtTitre: string;
  public txtBtnAjouter: string;

  public msgOk: string;
  public msgKo: string;

  constructor(private viewportScroller: ViewportScroller,
              private clientSrvService: ClientSrvService) { }

  ngOnInit() {
    if (!!this.clientAModifier) {
      this.modeModification = true;
      this.txtTitre = 'Modifier un client';
      this.txtBtnAjouter = ' Modifier le client';
      this.client = this.clientAModifier;
    } else {
      this.modeModification = false;
      this.txtTitre = 'Ajouter un client';
      this.txtBtnAjouter = ' Ajouter le client';
      this.client = new Client();
    }
    this.viewportScroller.scrollToAnchor('titreAjouterUnClient');
  }

  ngOnDestroy() {
    if (!!this.clientSubscription) {
      this.clientSubscription.unsubscribe();
    }
  }

  /**
   * Validation du formulaire : sauvegarde du client
   */
  public onSubmit(): void {
    this.msgKo = '';
    this.msgOk = '';
    if (this.modeModification) {
      this.client.auteurModification = '1';
      this.updateClient();
    } else {
      this.setInfos();
      this.addClient();
    }
  }

  /**
   * Complète les infos du client
   */
  private setInfos(): void {
    this.client.auteurCreation = '1';
    this.client.auteurModification = '1';
  }

  /**
   * Ajoute le client
   */
  private addClient(): void {
    // TODO : FIX la validation du formulaire, ex si code postal > 5 caractères
    const clientEnJson: JSON = JSON.parse(JSON.stringify(this.client));
    this.clientObservable = this.clientSrvService.addClient(clientEnJson);
    this.clientSubscription = this.clientObservable.subscribe(
      (c) => {
        if (!!c && !!c.insertedId) {
          this.client.id = c.insertedId;
          this.msgOk = 'Le client a été correctement ajouté';
          this.fermerAjoutClient.emit(this.client.id);
        }
      }, (error) => {
        console.log(error);
        this.msgKo = 'Une erreur est survenue lors de l\'ajout du client';
      }
    );
  }

  /**
   * Mise à jour du client
   */
  private updateClient(): void {
    const clientEnJson: JSON = JSON.parse(JSON.stringify(this.client));
    this.clientObservable = this.clientSrvService.updateClient(clientEnJson);
    this.clientSubscription = this.clientObservable.subscribe(
      (c) => {
        if (!!c) {
          this.msgOk = 'Le client a été modifié avec succès';
          this.msgKo = '';
          // TOFIX : récupérer la date et auteur de modification
          // envoyer les infos plutôt que gérer uniquement par le back
          this.fermerAjoutClient.emit(this.client.id);
        }
      }, (error) => {
        console.log(error);
        this.msgKo = 'Une erreur est survenue lors de la modification du client';
        this.msgOk = '';
      }
    );
  }

  /**
   * Annule l'ajout
   */
  private cancelAdd(): void {
    this.client = new Client();
    this.fermerAjoutClient.emit(this.client.id);
  }

}

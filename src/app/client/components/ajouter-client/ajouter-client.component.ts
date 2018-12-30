import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/shared/modeles/client.model';
import { ClientSrvService } from '../../services/client-srv.service';

@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.component.html',
  styleUrls: ['./ajouter-client.component.scss']
})
export class AjouterClientComponent implements OnInit, OnDestroy {

  @Output() fermerAjoutClient: EventEmitter<any> = new EventEmitter<any>();

  public client: Client;
  private clientObservable;
  private clientSubscription;

  public msgKo: string;

  constructor(private clientSrvService: ClientSrvService) { }

  ngOnInit() {
    this.client = new Client('', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
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
    console.log('ajout des infos');
    this.setInfos();
    console.log(this.client);
    this.addClient();
  }

  /**
   * Complète les infos du client
   */
  private setInfos(): void {
    const date = new Date().toString();
    this.client.dateCreation = date;
    this.client.dateModification = date;
    this.client.auteurCreation = '1';
    this.client.auteurModification = '1';
    this.client.aboNewsletter = '0';
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
          this.fermerAjoutClient.emit(this.client.id);
        }
      }, (error) => {
        console.log(error);
        this.msgKo = 'Une erreur est survenue lors de l\'ajout du client';
      }
    );
  }

  /**
   * Annule l'ajout
   */
  private cancelAdd(): void {
    this.fermerAjoutClient.emit(this.client.id);
  }

}

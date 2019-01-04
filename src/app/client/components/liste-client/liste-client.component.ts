import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable} from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ClientSrvService } from '../../services/client-srv.service';

@Component({
  selector: 'app-liste-client',
  templateUrl: './liste-client.component.html',
  styleUrls: ['./liste-client.component.scss']
})
export class ListeClientComponent implements OnInit, OnDestroy {

  public model: any;
  public clients;
  public client;

  private clientsObservable;
  private clientsSubscription;

  @Output() afficherDetailEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() ajouterClientEvent: EventEmitter<any> = new EventEmitter<any>();

  formatMatches = (value: any) => value.prenom + ' ' + value.nom.toUpperCase() || '';

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.clients.filter(v => {
            let x: any;
            if (v.prenom.toLowerCase().indexOf(term.toLowerCase()) > -1) {
              x = v;
            } else if (v.nom.toLowerCase().indexOf(term.toLowerCase()) > -1) {
              x = v;
            }
            return x;
        }).slice(0, 10))
    )

  constructor(private clientSrvService: ClientSrvService) { }

  ngOnInit() {
    this.clients = this.getClients();
  }

  ngOnDestroy() {
    if (!!this.clientsSubscription) {
      this.clientsSubscription.unsubscribe();
    }
  }

  /**
   * Récupération de la liste des clients
   */
  private getClients(): void {
    this.clientsObservable = this.clientSrvService.getClients();
    this.clientsSubscription = this.clientsObservable.subscribe(
      (c) => {
        this.clients = c;
      }, (error) => {
        console.log('Une erreur est survenue lors de la récupération des clients');
      }
    );
  }

  /**
   * Affiche le détail du client
   * @param id numLigne du tableau de client
   */
  private onAfficherDetail(numLigne: string): void {
    // TODO : FIX le clic sur la loupe clic aussi sur la ligne (double clic à tort)
    this.client = this.clients[numLigne];
    this.afficherDetailEvent.emit(this.client);
  }

  /**
   * Affiche le formulaire d'ajout d'un client
   */
  private ajouterClient(): void {
    this.ajouterClientEvent.emit();
  }

}

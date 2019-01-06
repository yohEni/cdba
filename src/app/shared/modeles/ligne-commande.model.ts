export class LigneCommande {
    constructor(public id: string = null,
        public idCommande: string = null,
        public idClient: string = null,
        public dateCommande: string = null,
        public poidsColis: string = null,
        public poidsColisReel: string = null,
        public cote: string = null,
        public bourguignonSteakHache: string = null,
        public bourguignonVrac: string = null,
        public potAuFeuSteakHache: string = null,
        public potAuFeuVrac: string = null,
        public idStatut: string = null,
        public titreStatut: string = null,
        public messageClient: string = null,
        public commentaire: string = null,
        public auteurCreation: string = null,
        public dateCreation: string = null,
        public auteurModification: string = null,
        public dateModification: string = null) {
    }
}

export class LigneCommande {
    constructor(public id: string,
        public idCommande: string,
        public idClient: string,
        public dateCommande: string,
        public poidsColis: string,
        public poidsColisReel: string,
        public cote: string,
        public bourguignonSteakHache: string,
        public bourguignonVrac: string,
        public potAuFeuSteakHache: string,
        public potAuFeuVrac: string,
        public idStatut: string,
        public titreStatut: string,
        public messageClient: string,
        public commentaire: string,
        public auteurCreation: string,
        public dateCreation: string,
        public auteurModification: string,
        public dateModification: string) {
    }
}

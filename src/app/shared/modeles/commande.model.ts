export class Commande {
    constructor(public id: string,
        public idAnimal: string,
        public dateLivraisonEstimee: string,
        public dateLivraisonReelle: string,
        public titreStatut: string,
        public idStatut: string,
        public auteurCreation: string,
        public dateCreation: string,
        public auteurModification: string,
        public dateModification: string) {
    }
}

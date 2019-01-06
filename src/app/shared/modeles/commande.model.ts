export class Commande {
    constructor(public id: string = null,
        public idAnimal: string = null,
        public dateLivraisonEstimee: string = null,
        public dateLivraisonReelle: string = null,
        public titreStatut: string = null,
        public idStatut: string = null,
        public auteurCreation: string = null,
        public dateCreation: string = null,
        public auteurModification: string = null,
        public dateModification: string = null) {
    }
}

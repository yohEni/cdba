export class Client {
    constructor(public id: string = null,
        public nom: string = null,
        public prenom: string = null,
        public adresse: string = null,
        public codePostal: string = null,
        public ville: string = null,
        public telephone1: string = null,
        public telephone2: string = null,
        public mail: string = null,
        public aboNewsletter: string = null,
        public motDePasse: string = null,
        public auteurCreation: string = null,
        public dateCreation: string = null,
        public auteurModification: string = null,
        public dateModification: string = null) {
    }
}

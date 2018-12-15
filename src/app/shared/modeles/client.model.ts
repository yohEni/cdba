export class Client {
    constructor(public id: string,
        public nom: string,
        public prenom: string,
        public adresse: string,
        public codePostal: string,
        public ville: string,
        public telephone1: string,
        public telephone2: string,
        public mail: string,
        public aboNewsletter: string,
        public auteurCreation: string,
        public dateCreation: string,
        public auteurModification: string,
        public dateModification: string) {
    }
}

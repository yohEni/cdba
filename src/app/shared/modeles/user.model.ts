export class User {
    constructor(public id: string,
                public login: string,
                public password: string,
                public dateCreation: string,
                public auteurCreation: string,
                public dateModification: string,
                public auteurModification: string) {
    }
}

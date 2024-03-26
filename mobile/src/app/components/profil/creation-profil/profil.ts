import { Profil } from "src/app/interfaces/profil";

export class profil implements Profil{
    name:string;
    firstName:string;
    instagram:string;
    facebook:string;
    numberPhone:string;
    description:string;
    address:string;

    constructor(userData:Profil){
        this.name=userData.name;
        this.firstName=userData.firstName;
        this.instagram=userData.instagram;
        this.facebook=userData.facebook;
        this.numberPhone=userData.numberPhone;
        this.description=userData.description;
        this.address=userData.address;
    }
}



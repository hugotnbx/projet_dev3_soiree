import { Profil } from "src/app/interfaces/profil";

export class profil implements Profil{
    idProfil:number;
    username:string;
    password:string;
    name:string;
    firstName:string;
    mail:string;
    instagram:string;
    facebook:string;
    numberPhone:string;
    description:string;
    address:string;

    constructor(userData:Profil){
        this.idProfil=userData.idProfil;
        this.username=userData.username;
        this.password=userData.password;
        this.name=userData.name;
        this.firstName=userData.firstName;
        this.mail=userData.mail;
        this.numberPhone=userData.numberPhone;
        this.address=userData.address;
        this.instagram=userData.instagram;
        this.facebook=userData.facebook;
        this.description=userData.description;
    }
}



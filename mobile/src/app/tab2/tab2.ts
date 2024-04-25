import { Evenement } from "src/app/interfaces/evenement";
import { Relation } from "../interfaces/relation";

export class evenement implements Evenement{
    id:number;
    nom:string;
    heure:string;
    date:string;
    lieu:string;
    nbrLit:number;
    nbrBob:number;

    constructor(eventData:Evenement){
        this.id=eventData.id;
        this.nom=eventData.nom;
        this.heure=eventData.heure;
        this.date=eventData.date;
        this.lieu=eventData.lieu;
        this.nbrLit=eventData.nbrLit;
        this.nbrBob=eventData.nbrBob;
    }
}

export class relation implements Relation{
    idProfil:string;
    idEvent:number;
    idContribution:number;
    idStatus:number;

    constructor(relationData:Relation){
        this.idProfil=relationData.idProfil;
        this.idEvent=relationData.idEvent;
        this.idContribution=relationData.idContribution;
        this.idStatus=relationData.idStatus;
    }
}
import { Evenement } from "src/app/interfaces/evenement";

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
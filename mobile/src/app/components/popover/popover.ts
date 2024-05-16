import { Contribution } from "src/app/interfaces/contribution";
//import { Relation } from "../interfaces/relation";

export class contribution implements Contribution{
    idContribution:number;
    nom:string;
    prix:number;

    constructor(contributionData:Contribution){
        this.idContribution=contributionData.idContribution;
        this.nom=contributionData.nom;
        this.prix=contributionData.prix;
    }
}
import { ApiProperty } from "@nestjs/swagger";

export class UtilisateurDto {
    @ApiProperty({
        required:true,
        type: Number,
    })
    readonly  id_utilisateur: number;

    @ApiProperty({
        required:true,
        type: String,
    })
    readonly  nom: string ;

    @ApiProperty({
        required:true,
        type: String,
    })
    readonly  prenom: string ;

    @ApiProperty({
        required:true,
        type: String,
    })
    readonly  email: string ;

    @ApiProperty({
        required:true,
        type: String,
    })
    readonly  numeroTelephone : string;

    

}
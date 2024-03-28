import { ApiProperty } from "@nestjs/swagger";

export class AccueilDto {
    @ApiProperty({
        required:true,
        type:'number',
    })
    readonly  id: number;

    @ApiProperty({
        required:true,
        type:'string',
    })
    readonly  nom: string ;

    @ApiProperty({
        required:false,
        type:'string',
    })
    readonly  heure: string ;

    @ApiProperty({
        required:true,
        type:'string',
    })
    readonly   lieu :string ;

    @ApiProperty({
        required:true,
        type:'string',
    })
    readonly  date : string;

    @ApiProperty({
        required:false,
        type:'number',
    })
    readonly  nbrLit: number ;

    @ApiProperty({
        required:true,
        type:'number',
    })
    readonly  nbrBob: number ;

}
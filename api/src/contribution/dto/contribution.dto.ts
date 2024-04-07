import { ApiProperty } from "@nestjs/swagger";

export class ContributionDto {
    @ApiProperty({
        required:true,
        type:'number',
    })
    readonly  idContribution: number;

    @ApiProperty({
        required:true,
        type:'string',
    })
    readonly  nom: string ;

    @ApiProperty({
        required:true,
        type:'number',
    })
    readonly  prix: number ;

    
}
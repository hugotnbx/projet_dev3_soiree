import { ApiProperty } from "@nestjs/swagger";

export class UsersRelationsDto {
    @ApiProperty({
        required:true,
        type:'number',
    })
    readonly  idProfil: number;

    @ApiProperty({
        required:true,
        type:'number',
    })
    readonly  idEvent: number;
    
    @ApiProperty({
        required:false,
        type:'number',
    })
    readonly  idContribution: number;

    @ApiProperty({
        required:false,
        type:'number',
    })
    readonly  idStatus: number;
}
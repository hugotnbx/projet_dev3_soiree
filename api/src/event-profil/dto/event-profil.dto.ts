import { ApiProperty } from "@nestjs/swagger";

export class EventProfilDto {
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
}
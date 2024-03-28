import { ApiProperty } from "@nestjs/swagger";

export class EventProfilDto {
    @ApiProperty({
        required:true,
        type:'string',
    })
    readonly  idProfil: string;

    @ApiProperty({
        required:true,
        type:'number',
    })
    readonly  idEvent: number;
}
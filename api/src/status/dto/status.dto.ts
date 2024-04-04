import { ApiProperty } from "@nestjs/swagger";

export class StatusDto {
    @ApiProperty({
        required:true,
        type:'number',
    })
    readonly  idStatus: number;

    @ApiProperty({
        required:true,
        type:'string',
    })
    readonly  status: string;
}
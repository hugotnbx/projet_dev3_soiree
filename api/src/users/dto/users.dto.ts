import { ApiProperty } from "@nestjs/swagger";

export class UsersDto {
    @ApiProperty({
        required:true,
        type: "string",
    })
    readonly  idProfil: string;

    @ApiProperty({
        required:true,
        type: "string",
    })
    readonly  name: string ;

    @ApiProperty({
        required:true,
        type: "string",
    })
    readonly  firstName: string ;

    @ApiProperty({
        required:true,
        type: "string",
    })
    readonly  mail: string ;

    @ApiProperty({
        required:true,
        type: "string",
    })
    readonly  numberPhone : string;

    @ApiProperty({
        required:false,
        type: "string",
    })
    readonly  address : string;

    @ApiProperty({
        required:false,
        type: "string",
    })
    readonly  instagram : string;

    @ApiProperty({
        required:false,
        type: "string",
    })
    readonly  facebook : string;

    @ApiProperty({
        required:false,
        type: "string",
    })
    readonly  description : string;

    @ApiProperty({
        required:false,
        type: "string",
    })
    readonly  bank : string;
}
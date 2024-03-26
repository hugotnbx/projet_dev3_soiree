import { ApiProperty } from "@nestjs/swagger";

export class ProfilDto {
    @ApiProperty({
        required:true,
        type: Number,
    })
    readonly  idProfil: number;

    @ApiProperty({
        required:true,
        type: String,
    })
    readonly  name: string ;

    @ApiProperty({
        required:true,
        type: String,
    })
    readonly  firstName: string ;

    @ApiProperty({
        required:true,
        type: String,
    })
    readonly  description : string;

    @ApiProperty({
        required:true,
        type: String,
    })
    readonly  mail: string ;

    @ApiProperty({
        required:true,
        type: String,
    })
    readonly  numberPhone : string;

    @ApiProperty({
        required:true,
        type: String,
    })
    readonly  address : string;

    @ApiProperty({
        required:true,
        type: String,
    })
    readonly  instagram : string;

    @ApiProperty({
        required:true,
        type: String,
    })
    readonly  facebook : string;

    @ApiProperty({
        required:true,
        type: String,
    })
    readonly  bank : string;

  
    

}
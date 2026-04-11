import { ApiProperty } from '@nestjs/swagger';

export class CreateColmeiaDto {
    @ApiProperty({
        example: 'COL-01',
        description: 'Identificação única da colmeia'
    })
    identificacao: string;

    @ApiProperty({
        example: 'Jataí',
        description: 'Tipo ou espécie da abelha'
    })
    tipoAbelha: string;
}
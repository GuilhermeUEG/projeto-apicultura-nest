import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateApiarioDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsString()
  localizacao: string;
 
  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  quantidadeColmeias: number;

  @ApiProperty({ example: '25/05/2020' })
  @IsString() @IsNotEmpty()
  dataFundacao: string;
}

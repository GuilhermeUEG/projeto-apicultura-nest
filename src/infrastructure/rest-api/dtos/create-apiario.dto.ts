import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateApiarioDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsString()
  localizacao: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  quantidadeColmeias: number;

  @ApiProperty()
  dataFundacao: Date;
}

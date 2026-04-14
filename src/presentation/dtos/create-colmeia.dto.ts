import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateColmeiaDto {
  @ApiProperty({ example: 'CLM-001' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Langsroth' })
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @ApiProperty({ example: 'uuid-do-apiario' })
  @IsString()
  @IsNotEmpty()
  apiarioId: string;
}
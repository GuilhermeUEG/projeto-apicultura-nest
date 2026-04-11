import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AddColmeiaUseCase } from '../../../application/use-cases/add-colmeia.use-case';
import { GetColmeiasByApiarioUseCase } from '../../../application/use-cases/get-colmeias-by-apiario.use-case';
import { CreateColmeiaDto } from '../dtos/create-colmeia.dto';

@ApiTags('apicultura')
@Controller('colmeias')
export class ColmeiaController {
  constructor(
    private readonly addColmeiaUseCase: AddColmeiaUseCase,
    private readonly getColmeiasByApiarioUseCase: GetColmeiasByApiarioUseCase,
  ) { }

  @Post(':apiarioId')
  @ApiOperation({ summary: 'Adiciona uma colmeia a um apiário' })
  @ApiParam({ name: 'apiarioId', description: 'ID do apiário (UUID)' })
  @ApiBody({ type: CreateColmeiaDto }) // Isso força o Swagger a mostrar a caixa de texto
  @ApiResponse({ status: 201, description: 'Colmeia adicionada com sucesso.' })
  async add(
    @Param('apiarioId') apiarioId: string,
    @Body() createColmeiaDto: CreateColmeiaDto // Trocado 'any' pelo DTO
  ) {
    return this.addColmeiaUseCase.execute(apiarioId, createColmeiaDto);
  }

  @Get('apiario/:apiarioId')
  @ApiOperation({ summary: 'Lista todas as colmeias de um apiário' })
  @ApiParam({ name: 'apiarioId', description: 'ID do apiário' })
  @ApiResponse({ status: 200, description: 'Lista de colmeias retornada com sucesso.' })
  async findByApiario(@Param('apiarioId') apiarioId: string) {
    return this.getColmeiasByApiarioUseCase.execute(apiarioId);
  }
}
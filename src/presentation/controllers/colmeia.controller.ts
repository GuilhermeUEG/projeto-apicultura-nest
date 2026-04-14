import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AddColmeiaUseCase } from '../../application/use-cases/add-colmeia.use-case.js';
import { GetColmeiasByApiarioUseCase } from '../../application/use-cases/get-colmeias-by-apiario.use-case.js';
import { UpdateColmeiaUseCase } from '../../application/use-cases/update-colmeia.use-case.js';
import { DeleteColmeiaUseCase } from '../../application/use-cases/delete-colmeia.use-case.js';
import { CreateColmeiaDto } from '../dtos/create-colmeia.dto.js';
import { UpdateColmeiaDto } from '../dtos/update-colmeia.dto.js';

@ApiTags('apicultura')
@Controller('colmeias')
export class ColmeiaController {
  constructor(
    private readonly addColmeiaUseCase: AddColmeiaUseCase,
    private readonly getColmeiasByApiarioUseCase: GetColmeiasByApiarioUseCase,
    private readonly updateColmeiaUseCase: UpdateColmeiaUseCase,
    private readonly deleteColmeiaUseCase: DeleteColmeiaUseCase,
  ) { }

  @Post(':apiarioId')
  @ApiOperation({ summary: 'Adiciona uma colmeia a um apiário' })
  @ApiParam({ name: 'apiarioId', description: 'ID do apiário (UUID)' })
  @ApiBody({ type: CreateColmeiaDto })
  @ApiResponse({ status: 201, description: 'Colmeia adicionada com sucesso.' })
  async add(
    @Param('apiarioId') apiarioId: string,
    @Body() createColmeiaDto: CreateColmeiaDto
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

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de uma colmeia' })
  @ApiParam({ name: 'id', description: 'ID da colmeia (UUID)' })
  @ApiBody({ type: UpdateColmeiaDto })
  @ApiResponse({ status: 200, description: 'Colmeia atualizada com sucesso.' })
  async update(
    @Param('id') id: string,
    @Body() updateColmeiaDto: UpdateColmeiaDto
  ) {
    return this.updateColmeiaUseCase.execute(id, updateColmeiaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma colmeia' })
  @ApiParam({ name: 'id', description: 'ID da colmeia (UUID)' })
  @ApiResponse({ status: 200, description: 'Colmeia removida com sucesso.' })
  async delete(@Param('id') id: string) {
    return this.deleteColmeiaUseCase.execute(id);
  }
}
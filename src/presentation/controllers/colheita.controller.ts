import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AddColheitaUseCase } from '../../application/use-cases/add-colheita.use-case.js';
import { CreateColheitaDto } from '../dtos/create-colheita.dto.js';

@ApiTags('apicultura')
@Controller('colheitas')
export class ColheitaController {
  constructor(
    private readonly addColheitaUseCase: AddColheitaUseCase,
  ) { }

  @Post(':apiarioId')
  @ApiOperation({ summary: 'Adiciona uma colheita de mel a um apiário' })
  @ApiParam({ name: 'apiarioId', description: 'ID do apiário (UUID)' })
  @ApiBody({ type: CreateColheitaDto })
  @ApiResponse({ status: 201, description: 'Colheita registrada com sucesso.' })
  async add(
    @Param('apiarioId') apiarioId: string,
    @Body() createColheitaDto: CreateColheitaDto
  ) {
    return this.addColheitaUseCase.execute(apiarioId, createColheitaDto);
  }
}

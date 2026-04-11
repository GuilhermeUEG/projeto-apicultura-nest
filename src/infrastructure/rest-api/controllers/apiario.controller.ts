import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateApiarioUseCase } from '../../../application/use-cases/create-apiario.use-case';
import { GetAllApiariosUseCase } from '../../../application/use-cases/get-all-apiarios.use-case';
import { CreateApiarioDto } from '../dtos/create-apiario.dto';

@ApiTags('apicultura')
@Controller('apiarios')
export class ApiarioController {
  constructor(
    private readonly createApiarioUseCase: CreateApiarioUseCase,
    private readonly getAllApiariosUseCase: GetAllApiariosUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Cria um novo apiário' })
  @ApiResponse({ status: 201, description: 'Apiário criado com sucesso.' })
  async create(@Body() data: CreateApiarioDto) {
    return this.createApiarioUseCase.execute(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os apiários' })
  @ApiResponse({ status: 200, description: 'Lista de apiários retornada com sucesso.' })
  async findAll() {
    return this.getAllApiariosUseCase.execute();
  }
}

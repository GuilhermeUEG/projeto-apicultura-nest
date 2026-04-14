import { Injectable, NotFoundException } from '@nestjs/common';
import { ColmeiaRepository } from '../../domain/ports/colmeia.repository.js';
import { ApiarioRepository } from '../../domain/ports/apiario.repository.js';
import { CreateColmeiaDto } from '../../presentation/dtos/create-colmeia.dto.js';
import { Colmeia } from '../../domain/entities/colmeia.entity.js';

@Injectable()
export class AddColmeiaUseCase {
  constructor(
    private readonly colmeiaRepository: ColmeiaRepository,
    private readonly apiarioRepository: ApiarioRepository,
  ) { }

  async execute(apiarioId: string, dto: CreateColmeiaDto): Promise<Colmeia> {
    const apiario = await this.apiarioRepository.findById(apiarioId);
    if (!apiario) {
      throw new NotFoundException('Apiário não encontrado.');
    }

    const colmeia = new Colmeia(
      undefined,
      dto.codigo,
      dto.tipo,
      apiarioId,
    );

    return this.colmeiaRepository.save(colmeia);
  }
}

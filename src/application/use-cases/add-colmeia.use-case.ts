import { Injectable } from '@nestjs/common';
import { ColmeiaRepository } from '../../domain/ports/colmeia.repository';
import { Colmeia } from '../../domain/entities/colmeia.entity';

@Injectable()
export class AddColmeiaUseCase {
  constructor(private readonly repository: ColmeiaRepository) { }

  async execute(apiarioId: string, data: any): Promise<Colmeia> {
    // Criamos a entidade de domínio garantindo que o apiarioId seja enviado
    const colmeia = new Colmeia(
      crypto.randomUUID(), // Gera um ID único
      data.identificacao,
      data.tipoAbelha,
      apiarioId // <--- MUITO IMPORTANTE: O vínculo com o pai
    );
    return this.repository.save(colmeia);
  }
}
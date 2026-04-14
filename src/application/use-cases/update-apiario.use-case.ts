import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiarioRepository } from '../../domain/ports/apiario.repository.js';
import { UpdateApiarioDto } from '../../presentation/dtos/update-apiario.dto.js';
import { ValidatorUtils } from '../../domain/utils/validator.utils.js';

@Injectable()
export class UpdateApiarioUseCase {
  constructor(private readonly repository: ApiarioRepository) { }

  async execute(id: string, dto: UpdateApiarioDto): Promise<any> {
    const apiario = await this.repository.findById(id);

    if (!apiario) {
      throw new NotFoundException('Apiário não encontrado.');
    }

    // Se a data de fundação for alterada, validamos o formato e futuro
    let dataFundacao: Date | undefined;
    if (dto.dataFundacao) {
      ValidatorUtils.validateDateFormat(dto.dataFundacao, 'Data de fundação');
      dataFundacao = ValidatorUtils.parseBrDate(dto.dataFundacao);
      ValidatorUtils.validateNotFutureDate(dataFundacao, 'Data de fundação');
    }

    // Regra das 5 colmeias se a quantidade for alterada
    if (dto.quantidadeColmeias !== undefined) {
      ValidatorUtils.validateMinColmeias(dto.quantidadeColmeias);
    }

    const updatedData = {
      ...apiario,
      ...dto,
      ...(dataFundacao ? { dataFundacao } : {})
    };

    return this.repository.save(updatedData);
  }
}

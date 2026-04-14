import {
    Injectable,
    BadRequestException,
    NotFoundException,
    ForbiddenException
} from '@nestjs/common';
import { ApiarioRepository } from '../../domain/ports/apiario.repository.js';
import { ColheitaRepository } from '../../domain/ports/colheita.repository.js';
import { CreateColheitaDto } from '../../presentation/dtos/create-colheita.dto.js';
import { ValidatorUtils } from '../../domain/utils/validator.utils.js';

@Injectable()
export class AddColheitaUseCase {
    constructor(
        private readonly repoApiario: ApiarioRepository,
        private readonly repoColheita: ColheitaRepository,
    ) { }

    async execute(apiarioId: string, dto: CreateColheitaDto) {
        // REGRA 1: Todos os campos de ColheitaMel devem ser preenchidos
        if (!dto.tipoFlorada || !dto.dataColheita || dto.purezaAlta === undefined || dto.volumeLitros === undefined || !apiarioId) {
            throw new BadRequestException('Todos os campos de ColheitaMel devem ser preenchidos.');
        }

        // REGRA 3: Integridade FK (Existe?) e Status (Operacional?)
        const apiario = await this.repoApiario.findById(apiarioId);

        if (!apiario) {
            throw new NotFoundException('Apiário não encontrado.');
        }
        if (!apiario.operacional) {
            throw new ForbiddenException('Não é permitido colher mel de um apiário desativado.');
        }

        // Validações centralizadas
        ValidatorUtils.validateDateFormat(dto.dataColheita, 'Data de colheita');
        const dataColheita = ValidatorUtils.parseBrDate(dto.dataColheita);
        ValidatorUtils.validateNotFutureDate(dataColheita, 'Data de colheita');

        // REGRA 4: Viabilidade Econômica (Mínimo 5 colmeias)
        ValidatorUtils.validateMinColmeias(apiario.quantidadeColmeias);

        // REGRA 5: Limite Realista de Produção (quantidadeColmeias * 1.5)
        const limiteMaximo = apiario.quantidadeColmeias * 1.5;
        if (dto.volumeLitros > limiteMaximo) {
            throw new BadRequestException(`Volume de ${dto.volumeLitros}L excede o limite realista de ${limiteMaximo}L.`);
        }

        // REGRA 6: Lógica de Pureza
        if (dto.purezaAlta === true && dto.volumeLitros < 10) {
            throw new BadRequestException('Mel de alta pureza deve ter um volume de pelo menos 10 litros.');
        }
        if (dto.purezaAlta === false && dto.volumeLitros >= (limiteMaximo * 0.8)) {
            throw new BadRequestException('Volume de mel comum deve ser inferior a 80% do limite máximo.');
        }

        // REGRA 7: Tipos de Florada Permitidos
        const floradasPermitidas = ["Silvestre", "Citros", "Eucalipto", "Flores Silvestres", "Acácia"];
        if (!floradasPermitidas.includes(dto.tipoFlorada)) {
            throw new BadRequestException(`Florada '${dto.tipoFlorada}' inválida. Use: ${floradasPermitidas.join(', ')}`);
        }

        // Se passou por tudo, criamos o objeto e salvamos
        const novaColheita = {
            ...dto,
            dataColheita: dataColheita,
            apiario: apiario
        };

        return await this.repoColheita.save(novaColheita);
    }
}

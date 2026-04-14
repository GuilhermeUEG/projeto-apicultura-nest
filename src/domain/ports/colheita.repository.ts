import { Colheita } from '../entities/colheita.entity.js';

export abstract class ColheitaRepository {
  abstract save(colheita: Partial<Colheita>): Promise<Colheita>;
}

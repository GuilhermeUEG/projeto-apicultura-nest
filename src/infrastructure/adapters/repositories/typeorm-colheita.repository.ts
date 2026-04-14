import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColheitaRepository } from '../../../domain/ports/colheita.repository.js';
import { ColheitaMel } from '../entities/colheita-mel.db-entity.js';

@Injectable()
export class TypeOrmColheitaRepository implements ColheitaRepository {
  constructor(
    @InjectRepository(ColheitaMel)
    private readonly repository: Repository<ColheitaMel>,
  ) {}

  async save(colheita: any): Promise<any> {
    const colheitaDB = this.repository.create(colheita);
    return await this.repository.save(colheitaDB);
  }
}

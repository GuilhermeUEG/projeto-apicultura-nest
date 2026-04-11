import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColmeiaRepository } from '../../../domain/ports/colmeia.repository.js';
import { ColmeiaDBEntity } from '../entities/colmeia.db-entity.js';
import { Colmeia } from '../../../domain/entities/colmeia.entity.js';

@Injectable()
export class TypeOrmColmeiaRepository extends ColmeiaRepository {
  constructor(
    @InjectRepository(ColmeiaDBEntity)
    private readonly repository: Repository<ColmeiaDBEntity>,
  ) {
    super();
  }

  async save(colmeia: Colmeia): Promise<Colmeia> {
    const colmeiaDB = this.repository.create({
      id: colmeia.id,
      codigo: colmeia.codigo,
      tipo: colmeia.tipo,
      apiario: { id: colmeia.apiarioId } as any
    });

    const savedColmeiaDB = await this.repository.save(colmeiaDB);

    return new Colmeia(
      savedColmeiaDB.id,
      savedColmeiaDB.codigo,
      savedColmeiaDB.tipo,
      savedColmeiaDB.apiarioId
    );
  }

  async findByApiario(apiarioId: string): Promise<Colmeia[]> {
    const colmeiasDB = await this.repository.find({
      where: { apiario: { id: apiarioId } } as any,
      relations: ['apiario'],
    });

    return colmeiasDB.map(c => new Colmeia(c.id, c.codigo, c.tipo, c.apiarioId));
  }
}
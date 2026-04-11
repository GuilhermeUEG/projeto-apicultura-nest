import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiarioDBEntity } from './apiario.db-entity';

@Entity('colmeias')
export class ColmeiaDBEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  codigo: string;

  @Column()
  tipo: string;

  @Exclude()
  @ManyToOne(() => ApiarioDBEntity, (apiario) => apiario.colmeias)
  apiario: ApiarioDBEntity;

  @RelationId((colmeia: ColmeiaDBEntity) => colmeia.apiario)
  apiarioId: string;
}

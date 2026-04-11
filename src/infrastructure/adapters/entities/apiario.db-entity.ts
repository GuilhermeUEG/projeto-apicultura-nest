import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ColmeiaDBEntity } from './colmeia.db-entity';

@Entity('apiarios')
export class ApiarioDBEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  localizacao: string;

  @Column()
  quantidadeColmeias: number;

  @Column()
  dataFundacao: Date;

  @OneToMany(() => ColmeiaDBEntity, (colmeia) => colmeia.apiario)
  colmeias: ColmeiaDBEntity[];
}

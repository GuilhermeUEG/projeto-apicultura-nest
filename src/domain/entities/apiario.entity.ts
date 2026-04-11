import { Colmeia } from './colmeia.entity';

export class Apiario {
  id: string;
  nome: string;
  localizacao: string;
  quantidadeColmeias: number;
  dataFundacao: Date;
  colmeias?: Colmeia[];

  constructor(
    id: string,
    nome: string,
    localizacao: string,
    quantidadeColmeias: number,
    dataFundacao: Date,
    colmeias?: Colmeia[],
  ) {
    this.id = id;
    this.nome = nome;
    this.localizacao = localizacao;
    this.quantidadeColmeias = quantidadeColmeias;
    this.dataFundacao = dataFundacao;
    this.colmeias = colmeias;
  }
}

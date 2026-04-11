export class Colmeia {
  id: string;
  codigo: string;
  tipo: string;
  apiarioId: string;

  constructor(id: string, codigo: string, tipo: string, apiarioId: string) {
    this.id = id;
    this.codigo = codigo;
    this.tipo = tipo;
    this.apiarioId = apiarioId;
  }
}

export abstract class ColmeiaRepository {
  abstract save(colmeia: any): Promise<any>;

  abstract findByApiario(apiarioId: string): Promise<any[]>;
}

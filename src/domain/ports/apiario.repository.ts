export abstract class ApiarioRepository {
  abstract save(apiario: any): Promise<any>;
  abstract findAll(): Promise<any[]>;
}

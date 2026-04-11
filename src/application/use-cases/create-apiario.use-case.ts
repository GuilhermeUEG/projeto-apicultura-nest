import { Injectable } from '@nestjs/common';
import { ApiarioRepository } from '../../domain/ports/apiario.repository';

@Injectable()
export class CreateApiarioUseCase {
  constructor(private readonly repository: ApiarioRepository) {}

  async execute(data: any): Promise<any> {
    return this.repository.save(data);
  }
}

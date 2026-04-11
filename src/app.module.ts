import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entidades
import { ApiarioDBEntity } from './infrastructure/adapters/entities/apiario.db-entity.js';
import { ColmeiaDBEntity } from './infrastructure/adapters/entities/colmeia.db-entity.js';

// Repositórios (Portas e Adaptadores)
import { ApiarioRepository } from './domain/ports/apiario.repository.js';
import { TypeOrmApiarioRepository } from './infrastructure/adapters/repositories/typeorm-apiario.repository.js';
import { ColmeiaRepository } from './domain/ports/colmeia.repository.js';
import { TypeOrmColmeiaRepository } from './infrastructure/adapters/repositories/typeorm-colmeia.repository.js';

// Casos de Uso
import { CreateApiarioUseCase } from './application/use-cases/create-apiario.use-case.js';
import { GetAllApiariosUseCase } from './application/use-cases/get-all-apiarios.use-case.js';
import { AddColmeiaUseCase } from './application/use-cases/add-colmeia.use-case.js';
import { GetColmeiasByApiarioUseCase } from './application/use-cases/get-colmeias-by-apiario.use-case.js';

// Controllers
import { ApiarioController } from './infrastructure/rest-api/controllers/apiario.controller.js';
import { ColmeiaController } from './infrastructure/rest-api/controllers/colmeia.controller.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'apicultura.sqlite',
      entities: [ApiarioDBEntity, ColmeiaDBEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ApiarioDBEntity, ColmeiaDBEntity]),
  ],
  controllers: [
    ApiarioController,
    ColmeiaController,
  ],
  providers: [
    // Provedor para Apiário
    {
      provide: ApiarioRepository,
      useClass: TypeOrmApiarioRepository,
    },
    // Provedor para Colmeia
    {
      provide: ColmeiaRepository,
      useClass: TypeOrmColmeiaRepository,
    },
    // Casos de Uso
    CreateApiarioUseCase,
    GetAllApiariosUseCase,
    AddColmeiaUseCase,
    GetColmeiasByApiarioUseCase,
  ],
})
export class AppModule { }
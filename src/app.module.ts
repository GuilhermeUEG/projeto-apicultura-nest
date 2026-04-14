import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entidades
import { ApiarioDBEntity } from './infrastructure/adapters/entities/apiario.db-entity.js';
import { ColmeiaDBEntity } from './infrastructure/adapters/entities/colmeia.db-entity.js';
import { ColheitaMel } from './infrastructure/adapters/entities/colheita-mel.db-entity.js';

// Repositórios (Portas e Adaptadores)
import { ApiarioRepository } from './domain/ports/apiario.repository.js';
import { TypeOrmApiarioRepository } from './infrastructure/adapters/repositories/typeorm-apiario.repository.js';
import { ColmeiaRepository } from './domain/ports/colmeia.repository.js';
import { TypeOrmColmeiaRepository } from './infrastructure/adapters/repositories/typeorm-colmeia.repository.js';
import { ColheitaRepository } from './domain/ports/colheita.repository.js';
import { TypeOrmColheitaRepository } from './infrastructure/adapters/repositories/typeorm-colheita.repository.js';

// Casos de Uso
import { CreateApiarioUseCase } from './application/use-cases/create-apiario.use-case.js';
import { GetAllApiariosUseCase } from './application/use-cases/get-all-apiarios.use-case.js';
import { DeleteApiarioUseCase } from './application/use-cases/delete-apiario.use-case.js';
import { AddColmeiaUseCase } from './application/use-cases/add-colmeia.use-case.js';
import { GetColmeiasByApiarioUseCase } from './application/use-cases/get-colmeias-by-apiario.use-case.js';
import { UpdateColmeiaUseCase } from './application/use-cases/update-colmeia.use-case.js';
import { DeleteColmeiaUseCase } from './application/use-cases/delete-colmeia.use-case.js';
import { AddColheitaUseCase } from './application/use-cases/add-colheita.use-case.js';
import { UpdateApiarioUseCase } from './application/use-cases/update-apiario.use-case.js';

// Controllers
import { ApiarioController } from './presentation/controllers/apiario.controller.js';
import { ColmeiaController } from './presentation/controllers/colmeia.controller.js';
import { ColheitaController } from './presentation/controllers/colheita.controller.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'apicultura.sqlite',
      entities: [ApiarioDBEntity, ColmeiaDBEntity, ColheitaMel],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ApiarioDBEntity, ColmeiaDBEntity, ColheitaMel]),
  ],
  controllers: [
    ApiarioController,
    ColmeiaController,
    ColheitaController,
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
    // Provedor para Colheita
    {
      provide: ColheitaRepository,
      useClass: TypeOrmColheitaRepository,
    },
    // Casos de Uso
    CreateApiarioUseCase,
    GetAllApiariosUseCase,
    DeleteApiarioUseCase,
    AddColmeiaUseCase,
    GetColmeiasByApiarioUseCase,
    UpdateColmeiaUseCase,
    DeleteColmeiaUseCase,
    AddColheitaUseCase,
    UpdateApiarioUseCase,
  ],
})
export class AppModule { }
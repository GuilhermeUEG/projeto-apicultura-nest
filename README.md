<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 🐝 Sistema de Gestão de Apicultura

API robusta desenvolvida para a disciplina de **PROGRAMAÇÃO WEB**, focada na gestão de apiários, colmeias e colheitas de mel. O projeto aplica conceitos avançados de **Arquitetura Hexagonal (Ports and Adapters)** e **Clean Code**.

## 👥 Desenvolvedores
* **Guilherme Sousa Barbosa**
* **Samuel Antonio Borges Rezende**

---

## 🏗️ Arquitetura do Sistema
O projeto segue a **Arquitetura Hexagonal**, garantindo que as regras de negócio sejam independentes de tecnologias externas:

*   **Domain**: Entidades centrais (`Apiario`, `Colmeia`) e interfaces (`Ports`) que definem o contrato para persistência.
*   **Application**: Casos de uso (`Use Cases`) que implementam a lógica de negócio e orquestram a comunicação entre domínios e infraestrutura.
*   **Infrastructure**: Adaptadores técnicos, incluindo:
    *   **Persistence**: Implementação do repositório usando **TypeORM** e **SQLite**.
    *   **Rest API**: Controladores, DTOs de validação e filtros de exceção globais.

---

## 🛠️ Tecnologias Utilizadas
*   **NestJS**: Framework Node.js progressivo para aplicações eficientes.
*   **TypeScript**: Tipagem estática para maior segurança e manutenibilidade.
*   **TypeORM**: ORM para mapeamento objeto-relacional.
*   **SQLite**: Banco de dados relacional leve (armazenado em `apicultura.sqlite`).
*   **Swagger**: Interface interativa para exploração e teste da API.
*   **Class Validator/Transformer**: Validação rigorosa dos dados de entrada.

---

## 📋 Regras de Negócio Implementadas
O sistema conta com validações complexas para garantir a integridade dos dados e a viabilidade da operação apícola:

1.  **Obrigatoriedade de Dados**: Todos os campos (Apiário, Colmeia e Colheita) devem ser preenchidos.
2.  **Consistência Temporal**: Datas de fundação e colheita devem estar no formato brasileiro (`DD/MM/YYYY`) e não podem ser futuras.
3.  **Viabilidade Econômica**: Um apiário deve possuir no mínimo **5 colmeias** para ser elegível para registro de colheita.
4.  **Limite de Produção**: O volume de mel colhido não pode exceder **1.5 litros por colmeia** existente no apiário.
5.  **Status Operacional**: É proibido registrar colheitas em apiários **desativados** (não operacionais).
6.  **Lógica de Pureza**: 
    *   Mel de **Alta Pureza** requer volume mínimo de **10 litros**.
    *   Mel comum não pode ultrapassar 80% do limite máximo de produção do apiário.
7.  **Florada Controlada**: Apenas tipos de florada específicos são aceitos: *Silvestre, Citros, Eucalipto, Flores Silvestres, Acácia*.

---

## 📡 Endpoints da API

### Apiários
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/apiarios` | Cria um novo apiário |
| `GET` | `/apiarios` | Lista todos os apiários cadastrados |
| `PUT` | `/apiarios/{id}` | Atualiza dados de um apiário (ex: desativar) |
| `DELETE` | `/apiarios/{id}` | Remove um apiário e suas dependências |

### Colmeias
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/colmeias/{apiarioId}` | Adiciona uma colmeia a um apiário específico |
| `GET` | `/colmeias/apiario/{apiarioId}` | Lista todas as colmeias de um apiário |
| `PATCH` | `/colmeias/{id}` | Atualiza dados parciais de uma colmeia |
| `DELETE` | `/colmeias/{id}` | Remove uma colmeia individual |

### Colheitas
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/colheitas/{apiarioId}` | Registra uma colheita (valida regras de negócio) |

---

## 🚀 Como Executar

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Inicie o ambiente de desenvolvimento:**
    ```bash
    npm run start:dev
    ```

3.  **Explore a API via Swagger:**
    Acesse: [http://localhost:3000/swagger-ui](http://localhost:3000/swagger-ui)

---

## 📁 Estrutura de Pastas
```text
src/
 ├── application/       # Use Cases (Lógica de Negócio)
 ├── domain/            # Core (Entities & Repo Interfaces)
 ├── infrastructure/    # Persistência (TypeORM/SQLite)
 ├── presentation/      # Web (Controllers & Dtos)
 └── main.ts            # Entry point & Configurações
```

---

## 🧪 Roteiro de Teste Sugerido

Para validar todas as funcionalidades e regras de negócio, siga este fluxo:

### 1. Gestão de Apiários
1.  **POST `/apiarios`**: Crie um apiário (`nome`: "Apiário Central", `quantidadeColmeias`: 10).
2.  **GET `/apiarios`**: Copie o `id` (UUID) gerado.
3.  **PUT `/apiarios/{id}`**: Tente alterar o nome ou localização do apiário.

### 2. Gestão de Colmeias
1.  **GET `/colmeias/apiario/{apiarioId}`**: Verifique se as 10 colmeias iniciais foram criadas.
2.  **POST `/colmeias/{apiarioId}`**: Adicione mais uma colmeia manualmente.
3.  **PATCH `/colmeias/{id}`**: Atualize a identificação de uma colmeia específica.
4.  **DELETE `/colmeias/{id}`**: Remova uma colmeia e verifique se a contagem no apiário diminuiu.

### 3. Validação de Regras de Colheita
1.  **Teste de Sucesso**: Registre uma colheita no apiário de 10 colmeias com `volumeLitros`: 12 e `tipoFlorada`: "Silvestre".
2.  **Viabilidade Econômica**: Tente registrar colheita em um apiário que tenha apenas 4 colmeias (deve falhar).
3.  **Limite de Produção**: Tente colher 30 litros em um apiário com 10 colmeias (excede 1.5L/colmeia, deve falhar).
4.  **Status Operacional**: Use o `PUT /apiarios/{id}` para desativar o apiário e tente registrar uma colheita (deve falhar).
5.  **Tipos de Florada**: Tente usar "Laranja" (não permitido) em vez de "Citros".

---
*Projeto acadêmico finalizado.*

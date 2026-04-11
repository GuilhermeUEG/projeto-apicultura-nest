<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 🐝 Sistema de Gestão de Apicultura

API desenvolvida para a disciplina de PROGRAMAÇÃO WEB, utilizando **NestJS** e os conceitos de **Arquitetura Hexagonal (Ports and Adapters)**.

## 👥 Autores
* **Guilherme Sousa Barbosa**
* **Samuel Antonio Borges Rezende**
---

## 🏗️ Arquitetura do Projeto
O sistema foi estruturado seguindo os princípios da Arquitetura Hexagonal para garantir o desacoplamento:

* **Domain**: Entidades de negócio (`Apiario`, `Colmeia`) e Portas (Interfaces de Repositório).
* **Application**: Casos de uso que gerenciam as regras de negócio.
* **Infrastructure**: Adaptadores de entrada (Controllers com Swagger) e saída (TypeORM com SQLite).

## 🛠️ Tecnologias Utilizadas
* **NestJS**: Framework Node.js progressivo.
* **TypeORM**: ORM para manipulação do banco de dados.
* **SQLite**: Banco de dados relacional em arquivo (`apicultura.sqlite`).
* **Swagger**: Documentação interativa da API.

---

## 🚀 Como Executar o Projeto

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Inicie o servidor:**
    ```bash
    npm run start:dev
    ```

3.  **Acesse o Swagger:**
    Abra o navegador em: [http://localhost:3000/api](http://localhost:3000/api)

---

## 🧪 Roteiro de Testes (Passo a Passo)

1.  **Criar Apiário**: Utilize o `POST /apiarios` para gerar um novo apiário. **Copie o ID** gerado.
2.  **Criar Colmeia**: No `POST /colmeias/{apiarioId}`, cole o ID no campo superior e envie o JSON da colmeia no corpo da requisição.
3.  **Listar Apiários**: No `GET /apiarios`, verifique se a colmeia aparece dentro da lista do apiário correspondente.
4.  **Teste de Erro**: Tente criar uma colmeia com um ID de apiário inválido para visualizar o **Filtro de Exceção Global** em ação.

---

## 📂 Organização de Pastas
```text
src/
 ├── application/       # Use Cases
 ├── domain/            # Entities & Ports
 ├── infrastructure/    # Adapters (Repositories, Controllers, DTOs, Filters)
 └── main.ts            # Configuração Global
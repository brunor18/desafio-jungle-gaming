# Jungle Gaming Wagering API

API REST para gerenciamento de carteiras e movimentações financeiras, desenvolvida com NestJS, TypeScript, MikroORM e PostgreSQL.

## Visão geral

A aplicação utiliza uma arquitetura organizada por domínio e infraestrutura, mantendo as regras de negócio financeiras isoladas das preocupações de persistência e transporte HTTP.

Os principais conceitos da aplicação são:

- Wallet: representa a carteira de um usuário.
- Money: value object utilizado para representar valores monetários com precisão.
- Wallet Ledger: registra os lançamentos financeiros da carteira.
- Use Cases: concentram os fluxos de negócio.
- Repositories: abstraem a persistência.
- DTOs: definem e validam os dados recebidos pela API.

## Tecnologias

- TypeScript
- NestJS
- Bun
- PostgreSQL
- MikroORM
- Decimal.js
- class-validator
- class-transformer

## Arquitetura

A estrutura principal do projeto é organizada da seguinte forma:

```text
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── domain/
│   ├── Money/
│   │   └── money.ts
│   └── Wallet/
│       ├── create-wallet.use-case.ts
│       ├── wallet.module.ts
│       ├── wallet.repository.ts
│       ├── wallet.ts
│       ├── controller/
│       │   └── wallet.controller.ts
│       ├── dto/
│       │   └── create-wallet.dto.ts
│       ├── ledger/
│       │   ├── ledger-direction.ts
│       │   ├── wallet-ledger-entry.ts
│       │   └── wallet-ledger.repository.ts
│       └── walletTests/
└── infrastructure/
    └── database/
        ├── entities/
        ├── mappers/
        ├── migrations/
        └── repos/
```

### Domínio

O domínio contém as entidades, value objects, regras de negócio e contratos de persistência.

### Infraestrutura

A infraestrutura contém as entidades do MikroORM, mappers e implementações concretas dos repositories.

### HTTP

A camada HTTP utiliza controllers e DTOs para expor os casos de uso através da API REST.

## Money

`Money` é um value object responsável pela representação de valores financeiros.

A aplicação utiliza `Decimal.js` para realizar operações matemáticas com precisão, evitando os problemas de ponto flutuante do tipo `number`.

Um valor monetário possui:

- `amount`
- `currency`

Exemplo:

```ts
Money.from({
    amount: '100.00',
    currency: 'BRL',
});
```

A moeda faz parte do valor monetário e é considerada nas operações e validações do domínio.

## Wallet

A Wallet representa uma carteira financeira associada a um usuário.

Suas principais propriedades são:

- `id`
- `userId`
- `currency`
- `balance`
- `version`

O saldo é representado pelo value object `Money`.

A propriedade `version` permite controlar a versão da carteira e fornece a base para mecanismos de concorrência otimista.

## Ledger

O Ledger mantém o histórico dos lançamentos financeiros realizados nas carteiras.

Cada lançamento registra:

- identificação do lançamento;
- carteira relacionada;
- transação de origem;
- direção da movimentação;
- valor;
- moeda;
- saldo anterior;
- saldo posterior;
- data de criação.

As direções suportadas são:

```text
DEBIT
CREDIT
```

Os lançamentos mantêm a consistência entre o valor movimentado e os saldos registrados.

## Persistência

O PostgreSQL é utilizado como banco de dados principal e o MikroORM é responsável pelo mapeamento objeto-relacional.

A persistência separa as entidades de banco dos objetos de domínio através de mappers.

Isso permite que:

```text
Domínio
   ↓
Mapper
   ↓
Entity
   ↓
PostgreSQL
```

e, no sentido inverso:

```text
PostgreSQL
   ↓
Entity
   ↓
Mapper
   ↓
Domínio
```

## API

### Criar uma Wallet

```http
POST /wallets
Content-Type: application/json
```

Exemplo de requisição:

```json
{
  "userId": "user-1",
  "currency": "BRL"
}
```

Resposta:

```json
{
  "message": "Wallet criada com sucesso"
}
```

Os dados recebidos são validados pelo `CreateWalletDto`.

## Validação

A aplicação utiliza o `ValidationPipe` global do NestJS.

Isso garante que os DTOs sejam validados antes de chegarem aos casos de uso.

As validações de entrada ficam concentradas nos DTOs, enquanto as regras financeiras permanecem no domínio.

## Tratamento de erros

A API utiliza exceções do NestJS para representar erros HTTP e manter respostas consistentes para situações inválidas.

Erros relacionados às regras de negócio são tratados na camada apropriada, evitando que detalhes de infraestrutura sejam expostos diretamente pelo domínio.

## Banco de dados

As configurações de conexão podem ser definidas através das seguintes variáveis de ambiente:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=jungle
POSTGRES_PASSWORD=jungle
POSTGRES_DB=wagering
```

Os valores padrão utilizados pela aplicação são:

```text
host: localhost
port: 5432
user: jungle
password: jungle
database: wagering
```

Para ambientes diferentes, recomenda-se configurar essas variáveis de acordo com a infraestrutura utilizada.

## Instalação

Instale as dependências:

```bash
bun install
```

Configure as variáveis de ambiente do PostgreSQL.

Em seguida, execute as migrations:

```bash
bun run migration:up
```

## Execução

Para iniciar a aplicação em desenvolvimento:

```bash
bun run start:dev
```

Para iniciar a aplicação:

```bash
bun run start
```

## Testes

A suíte de testes pode ser executada com:

```bash
bun test
```

Também é possível executar um arquivo específico:

```bash
bun test caminho/do/arquivo.test.ts
```

Os testes abrangem diferentes níveis da aplicação, incluindo:

- value objects;
- entidades de domínio;
- casos de uso;
- controllers;
- módulos NestJS;
- mappers;
- repositories;
- persistência;
- integração e E2E.

## Build

Para gerar o build da aplicação:

```bash
bun run build
```

## Scripts

Os principais comandos disponíveis são:

```bash
bun install
bun run start
bun run start:dev
bun run build
bun test
bun run migration:create
bun run migration:up
bun run migration:list
```

## Princípios de implementação

O projeto segue princípios importantes para uma aplicação financeira:

### Precisão monetária

Valores financeiros não são manipulados diretamente com `number`. O domínio utiliza `Decimal.js`.

### Encapsulamento

As regras financeiras ficam nas entidades e value objects do domínio.

### Separação de responsabilidades

Controllers, casos de uso, domínio e infraestrutura possuem responsabilidades distintas.

### Persistência desacoplada

O domínio depende de interfaces de repository, enquanto a infraestrutura fornece suas implementações.

### Consistência financeira

Os lançamentos do Ledger registram o estado do saldo antes e depois da movimentação, permitindo rastreabilidade das operações.

### Integridade no banco

As principais invariantes estruturais também são protegidas através das constraints do PostgreSQL.

## Estrutura de testes

Os testes acompanham a organização do código e permitem validar individualmente as principais responsabilidades da aplicação.

Exemplos:

```text
Money
Wallet
CreateWalletUseCase
WalletController
WalletModule
WalletMapper
WalletLedgerEntry
WalletLedgerEntryMapper
WalletRepository
WalletLedgerRepository
E2E
```

## Desenvolvimento

Fluxo recomendado para desenvolvimento:

```text
1. Alterar o domínio ou caso de uso
2. Criar ou atualizar os testes
3. Atualizar a infraestrutura quando necessário
4. Atualizar a API/DTO quando necessário
5. Executar os testes
6. Executar o build
```

Antes de uma entrega, execute:

```bash
bun test
bun run build
```

## Licença

Projeto desenvolvido como parte do desafio técnico Jungle Gaming.

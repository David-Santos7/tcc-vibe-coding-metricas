# Agenda de agendamentos

CRUD monolítico em JavaScript CommonJS para o Cenário A do experimento de Vibe Coding. A aplicação renderiza HTML com EJS e persiste os agendamentos em SQLite por `better-sqlite3`.

## Requisitos

- Node.js `24.22.2` (versão indicada em `.nvmrc`; `package.json` restringe a linha 24).
- npm incluído na distribuição do Node.js.

## Executar localmente

```powershell
npm ci
Copy-Item .env.example .env
npm start
```

Abra `http://localhost:3000`. O banco `data/appointments.db` e a tabela são criados automaticamente. `PORT` e `DATABASE_PATH` podem ser definidos no `.env`.

## Funcionalidades

- Criar, listar, visualizar, editar e excluir agendamentos.
- UUIDs, timestamps ISO 8601 e observações opcionais limitadas a 500 caracteres.
- Validação de data real e horário `HH:mm`; criação e edição não aceitam horários passados em `America/Sao_Paulo`.
- Restrição de unicidade no SQLite para data e horário; conflitos também tratados nos casos de uso.
- Telas responsivas com HTML semântico, labels, mensagens de erro, foco visível e JavaScript mínimo no navegador.

## Qualidade

```powershell
npm test
npm run test:coverage
npm run lint
npm run format:check
npm run check
```

Os testes utilizam `node:test`, `node:assert/strict`, Supertest e SQLite em memória. A cobertura é a reportada pelo runner nativo do Node.js; não há percentual mínimo declarado. A CI em `.github/workflows/ci.yml` executa instalação limpa, ESLint, Prettier e testes com cobertura em Node.js 24.22.2.

## Estrutura

- `src/domain`: entidade, validações e regras de domínio.
- `src/application`: casos de uso e contrato de repositório.
- `src/presentation`: controllers, rotas, middlewares, EJS e CSS.
- `src/infrastructure`: SQLite e repositório concreto.
- `src/main`: composição manual e inicialização do servidor.
- `tests`: testes unitários, integração, HTTP, arquitetura e doubles.
- `docs/tcc`: protocolo, interação registrada, evidências e métricas experimentais.

Este diretório não tinha aplicação ou histórico Git no início. Limitações de baseline, autoria, cobertura das interações e execução remota da CI estão documentadas em `docs/tcc/`.

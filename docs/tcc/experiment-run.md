# Registro da execução experimental

- `run_id`: `RUN-A-20261104-01`
- `scenario_id`: `A` — Vibe Coding
- `session_id`: `3aaa49f7-f5fc-4272-a178-6a99c49d8fa8`
- `started_at`: `2026-11-04T16:39:54.199-03:00` (primeira interação experimental observada)
- `finished_at`: `2026-11-04T16:55:43.7563501-03:00` (fim do teste final do CRUD).
- Objetivo: criar neste diretório vazio o CRUD de agendamentos descrito em `prompt-vibe-coding-metricas-tcc.md`, respeitando também o protocolo TDD de `vibe-coding-tdd.md`.
- Agente: assistente principal, IA usando Copilot SDK no VS Code. Subagentes: não utilizados.
- Stack de validação: Node.js `v24.22.2`, npm `11.19.1`; versões de dependências verificadas no lockfile e por `npm list --depth=0`.
- Versões instaladas: `express@5.3.0`, `ejs@7.0.2`, `better-sqlite3@13.0.3`, `dotenv@18.0.9`, `helmet@8.3.0`; desenvolvimento/testes: `supertest@7.3.1`, `eslint@10.14.0`, `@eslint/js@10.0.1`, `prettier@3.9.10`, `nodemon@3.1.14`. SQLite embarcado validado: `3.53.4`.
- Estado Git: inexistente antes da implementação; nenhum SHA/branch inicial disponível. Nenhum commit ou push é presumido.
- Pausas: nenhuma pausa foi documentada até este registro. Tempo ativo de geração não é inferido a partir do tempo decorrido.
- Evidências: `baseline.md`, `ai-interaction-log.md`, `events.csv`, `test-results.md`, `tdd-validation.md` e `metrics-summary.md`.

## Análise dos protocolos e decisões de execução

- O protocolo principal determina um CRUD monolítico novo, Clean Architecture simplificada, SQLite, regras RN-001–RN-010, métricas M1–M8 e CI. Esses requisitos guiaram a estrutura e a implementação.
- O protocolo TDD pressupõe um CRUD existente e proíbe recriá-lo. A inspeção local comprovou que não havia código, histórico Git ou testes. Para não declarar defeito histórico inexistente, RN-007 foi testada como comportamento novo durante a construção; a documentação TDD identifica expressamente essa limitação.
- O prompt principal pede não aproveitar material de outra execução; por isso o repositório remoto referenciado pelo documento TDD não foi clonado ou usado.
- A versão efetiva do PATH no início era Node.js `v26.13.0`, divergente do pedido. Somente a distribuição oficial Node.js `v24.22.2` foi usada para npm, instalação, testes e validações. `.nvmrc`, `engines`, `.npmrc` e GitHub Actions restringem o projeto à versão exata.
- O pacote nativo `better-sqlite3` teve o script de instalação aprovado explicitamente pelo npm e foi validado com SQLite `3.53.4`. Dependências foram fixadas no `package-lock.json`; `npm ci` finalizou com sucesso.
- Foi configurada CI, mas sem checkout remoto/execução GitHub não há evidência de `run_id`, SHA ou aprovação.
- Não houve commits, pois não havia repositório Git e o protocolo TDD não autoriza commit sem confirmação. Não há baseline/final SHA, diff Git ou hooks a registrar.
- Não foi documentada pausa. Duração decorrida observada: `00:15:49.557350` entre a interação inicial e o teste final. O tempo ativo não foi medido.

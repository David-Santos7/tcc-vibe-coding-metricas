# TCC — CENÁRIO A
# VIBE CODING AUTÔNOMO COM RASTREABILIDADE E MÉTRICAS EXPERIMENTAIS

## 1. PAPEL E OBJETIVO

Você é um agente autônomo de desenvolvimento Full Stack responsável por criar, executar, testar, corrigir, versionar e documentar um sistema CRUD de agendamentos.

O projeto integra um TCC que investiga a relação entre desenvolvimento assistido por Inteligência Artificial, Clean Architecture, organização do código, rastreabilidade e qualidade de software.

Você atuará exclusivamente no Cenário A — Vibe Coding.

Desenvolva o sistema autonomamente, seguindo as instruções centralizadas neste prompt.

Não introduza Spec-Driven Development ou artefatos formais de OpenSpec.

Não utilize código, resultados ou conhecimento de outra execução experimental para melhorar o projeto.

Não tente demonstrar antecipadamente superioridade ou inferioridade de qualquer metodologia.

## 2. AUTONOMIA DO AGENTE

Execute o desenvolvimento do início ao fim.

Você pode:

- Criar arquivos e diretórios.
- Instalar dependências autorizadas.
- Implementar funcionalidades.
- Executar testes.
- Identificar defeitos.
- Realizar correções localizadas.
- Refatorar quando necessário.
- Documentar a implementação.
- Registrar evidências experimentais.

Não peça confirmação para decisões técnicas pequenas e reversíveis.

Não pare depois de apresentar somente um plano ou estrutura.

Ao encontrar um defeito, identifique a causa, execute a correção, repita a validação e registre a evidência.

Nunca declare que um teste passou sem executá-lo.

Não esconda falhas desabilitando ESLint, testes ou verificações.

Não realize operações destrutivas no Git, alterações de requisitos ou mudanças de stack sem autorização explícita.

## 3. PRESERVAÇÃO DO EXPERIMENTO

Antes de modificar o projeto, identifique se está trabalhando em:

- uma nova implementação;
- um repositório parcialmente implementado;
- uma versão histórica do experimento.

Se houver histórico anterior, preserve o baseline e registre o commit inicial.

Não substitua a versão histórica por uma implementação corrigida.

Não reconstrua artificialmente prompts, tempos ou intervenções humanas de execuções anteriores.

As métricas deverão ser coletadas somente a partir de evidências efetivamente disponíveis.

Em caso de repositório com stack incompatível, registre a divergência e não faça migração destrutiva.

Uma nova execução alinhada deverá ocorrer em ambiente isolado e identificado.

## 4. STACK OBRIGATÓRIA

Desenvolver um sistema monolítico com:

- JavaScript puro, CommonJS;
- Node.js 24, caso compatível com as dependências e com o ambiente experimental padronizado;
- Express;
- EJS;
- HTML semântico;
- CSS puro;
- JavaScript puro no navegador;
- SQLite;
- better-sqlite3.

Dependências auxiliares:

- dotenv;
- helmet;
- nodemon;
- supertest;
- eslint;
- prettier.

Testes:

- node:test;
- node:assert/strict;
- Supertest;
- cobertura nativa do Node.js.

Ferramentas:

- Git;
- GitHub;
- GitHub Actions.

Registrar as versões reais utilizadas.

Não utilizar:

- TypeScript;
- React;
- Vite;
- Vue;
- Next.js;
- Prisma;
- PostgreSQL;
- Python na aplicação;
- Docker;
- monorepo com aplicações independentes;
- microservices;
- autenticação;
- autorização.

Não adicionar dependências desnecessárias.

## 5. MODELO DO SISTEMA

Criar um único projeto Node.js, com um package.json principal, um servidor Express e um banco SQLite.

O Express deverá renderizar as páginas HTML por meio de EJS.

O sistema deverá permitir:

1. Criar agendamento.
2. Listar agendamentos.
3. Visualizar agendamento.
4. Editar agendamento.
5. Excluir agendamento.

Não criar frontend e backend como aplicações independentes.

## 6. ENTIDADE APPOINTMENT

Campos:

- id;
- clientName;
- service;
- appointmentDate;
- appointmentTime;
- notes;
- createdAt;
- updatedAt.

Utilizar UUID para o identificador, por meio de crypto.randomUUID().

createdAt e updatedAt deverão ser timestamps ISO 8601.

## 7. REGRAS DE NEGÓCIO

RN-001 — clientName obrigatório, com trim().

RN-002 — service obrigatório, com trim().

RN-003 — appointmentDate obrigatório.

RN-004 — appointmentTime obrigatório.

RN-005 — appointmentDate no formato YYYY-MM-DD e representando data real.

RN-006 — appointmentTime no formato HH:mm, entre 00:00 e 23:59.

RN-007 — Proibir criação ou atualização de agendamento no passado.

RN-008 — Proibir dois agendamentos com a mesma data e horário.

RN-009 — Durante a edição, ignorar o próprio id ao verificar conflitos.

RN-010 — notes opcional, com limite de 500 caracteres.

Requisitos adicionais:

- Agendamentos históricos devem continuar representáveis.
- A verificação de passado deve ocorrer nos casos de uso correspondentes.
- Não aceitar datas impossíveis.
- Preservar createdAt na edição.
- Atualizar updatedAt nas alterações.
- Utilizar UNIQUE(appointment_date, appointment_time) no SQLite.
- Tratar conflitos também na Application.
- Utilizar a convenção temporal America/Sao_Paulo para as regras de comparação, conforme contrato comum do experimento.
- Permitir controle do relógio nos testes.
- Não utilizar o horário real da máquina como referência fixa dos testes.

## 8. CLEAN ARCHITECTURE SIMPLIFICADA

Preservar:

Domain;
Application;
Interface Adapters;
Frameworks and Drivers.

A direção das dependências deve apontar para o núcleo.

### Domain

src/domain/Appointment.js

Conter invariantes de domínio.

Não importar Express, EJS ou SQLite.

### Application

src/application/

Implementar:

- CreateAppointment;
- GetAppointment;
- ListAppointments;
- UpdateAppointment;
- DeleteAppointment.

Criar:

src/application/repositories/AppointmentRepository.js

Os casos de uso devem depender do contrato de repositório, não do SQLite concreto.

### Infrastructure

src/infrastructure/database/database.js

src/infrastructure/database/schema.sql

src/infrastructure/repositories/SQLiteAppointmentRepository.js

Implementar persistência e consultas parametrizadas.

### Presentation

src/presentation/controllers/

src/presentation/routes/

src/presentation/middlewares/

Controllers devem chamar casos de uso, sem conter SQL ou regras de negócio.

### Main

src/main/app.js

src/main/server.js

src/main/compositionRoot.js

Realizar composição manual de dependências.

Não criar abstrações desnecessárias.

## 9. PERSISTÊNCIA E ROTAS

Utilizar SQLite em:

data/appointments.db

Criar automaticamente a tabela appointments.

Não versionar o arquivo .db.

Utilizar banco em memória nos testes de integração.

Implementar:

GET /

GET /appointments

GET /appointments/new

POST /appointments

GET /appointments/:id

GET /appointments/:id/edit

POST /appointments/:id/update

POST /appointments/:id/delete

Mapear:

- ValidationError → 400;
- AppointmentNotFoundError → 404;
- AppointmentConflictError → 409;
- erro inesperado → 500.

Não expor SQL, stack traces ou detalhes internos ao usuário.

## 10. INTERFACE

Utilizar EJS com HTML semântico, CSS puro e JavaScript mínimo.

Criar telas de listagem, cadastro, visualização, edição e erros.

A interface deve ser responsiva e possuir labels, foco visível e mensagens compreensíveis.

Não adicionar framework frontend.

## 11. TESTES E COBERTURA

Criar:

tests/unit/

tests/integration/

tests/http/

tests/doubles/

Testar a entidade, todos os casos de uso, persistência e rotas HTTP.

Cobrir:

- campos obrigatórios;
- datas inválidas;
- horários inválidos;
- agendamentos passados;
- conflitos;
- edição;
- exclusão;
- códigos HTTP;
- erros inesperados.

Utilizar node:test e Supertest.

Executar cobertura por meio do runner nativo do Node.js.

Utilizar scripts equivalentes a:

- npm test;
- npm run test:coverage;
- npm run lint;
- npm run format:check;
- npm run check.

O relatório de cobertura deverá considerar os arquivos JavaScript da aplicação em src/, utilizando a mesma configuração adotada para o outro cenário.

Registrar cobertura de linhas, branches e funções.

Não estabelecer ou inventar percentuais mínimos de cobertura como resultado científico.

Não confundir cobertura de código com qualidade dos testes ou prática de TDD.

## 12. PROTOCOLO DE MÉTRICAS

Este projeto deverá registrar oito indicadores experimentais.

A coleta é observacional e não modifica a metodologia de Vibe Coding.

Toda informação deve possuir evidência verificável.

### M1 — Quantidade de prompts

Contar cada mensagem explicitamente enviada pelo pesquisador ao agente de codificação.

Incluir o prompt inicial.

Não contar respostas da IA, chamadas automáticas de ferramentas ou mensagens internas não observáveis.

Registrar por sessão:

- session_id;
- prompt_id;
- horário registrado;
- referência ao conteúdo enviado.

Preservar exportações de conversa quando disponíveis.

Se não for possível recuperar todas as interações, informar que a contagem é parcial.

### M2 — Tempo de desenvolvimento

Registrar:

- started_at;
- finished_at;
- pausas documentadas;
- duração total decorrida;
- duração descontando apenas pausas efetivamente identificadas, quando aplicável.

O início deverá corresponder à primeira interação experimental registrada.

O término deverá corresponder à conclusão da validação final do CRUD, segundo os critérios definidos.

Registrar timestamps em ISO 8601 com fuso.

Não utilizar apenas os horários de commits para inferir tempo ativo.

Não classificar o intervalo total como tempo de geração da IA.

### M3 — Correções realizadas

Cada defeito identificado receberá um correction_id único.

Registrar:

- descrição do problema;
- etapa em que foi encontrado;
- arquivos afetados;
- evidência do defeito;
- responsável pela intervenção;
- ação corretiva;
- commits associados;
- validação posterior.

Contar um defeito corrigido uma vez, mesmo que tenha exigido vários commits.

Não contar novas funcionalidades, refatorações preventivas ou ajustes exclusivamente cosméticos como correções de defeitos.

Manter essas categorias separadas.

### M4 — Arquivos modificados

Identificar baseline_sha e final_sha.

Utilizar Git para apurar arquivos únicos:

- adicionados;
- modificados;
- removidos;
- renomeados.

Registrar separadamente arquivos de aplicação, testes, configuração e documentação.

Não contar o mesmo arquivo repetidamente no total de arquivos únicos.

Excluir da contagem de código-fonte dependências instaladas, banco local, caches e arquivos gerados não rastreados.

Não considerar quantidade de arquivos modificados como medida direta de qualidade.

### M5 — Testes executados

Para cada execução, registrar:

- identificador da execução;
- comando;
- timestamp;
- SHA analisado;
- quantidade de testes executados;
- aprovados;
- reprovados;
- ignorados;
- duração reportada;
- resultado final.

Registrar tentativas anteriores e suas falhas.

Para comparação final, identificar uma execução de validação correspondente ao commit final de cada cenário.

Não confundir quantidade de arquivos de teste com quantidade de testes executados.

### M6 — Cobertura de código

Executar o runner nativo do Node.js com cobertura.

Registrar:

- versão do Node.js;
- comando utilizado;
- SHA;
- percentual de linhas;
- percentual de branches;
- percentual de funções;
- arquivos incluídos;
- arquivos excluídos;
- resultado da execução.

Aplicar a mesma convenção de inclusão utilizada no outro cenário.

Não afirmar cobertura completa de arquivos nunca instrumentados.

### M7 — Resultado da CI

Criar ou adaptar GitHub Actions.

Registrar:

- repository;
- commit_sha;
- workflow;
- run_id;
- run_url;
- data;
- resultado final;
- jobs executados;
- falhas e tentativas de repetição.

Classificar resultados como:

SUCCESS;

FAILURE;

CANCELLED;

SKIPPED;

NOT_EXECUTED;

UNKNOWN.

Não declarar SUCCESS antes da conclusão real da CI.

O arquivo ci.yml não constitui evidência de aprovação.

### M8 — Intervenções humanas

Registrar alterações manuais identificáveis.

Diferenciar:

- edição manual de código;
- edição manual de testes;
- ajuste manual de configuração;
- alteração manual de documentação;
- intervenção por prompt;
- revisão sem alteração;
- ação de execução ou aprovação.

Para a métrica de alterações manuais de código, contar somente eventos identificados de edição direta.

Registrar:

- intervention_id;
- horário;
- descrição;
- tipo;
- arquivos afetados;
- referência Git;
- evidência;
- identificação do participante, quando apropriado.

Não atribuir automaticamente ao humano todo commit realizado com credenciais do desenvolvedor.

Se não houver evidência suficiente, registrar AUTORIA NÃO DETERMINADA.

## 13. REGISTRO PADRONIZADO DE EVENTOS

Utilizar event_id único para cada registro relevante.

Registrar:

- event_id;
- run_id;
- scenario_id = A;
- session_id;
- timestamp;
- event_type;
- actor;
- description;
- prompt_ref;
- baseline_sha;
- resulting_sha;
- evidence_ref;
- status.

Categorias de event_type:

- PROMPT;
- IMPLEMENTATION;
- TEST_RUN;
- DEFECT_FOUND;
- CORRECTION;
- HUMAN_EDIT;
- COMMIT;
- CI_RUN;
- PAUSE;
- RESUME;
- VALIDATION.

Não duplicar o mesmo evento apenas porque aparece em vários documentos.

## 14. DOCUMENTAÇÃO DAS EVIDÊNCIAS

Criar, quando aplicável:

docs/tcc/baseline.md

docs/tcc/experiment-run.md

docs/tcc/ai-interaction-log.md

docs/tcc/metrics-summary.md

docs/tcc/corrections.csv

docs/tcc/human-interventions.csv

docs/tcc/sessions.csv

docs/tcc/test-results.md

docs/tcc/ci-evidence.md

Não criar dados fictícios para preencher arquivos.

Quando houver ausência de evidência, utilizar NÃO DISPONÍVEL.

Não publicar logs contendo segredos ou dados privados.

Armazenar exportações completas de conversas em local seguro, com referências e hashes quando necessário.

## 15. GIT E HISTÓRICO

Antes da implementação:

1. Verificar git status.
2. Identificar a raiz Git.
3. Registrar HEAD e branch.
4. Identificar baseline.
5. Verificar alterações preexistentes.

Não apagar .git.

Não executar reset --hard, force-push ou rebase destrutivo sem autorização.

Criar commits após alterações significativas e verificadas.

Utilizar mensagens descritivas:

- feat: implementa cadastro;
- fix: corrige regra temporal;
- test: adiciona teste de conflito;
- docs: registra evidencias experimentais.

Relacionar commits aos eventos e problemas documentados.

Não usar número de commits como substituto para número de prompts ou defeitos.

## 16. GIT HOOKS

Quando tecnicamente apropriado, configurar mecanismo leve de coleta de metadados de commits futuros.

Registrar SHA, horário, branch e session_id conhecido.

Hooks não devem modificar o código automaticamente nem registrar informações privadas.

Documentar que hooks locais podem não estar ativos em outras máquinas.

Não tratar hooks como exportação de conversas com IA.

## 17. INTEGRAÇÃO CONTÍNUA

Criar:

.github/workflows/ci.yml

Executar:

- npm ci;
- npm run lint;
- npm run format:check;
- npm run test:coverage;
- teste arquitetural, quando implementado.

Utilizar banco SQLite isolado.

Registrar SHA, run ID e resultado.

Preservar relatórios relevantes como artifacts quando disponível.

Não configurar deployment automático de produção.

## 18. REPRODUTIBILIDADE

Após a implementação:

- identificar commit final;
- verificar dependências;
- executar instalação limpa;
- executar testes;
- executar cobertura;
- verificar CRUD;
- registrar ambiente;
- registrar eventuais falhas.

Repetir em clone limpo quando possível.

Não afirmar reprodução se ela não ocorreu.

## 19. RELATÓRIO FINAL

Entregar:

1. Sistema implementado.
2. Stack real.
3. Arquitetura.
4. Regras implementadas.
5. Testes executados.
6. Cobertura.
7. Baseline e commit final.
8. Métricas M1 a M8.
9. Referências aos registros de IA.
10. Correções documentadas.
11. Intervenções humanas conhecidas.
12. Resultado da CI.
13. Limitações de coleta.
14. Instruções de reprodução.

Para cada métrica, informar:

- valor;
- unidade;
- fonte;
- período;
- completude dos dados;
- limitações.

Diferenciar:

MEDIDO;

PARCIALMENTE MEDIDO;

NÃO DISPONÍVEL;

NÃO EXECUTADO;

NÃO APLICÁVEL.

Não converter valores desconhecidos em zero.

## 20. INÍCIO

Inspecione o ambiente.

Preserve o estado existente e identifique o modo de execução.

Inicie o registro de eventos antes da primeira modificação.

Implemente o CRUD autonomamente, valide cada etapa relevante e registre somente evidências reais.

Não pare apenas para apresentar o planejamento.

Execute as atividades seguras disponíveis até a entrega final, respeitando a integridade histórica e as restrições deste prompt.
# Registro de testes e qualidade

Execução: `RUN-A-20261104-01`; Node.js `v24.22.2` (npm `11.19.1`). Cada execução deve registrar comando, horário, SHA, totais, duração e resultado. SHA será identificado como indisponível enquanto não houver histórico Git.

## Baseline

- Horário observado pelo log do npm: `2026-11-04T19:42:24.622Z` (`2026-11-04T16:42:24.622-03:00`).
- Comando: `npm test`.
- Resultado: falha de ambiente, `ENOENT`, `package.json` inexistente. Nenhum teste foi executado; totais: NÃO APLICÁVEL.
- Evidência: saída do comando registrada nesta execução e log npm local `2026-11-04T19_42_24_622Z-debug-0.log`. O log local não é distribuído com o projeto.

## Ciclo TDD — RED (RN-007)

- Timestamp de registro: `2026-11-04T16:44:15.1996930-03:00`.
- Comando: `npm test -- tests/unit/create-appointment-tdd.test.js`.
- Resultado: 1 teste; 0 aprovados, 1 reprovado; duração total reportada `169.303 ms`.
- Falha esperada: `Missing expected rejection (ValidationError)` ao submeter um agendamento em `16:29` com relógio controlado em `16:30:45` no fuso -03:00.
- Diagnóstico: RN-007 ainda não estava implementada no caso de uso. Não foi falha de importação nem de configuração.

Saída preservada:

```text
tests 1
pass 0
fail 1
duration_ms 169.303
AssertionError [ERR_ASSERTION]: Missing expected rejection (ValidationError).
```

## Ciclo TDD — GREEN

- Horário observado: `2026-11-04T16:44:28.3258157-03:00`.
- Comando: `npm test -- tests/unit/create-appointment-tdd.test.js`.
- Resultado: 1 teste, 1 aprovado, 0 reprovados; `duration_ms 213.3305`; código de saída 0.
- Saída preservada: `✔ rejects an appointment earlier than the current time in Sao Paulo`; `tests 1`, `pass 1`, `fail 0`.

## Tentativas intermediárias

Os horários abaixo não foram emitidos pelos comandos nem capturados no momento; são identificados como não registrados, sem estimativa retrospectiva.

| Comando / etapa                                  | Node     |                         Testes | Duração reportada | Resultado / evidência                                                                                                                  |
| ------------------------------------------------ | -------- | -----------------------------: | ----------------: | -------------------------------------------------------------------------------------------------------------------------------------- |
| Primeira suíte completa: `npm test`              | v24.22.2 | 24; 21 aprovados, 3 reprovados |           1.408 s | Falhas observadas em persistência de instância `Appointment`, fixture HTTP incompleta e expectativa de horário local incorreta.        |
| Primeiro `npm run lint`                          | v24.22.2 |                              — |                 — | Falha de configuração: `@eslint/js` ausente. Dependência instalada e fixada.                                                           |
| Primeiro `npm run format:check`                  | v24.22.2 |                              — |                 — | Falha de formatação; os dois protocolos de entrada foram excluídos da formatação automática e os arquivos do projeto foram formatados. |
| Suíte após as primeiras correções: `npm test`    | v24.22.2 |  24; 23 aprovados, 1 reprovado |           1.266 s | Encontrada a mesma causa de parâmetros SQLite na operação de atualização; o repositório foi corrigido em criação e atualização.        |
| `npm run lint` após instalar ESLint              | v24.22.2 |                              — |                 — | Falha por parâmetro `t` não utilizado no teste HTTP; corrigido.                                                                        |
| Cobertura intermediária: `npm run test:coverage` | v24.22.2 |     24 aprovados, 0 reprovados |           1.152 s | Linhas 95,71%; branches 93,75%; funções 94,34%. A execução final posterior instrumentou as 18 fontes JS.                               |

## Validação final

| Execução             | Horário inicial–final                                                   | Comando                                              | SHA            | Testes                                      | Duração do runner | Resultado       |
| -------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------- | -------------- | ------------------------------------------- | ----------------: | --------------- |
| `TEST-A-FINAL-CHECK` | `2026-11-04T16:55:36.3462317-03:00`–`2026-11-04T16:55:41.9648811-03:00` | `npm run check` (ESLint, Prettier, cobertura nativa) | NÃO DISPONÍVEL | 29; 29 aprovados, 0 reprovados, 0 ignorados |        1.168770 s | SUCCESS; exit 0 |
| `TEST-A-FINAL-UNIT`  | `2026-11-04T16:55:42.0115609-03:00`–`2026-11-04T16:55:43.7563501-03:00` | `npm test`                                           | NÃO DISPONÍVEL | 29; 29 aprovados, 0 reprovados, 0 ignorados |        1.025557 s | SUCCESS; exit 0 |

Cobertura final do runner nativo Node.js: linhas **95,13%**, branches **91,55%**, funções **93,10%**. Comando: `node --experimental-test-coverage --test --test-coverage-include=src/**/*.js`; 18 arquivos `.js` de `src/`, sem meta mínima. Estes percentuais descrevem cobertura de execução, não qualidade dos testes.

## Ambiente e outras validações observadas

- Versão usada em todas as instalações e validações: Node.js `v24.22.2`, npm `11.19.1`. O Node.js `v26.13.0` encontrado inicialmente foi consultado somente com `node --version`; não executou npm, testes ou aplicação.
- `npm ci`: SUCCESS, instalou 188 pacotes, auditou 189; encontrou 5 vulnerabilidades moderadas no grafo total (desenvolvimento). `npm audit --omit=dev`: 0 vulnerabilidades de produção. Nenhum `npm audit fix` foi aplicado.
- O npm inicialmente bloqueou o script nativo do `better-sqlite3`; foi aprovada a instalação declarada em `package.json`, seguida por rebuild e consulta SQLite em memória (`3.53.4`). `npm install-scripts ls`: nenhum script pendente.
- Validação manual no navegador integrado: `/` e `/appointments/new` renderizados; os quatro campos obrigatórios e seus labels foram observados. Na tela de cadastro, `main.clientWidth` e `main.scrollWidth` foram ambos 659 px no viewport usado. Timestamp da inspeção visual: NÃO REGISTRADO.
- As saídas são registradas neste documento e no histórico da sessão; exportação integral dos logs/ferramentas: NÃO DISPONÍVEL.

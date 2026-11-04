# Validação TDD — Cenário A

- Execução: `RUN-A-20261104-01`.
- Contexto inicial: o diretório continha somente os protocolos e não havia CRUD, README, package.json ou testes. Assim, não existia defeito em sistema anterior a corrigir.
- Regra selecionada: RN-007 — impedir criação ou atualização de agendamento no passado, comparando no fuso `America/Sao_Paulo`.
- **RED:** com o caso de uso mínimo executável e ainda sem a regra temporal, `npm test -- tests/unit/create-appointment-tdd.test.js` executou 1 teste: 0 aprovado, 1 reprovado. Falha observada: `AssertionError: Missing expected rejection (ValidationError)`. A falha demonstra o comportamento RN-007 ausente, não uma falha de importação/configuração.
- **GREEN:** `CreateAppointment` compara data/hora com relógio injetável no fuso `America/Sao_Paulo`; o teste RED passou (1/1). A mesma regra é aplicada por `UpdateAppointment`.
- **REFACTOR:** não foi necessária refatoração posterior adicional. A comparação foi isolada em `src/domain/isAppointmentInPast.js` para reutilização na criação e edição; a suíte completa foi reexecutada após a conclusão.
- **Validação final:** 29 testes aprovados, 0 reprovados; cobertura: linhas 95,13%, branches 91,55%, funções 93,10%; ESLint e Prettier passaram em `npm run check`.
- **Evidência:** `tests/unit/create-appointment-tdd.test.js`, `src/application/CreateAppointment.js`, `src/application/UpdateAppointment.js`, `src/domain/isAppointmentInPast.js` e saídas registradas em `test-results.md`.
- **Conclusão:** foi demonstrado um ciclo real para comportamento novo durante a construção em diretório vazio. Não se afirma que o CRUD preexistente foi desenvolvido integralmente com TDD nem que havia defeito histórico.
- Commits inicial/final: **NÃO DISPONÍVEIS** (sem repositório Git; commits não autorizados).

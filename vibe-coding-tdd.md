# PROMPT — IMPLEMENTAÇÃO E VALIDAÇÃO DE TDD
## CENÁRIO A — VIBE CODING + CLEAN ARCHITECTURE

### 1. CONTEXTO

Você é um agente de desenvolvimento de software responsável por acrescentar e validar Test-Driven Development (TDD) no CRUD de agendamentos existente.

**Repositório:**
https://github.com/David-Santos7/vibe-coding-metricas-tcc.git

**Cenário experimental:** A — Vibe Coding.

**Objetivo:** demonstrar a aplicação prática de TDD em uma regra ou correção pontual do CRUD existente.

Este é um projeto acadêmico simples. Não aumente sua complexidade desnecessariamente.

Não recrie o sistema, não substitua sua arquitetura e não adicione funcionalidades fora do escopo.

### 2. RECONHECIMENTO DO PROJETO

Antes de modificar arquivos:

1. Examine o README, o package.json e os testes existentes.
2. Identifique as regras do CRUD já implementadas.
3. Execute `npm test` para verificar o estado inicial.
4. Identifique a branch e o commit inicial utilizando Git.
5. Preserve o histórico existente.

Respeite a stack atual:

- JavaScript CommonJS;
- Node.js 24;
- Express;
- EJS;
- SQLite;
- better-sqlite3;
- node:test;
- node:assert/strict;
- Supertest.

Não instalar ferramentas de TDD adicionais. Utilize as ferramentas já presentes.

### 3. SELEÇÃO DA REGRA

Analise as regras de negócio RN-001 a RN-010 e os testes existentes.

Escolha um comportamento real que ainda precise ser implementado ou um defeito existente que possa ser corrigido com TDD.

Dê preferência a uma validação simples do domínio ou de um caso de uso, por exemplo:

- Validação de data;
- Validação de horário;
- Prevenção de conflito;
- Limite de observações;
- Edição de agendamento.

Esses são candidatos, não defeitos presumidos.

Priorize a mesma regra utilizada no Cenário B, se existir uma lacuna equivalente.

Não altere uma regra funcional apenas para provocar uma falha artificial.

Se todos os comportamentos relevantes já estiverem implementados e corretos, não invente um novo requisito. Nesse caso, verifique quais ciclos TDD históricos podem ser comprovados e informe que uma nova aplicação real de TDD dependerá de uma mudança legítima.

### 4. APLICAÇÃO DE TDD

Execute o ciclo RED → GREEN → REFACTOR.

**RED — Criar o teste primeiro**

1. Selecione o comportamento ainda não atendido.
2. Crie um teste unitário que expresse o comportamento esperado.
3. Execute o teste antes de alterar a implementação.
4. Confirme que ele falha pelo motivo esperado.
5. Preserve a saída da execução.

Uma falha de importação ou configuração não deve ser usada como prova de RED quando não demonstrar adequadamente o comportamento pretendido.

**GREEN — Implementar o mínimo necessário**

1. Modifique apenas o código necessário.
2. Execute novamente o teste.
3. Confirme sua aprovação.
4. Execute os demais testes relevantes.
5. Preserve o resultado.

**REFACTOR — Melhorar somente se necessário**

1. Verifique legibilidade, responsabilidades e duplicação.
2. Faça uma refatoração pequena apenas se ela agregar valor.
3. Execute novamente os testes.
4. Confirme que o comportamento foi preservado.

Caso nenhuma refatoração seja necessária, registre essa decisão.

### 5. CLEAN ARCHITECTURE

Mantenha a organização atual:

- Domain;
- Application;
- Presentation;
- Infrastructure;
- Main.

Não colocar regras de negócio em controllers.

Não adicionar acesso SQLite ao domínio.

Não fazer os casos de uso dependerem da implementação concreta do repositório.

Não criar interfaces, camadas ou diretórios desnecessários.

### 6. VALIDAÇÃO FINAL

Depois da implementação:

1. Execute `npm test`.
2. Execute `npm run test:coverage`.
3. Execute `npm run lint`.
4. Execute `npm run format:check`.
5. Confirme que o comportamento do CRUD foi preservado.

Registre os resultados reais.

Se algum comando falhar, informe a causa e faça somente a correção necessária.

Não desabilite testes para obter uma execução bem-sucedida.

Não invente percentuais de cobertura.

### 7. REGISTRO SIMPLES PARA O TCC

Crie ou atualize:

`docs/tcc/tdd-validation.md`

O documento deverá ser curto e apresentar:

**Cenário:** A — Vibe Coding.

**Regra escolhida:** RN ou RF correspondente.

**Estado inicial:** descrição do comportamento não atendido ou defeito encontrado.

**RED:** teste criado e resultado da execução.

**GREEN:** implementação e resultado da execução.

**REFACTOR:** melhoria realizada ou indicação de que não foi necessária.

**Validação final:** quantidade de testes aprovados, cobertura efetivamente obtida e eventuais falhas.

**Evidência:** referência aos arquivos modificados, commit inicial/final e saídas de teste disponíveis.

**Conclusão:** breve descrição do que foi demonstrado.

Não criar relatórios adicionais além do necessário.

O registro deve identificar essa atividade como validação ou intervenção posterior, sem afirmar que todo o desenvolvimento original foi realizado com TDD.

### 8. GIT

Não reescreva o histórico.

Registre o SHA inicial e o estado do diretório de trabalho.

Não inclua alterações preexistentes não relacionadas.

Crie commit descritivo para a alteração somente quando autorizado.

Não realize push sem autorização.

### 9. RESULTADO ESPERADO

Ao concluir, apresente:

1. Regra selecionada.
2. Teste criado.
3. Resultado RED.
4. Alteração implementada.
5. Resultado GREEN.
6. Resultado após REFACTOR.
7. Resultado final dos testes.
8. Cobertura observada.
9. Arquivos alterados.
10. Caminho da documentação.

**Prioridade:** demonstrar pelo menos um ciclo TDD real e verificável, quando houver uma mudança legítima a realizar, preservando o CRUD e sua arquitetura.

Não transformar o projeto em uma pesquisa complexa de auditoria.

Inicie pela inspeção dos testes existentes e continue com a implementação pontual autorizada.
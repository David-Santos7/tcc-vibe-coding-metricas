# Evidências de integração contínua

- Repositório GitHub e workflow remoto: **NÃO DISPONÍVEIS** no baseline.
- Workflow local será criado em `.github/workflows/ci.yml`.
- `repository`, `commit_sha`, `run_id`, URL, jobs e resultado remoto: **NÃO EXECUTADO / NÃO DISPONÍVEL** até que uma execução real no GitHub seja observável.
- A existência do arquivo de workflow não será tratada como evidência de aprovação.
- Validação local equivalente observada em `2026-11-04T16:55:36.3462317-03:00`: `npm run check` concluiu lint, format check e cobertura/testes com exit 0. Isso não é uma execução GitHub Actions nem recebe a classificação SUCCESS para M7.
- O projeto exige Node.js `24.22.2`, usa `npm ci`, `npm run lint`, `npm run format:check` e `npm run test:coverage`; o workflow preserva `coverage-report.txt` como artefato quando o runner remoto estiver disponível.

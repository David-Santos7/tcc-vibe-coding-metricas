# Baseline experimental — Cenário A

- Execução: `RUN-A-20261104-01`.
- Data da primeira interação observada: `2026-11-04T16:39:54.199-03:00`.
- Modo: nova implementação. O diretório continha somente os dois documentos de protocolo, sem aplicação.
- Arquivos existentes: `prompt-vibe-coding-metricas-tcc.md` e `vibe-coding-tdd.md`.
- `README.md`, `package.json`, testes, `.git` e branch: inexistentes.
- HEAD / `baseline_sha`: **NÃO DISPONÍVEL**; o diretório não era um repositório Git (`git rev-parse --show-toplevel` falhou).
- Alterações preexistentes: os dois documentos de protocolo foram preservados.
- `npm test` inicial, executado com Node.js 24.22.2 antes da criação da aplicação: falhou com `ENOENT`, pois não havia `package.json`. Não havia testes a executar.
- Node.js encontrado inicialmente no PATH: v26.13.0; não foi usado para instalar dependências nem para validar. Foi obtido o arquivo oficial `node-v24.22.2-win-x64.zip` e extraído em diretório temporário. Validações deste experimento usam exclusivamente Node.js v24.22.2 (npm v11.19.1).
- Repositório remoto / branch / commit inicial: **NÃO DISPONÍVEL**.
- O documento TDD cita `https://github.com/David-Santos7/vibe-coding-metricas-tcc.git`, mas esse repositório não estava clonado. Ele não foi consultado: o protocolo principal proíbe usar código ou resultados de outra execução para melhorar este cenário; a análise e a implementação foram feitas sobre os dois documentos presentes e o diretório local vazio.

Esta execução não substitui nem altera uma versão histórica: não foi encontrada aplicação ou história Git a preservar.

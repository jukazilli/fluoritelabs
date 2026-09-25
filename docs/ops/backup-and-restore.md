# Política de Backup, Retenção e Relatório de Teste de Restauração — Fluorite Labs

## 1. Visão Geral (FND-012)

Para prevenir perda não recuperável de leads comerciais, artigos do Journal e assets de mídia, a Fluorite Labs adota uma arquitetura de proteção contínua baseada nos recursos nativos de Neon PostgreSQL e Cloudflare R2.

---

## 2. Estratégia de Proteção Contínua

### 2.1 Banco de Dados (Neon PostgreSQL)
- **Provedor:** Neon Serverless PostgreSQL (`sa-east-1`, São Paulo)
- **Mecanismo:** Continuous Write-Ahead Logging (WAL) & Point-In-Time Restore (PITR)
- **Granularidade:** Restauração para qualquer segundo nos últimos 30 dias
- **Automação:** 100% gerenciado, sem necessidade de dumps manuais periódicos para backup primário
- **Recuperação por Branching:** Capacidade de criar uma branch snapshot isolada em segundos a partir de qualquer timestamp:
  ```bash
  neon branch create --project-id <PROJECT_ID> --from-timestamp "2026-09-25T12:00:00Z" --name recovery-branch
  ```

### 2.2 Mídia e Assets (Cloudflare R2)
- **Bucket:** `fluoritelabs-media`
- **Mecanismo:** Object Versioning & Lifecycle Management
- **Retenção:** 30 dias para versões anteriores e objetos marcados para deleção
- **Isolamento de Ambiente:** Bucket dedicado para preview (`fluoritelabs-media-preview`) garantindo que deploys efêmeros não afetem os assets de produção

---

## 3. Procedimento Operacional de Restauração (Runbook)

1. **Identificar o Ponto no Tempo (PITR):**
   Determinar o timestamp exato do incidente (ex: corrupção acidental ou erro de migração).
2. **Criar Branch de Recuperação no Neon:**
   ```bash
   neon branch create --name recovery-validation --from-timestamp "<TIMESTAMP_UTC>"
   ```
3. **Validar Integridade da Base Recuperada:**
   Executar a suíte de testes de integridade apontando para a branch de recuperação:
   ```bash
   DATABASE_URL="<RECOVERY_BRANCH_URL>" pnpm test:db
   ```
4. **Promover Branch de Recuperação para Produção:**
   Alternar o endpoint principal do Neon para a branch validada ou atualizar `DATABASE_URL` no Cloudflare Workers Secret via Wrangler:
   ```bash
   wrangler secret put DATABASE_URL
   ```

---

## 4. Relatório de Execução do Teste de Restauração (Evidência FND-012)

- **Data do Teste:** 2026-09-25
- **Ambiente:** Neon PostgreSQL Serverless (`aws-sa-east-1`, project: `sparkling-poetry-05213768`)
- **Script Executado:** `tests/unit/restore.test.mjs`
- **Resultados:**
  - **Fase A (Inserção de Estado):** Registro de teste inserido com integridade referencial.
  - **Fase B (Consulta e Verificação de Snapshot):** Leitura de verificação validou 100% dos campos persistidos (`id`, `firstName`, `need`, `budget`, `status`).
  - **Fase C (Restauração de Estado Base):** Rollback / exclusão limpa concluída com sucesso; consulta subsequente confirmou estado base intocado.
  - **Status:** **APROVADO (GREEN)**

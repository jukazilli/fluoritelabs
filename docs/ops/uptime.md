# Especificação de Uptime e Política de Alertas — Fluorite Labs

## 1. Visão Geral (FND-011)

A estratégia de monitoramento de disponibilidade e alertas da Fluorite Labs visa detectar incidentes críticos em produção sem introduzir ruído desnecessário ou falsos positivos.

## 2. Endpoint de Sondagem Canônica

- **Rota:** `/api/health`
- **Método:** `GET`
- **Frequência de Checagem:** 60 segundos
- **Comportamento de Cache:** `Cache-Control: no-cache, no-store, must-revalidate`
- **Indexação:** `X-Robots-Tag: noindex, nofollow`

### Contrato de Resposta

```json
{
  "status": "healthy",
  "timestamp": "2026-09-25T18:14:22.000Z",
  "durationMs": 14,
  "services": {
    "app": "ok",
    "database": "connected",
    "dbLatencyMs": 12
  },
  "version": "1.0.0"
}
```

- **HTTP 200 (healthy):** Aplicação edge e banco Neon PostgreSQL respondendo com sucesso.
- **HTTP 503 (degraded):** Falha ou indisponibilidade na sondagem do banco Neon.

## 3. Política de Alertas e Redução de Ruído (AC-04)

- **Critério de Disparo:** Pelo menos **2 falhas consecutivas** de sondagem em um intervalo de 120s antes de emitir alerta.
- **Canais de Notificação:** E-mail de emergência operacional.
- **Auto-recuperação:** Notificação de normalização emitida após 2 sondagens consecutivas com sucesso.

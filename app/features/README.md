# Modular Architecture Boundaries

This directory organizes application features by domain as specified in `docs/06_Arquitetura_e_Engenharia.md` and `docs/08_Visao_do_Tech_Lead_e_Stack.md`.

## Direction
```
UI (Routes & Components)
   ↓
Application / Use Cases (Business rules & schemas)
   ↓
Data / Integrations (Database repositories & external adapters)
```

## Core Modules
- `auth`: Clerk identity bridge, role resolution, server-side authorization guards.
- `leads`: Microbriefing validation, lead repository, WhatsApp handoff.
- `journal`: BlockNote block document handling, article schemas, publishing lifecycle.
- `analytics`: Event tracking contracts, GA4 dispatch abstraction.
- `work`: Curated conceptual case studies data layer.

## Architectural Rules
1. UI components and routes must never query the database directly.
2. External services (Clerk, Neon, Cloudflare R2, WhatsApp) must be encapsulated in adapter modules.
3. All incoming payloads must be strictly validated with Zod before mutation.

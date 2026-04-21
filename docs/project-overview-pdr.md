# Project Overview & Product Development Requirements

## Project Overview

**career-ops** is an AI-powered job search automation built on Claude Code. It was designed to solve the problem of evaluating hundreds of job offers, generating tailored CVs, and tracking a complex job search pipeline efficiently.

## Origin

Built and used by [santifer](https://santifer.io) to evaluate **740+ job offers**, generate **100+ tailored CVs**, and land a Head of Applied AI role. The archetypes, scoring logic, negotiation scripts, and proof point structure reflect a specific career search in AI/automation roles.

**It works out of the box, but it's designed to be made yours.** The user (or AI agent) can edit archetypes, translate modes, adjust scoring, and customize everything.

Portfolio: [cv-santiago](https://github.com/santifer/cv-santiago)

## Value Proposition

- **Zero-token scanning**: Hits Greenhouse/Ashby/Lever APIs directly for job listings
- **Structured evaluation**: A-G block evaluation with weighted scoring
- **Personalization at scale**: Tailored CVs per application without manual repetition
- **Pipeline integrity**: TSV-based tracker additions with merge scripts prevent data loss
- **Multi-language**: English, German, French, Japanese, Spanish modes with market-specific vocabulary

## System Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Claude Code Agent                     │
│              (reads CLAUDE.md + modes/*.md)            │
└────────────────────────┬────────────────────────────────┘
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                     │
┌───▼───┐         ┌────▼────┐         ┌───▼────┐
│ Scan  │         │ Evaluate │         │ Batch  │
│ Modes │         │  (A-G)   │         │Process │
└───────┘         └──────────┘         └────────┘
```

## Key Metrics

| Metric | Value |
|--------|-------|
| Job offers evaluated | 740+ |
| Tailored CVs generated | 100+ |
| Portal APIs supported | 3 (Greenhouse, Ashby, Lever) |
| Language modes | 7 (EN, DE, FR, JA, ES, PT, RU) |
| Canonical states | 8 |
| Test checks (CI) | 63+ |

## Data Contract (CRITICAL)

Two layers enforce separation between user data and system code.

### User Layer (never auto-updated)

- `cv.md`, `config/profile.yml`, `modes/_profile.md`, `article-digest.md`, `portals.yml`
- `data/*`, `reports/*`, `output/*`, `interview-prep/*`

### System Layer (safe to auto-update)

- `modes/_shared.md`, all mode files
- `CLAUDE.md`, `AGENTS.md`, `*.mjs` scripts
- `dashboard/*`, `templates/*`, `batch/*`

**Rule**: When customizing, write to `modes/_profile.md` or `config/profile.yml`. Never edit `modes/_shared.md` for user-specific content.

## Product Requirements

### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1 | Extract job description from URL or raw text | Required |
| FR-2 | Classify role archetype (1 of N types) | Required |
| FR-3 | Evaluate across 7 blocks (A-G): Role Summary, CV Match, Level, Comp, Personalization, Interview, Posting Legitimacy | Required |
| FR-4 | Calculate weighted score (1-5 scale) across 10 dimensions | Required |
| FR-5 | Generate ATS-optimized PDF from template | Required |
| FR-6 | Track applications in markdown table | Required |
| FR-7 | Batch process multiple offers in parallel | Required |
| FR-8 | Scan portals for new listings (zero LLM tokens) | Required |
| FR-9 | Check job posting liveness | Required |
| FR-10 | Analyze rejection patterns | Optional |
| FR-11 | Calculate follow-up cadence | Optional |
| FR-12 | Draft LinkedIn outreach | Optional |
| FR-13 | Deep company research | Optional |
| FR-14 | Evaluate course/cert against goals | Optional |
| FR-15 | Evaluate portfolio project idea | Optional |

### Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-1 | PDF generation latency | < 10s per CV |
| NFR-2 | Portal scan (no LLM tokens) | < 30s per portal |
| NFR-3 | Batch worker prompt size | < 200K tokens |
| NFR-4 | Tracker merge integrity | Zero data loss |
| NFR-5 | Setup time (new user) | < 5 minutes |

## Acceptance Criteria

1. Fresh clone + `npm install` + `npx playwright install chromium` produces a working system
2. `node doctor.mjs` exits 0 with all prerequisites met
3. Single offer evaluation completes: URL → Report + PDF + Tracker entry
4. Batch processing produces correct TSV output merged into applications.md
5. `npm run verify` passes all pipeline integrity checks
6. Language modes produce culturally appropriate output for each market
7. User-layer files are never modified by update process

## Canonical States

Source: `templates/states.yml`

| State | Description |
|-------|-------------|
| `Evaluated` | Report completed, pending decision |
| `Applied` | Application submitted |
| `Responded` | Company responded |
| `Interview` | In interview process |
| `Offer` | Offer received |
| `Rejected` | Rejected by company |
| `Discarded` | Discarded by candidate or offer closed |
| `SKIP` | Doesn't fit, don't apply |

## Ethical Constraints

- **Never submit without user review**: Fill forms, draft answers, generate PDFs — but STOP before clicking Submit/Send/Apply
- **Discourage low-fit applications**: Score < 4.0/5 → recommend against applying unless user overrides
- **Quality over quantity**: 5 well-targeted applications beat 50 generic ones

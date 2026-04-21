# Code Standards

## File Naming Conventions

### Scripts (Node.js)

| Pattern | Example | Purpose |
|---------|---------|---------|
| `*.mjs` | `generate-pdf.mjs` | Node.js ES modules in root |
| `batch-*.sh` | `batch-runner.sh` | Shell scripts in batch/ |

### Data Files

| Pattern | Example | Purpose |
|---------|---------|---------|
| `data/applications.md` | — | Application tracker |
| `data/pipeline.md` | — | URL inbox |
| `data/scan-history.tsv` | — | Scanner dedup |
| `batch/tracker-additions/{num}-{slug}.tsv` | `001-acme-2024-01-15.tsv` | Tracker additions |
| `reports/{###}-{slug}-{YYYY-MM-DD}.md` | `042-acme-2024-01-15.md` | Evaluation reports |
| `output/cv-{candidate}-{company}-{date}.pdf` | `output/cv-santifer-acme-2024-01-15.pdf` | Generated PDFs |

### Report Numbering

- Format: 3-digit zero-padded (`001`, `042`, `099`, `100`)
- Max existing + 1 (no reuse of numbers)
- Enforced by `verify-pipeline.mjs`

### Modes

| Pattern | Example |
|---------|---------|
| `modes/{lang}/` | `modes/de/`, `modes/fr/` |
| `modes/{mode}.md` | `modes/offer.md`, `modes/scan.md` |
| `modes/_{type}.md` | `modes/_shared.md`, `modes/_profile.md` |

## Code Conventions

### Node.js Scripts (mjs)

- ES modules (`import`/`export`)
- Shebang: `#!/usr/bin/env node` for executable scripts
- Exit codes: `0` success, `1` failure (except where documented otherwise)
- JSON output to stdout for machine consumption
- Error messages to stderr

### YAML Configuration

- 2-space indentation
- Comments start with `#`
- Arrays use `- ` prefix
- Multiline strings use `|` or `>` operators

### Markdown Data

- Pipe-delimited tables
- ISO 8601 dates (YYYY-MM-DD)
- Backtick code spans for technical values
- No markdown bold in status fields

## Data Contract Enforcement

### User Layer (NEVER modified by system)

**Files:**
- `cv.md`
- `config/profile.yml`
- `modes/_profile.md`
- `article-digest.md`
- `portals.yml`
- `data/*`
- `reports/*`
- `output/*`
- `interview-prep/*`

**Rule:** Update process must never read, modify, or delete these files.

### System Layer (safe to auto-update)

**Files:**
- `modes/_shared.md`
- All `modes/*.md` except `_profile.md`
- `CLAUDE.md`, `AGENTS.md`
- All `*.mjs` scripts
- `batch/*`
- `dashboard/*`
- `templates/*`
- `fonts/*`
- `.claude/skills/*`
- `docs/*`
- `VERSION`
- `DATA_CONTRACT.md`

## Tracker TSV Format

Write one TSV file per evaluation to `batch/tracker-additions/{num}-{company-slug}.tsv`.

**Columns (in order):**
```
{num}\t{date}\t{company}\t{role}\t{status}\t{score}/5\t{pdf}\t{report_link}\t{note}
```

| Column | Format | Example |
|--------|--------|---------|
| num | integer | `42` |
| date | YYYY-MM-DD | `2024-01-15` |
| company | short name | `Acme Corp` |
| role | job title | `Senior Backend Engineer` |
| status | canonical | `Evaluated` |
| score | `X.X/5` | `4.2/5` |
| pdf | `✅` or `❌` | `✅` |
| report_link | markdown link | `[42](reports/042-acme-2024-01-15.md)` |
| notes | one line | `Strong fit, 20% above target` |

**Note:** In `applications.md`, score comes BEFORE status. The merge script handles column swap automatically.

## Canonical States

Source: `templates/states.yml`

| State | Aliases | When to use |
|-------|---------|-------------|
| `Evaluated` | evaluada | Report completed, pending decision |
| `Applied` | aplicado, enviada, aplicada, sent | Application submitted |
| `Responded` | respondido | Company responded |
| `Interview` | entrevista | In interview process |
| `Offer` | oferta | Offer received |
| `Rejected` | rechazado, rechazada | Rejected by company |
| `Discarded` | descartado, descartada, cerrada, cancelada | Discarded by candidate or closed |
| `SKIP` | no_aplicar, no aplicar, skip, monitor | Doesn't fit, don't apply |

**Rules:**
- No markdown bold (`**`) in status field
- No dates in status field (use date column)
- No extra text (use notes column)

## Report Format

**Naming:** `{###}-{company-slug}-{YYYY-MM-DD}.md`

**Header (required fields):**
```markdown
**URL:** https://example.com/job/123
**Legitimacy:** {tier}
**Score:** X.X/5
**PDF:** [link](output/...) or N/A
```

**Blocks:**
- A: Role Summary
- B: CV Match (gaps + mitigation)
- C: Level & Strategy
- D: Comp & Demand
- E: Personalization Plan
- F: Interview Prep
- G: Posting Legitimacy (auto-added)

## Pipeline Integrity Rules

1. **NEVER add entries directly to applications.md** — use TSV flow
2. **YES edit status/notes of existing entries** in applications.md
3. **Run merge after batch:** `node merge-tracker.mjs`
4. **Run verify after merge:** `node verify-pipeline.mjs`
5. **Normalize before dedup:** `node normalize-statuses.mjs && node dedup-tracker.mjs`

## CV Template Design

Location: `templates/cv-template.html`

**Design Tokens:**
- Headings: Space Grotesk (self-hosted in `fonts/`)
- Body: DM Sans (self-hosted)
- Primary color: `hsl(187,74%,32%)` (cyan)
- Accent: `hsl(270,70%,45%)` (purple)
- Layout: Single-column, ATS-optimized

**ATS Compatibility:**
- Standard fonts (no custom rendering)
- High contrast text
- No heavy graphics
- Structured headings (H1, H2, H3)
- Standard bullet points

## Ethical Standards

- **Never submit without user review**
- **Discourage low-fit applications** (score < 4.0/5)
- **Quality over quantity**
- **Respect recruiter time**

## Git Conventions

- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- No AI references in commit messages
- Branch: `main` (protected, requires PR)
- No force push to main
- No `.env` or credentials in commits

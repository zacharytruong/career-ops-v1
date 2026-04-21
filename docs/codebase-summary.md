# Codebase Summary

## Repository Structure

```
career-ops/
├── batch/               # Batch processing (parallel workers)
├── config/              # User configuration
├── dashboard/           # Go TUI pipeline viewer
├── data/                # User data (tracker, pipeline, scan history)
├── docs/                # Documentation
├── examples/            # Example files for reference
├── fonts/               # Self-hosted fonts for CV template
├── interview-prep/      # STAR stories and company-specific intel
├── jds/                 # Saved job descriptions
├── modes/               # AI agent mode files (EN, DE, FR, JA, ES, PT, RU)
├── output/              # Generated PDFs (gitignored)
├── reports/             # Evaluation reports
├── templates/            # Base templates
└── *.mjs               # Utility scripts
```

## Scripts (Root)

| Script | Purpose | Key Dependencies |
|--------|---------|-------------------|
| `scan.mjs` | Zero-token portal scanner (Greenhouse/Ashby/Lever APIs) | `portals.yml` |
| `check-liveness.mjs` | Job posting liveness checker | Playwright |
| `liveness-core.mjs` | Shared liveness logic | None |
| `generate-pdf.mjs` | HTML to ATS-optimized PDF | Playwright, fonts/ |
| `analyze-patterns.mjs` | Rejection pattern analysis (JSON) | `data/applications.md` |
| `followup-cadence.mjs` | Follow-up timing calculator (JSON) | `data/follow-ups.md` |
| `merge-tracker.mjs` | Merge TSV additions into applications.md | `batch/tracker-additions/` |
| `verify-pipeline.mjs` | Pipeline integrity health check | `data/applications.md` |
| `normalize-statuses.mjs` | Map status aliases to canonical | `templates/states.yml` |
| `dedup-tracker.mjs` | Remove duplicate entries | Fuzzy matching |
| `cv-sync-check.mjs` | Setup consistency validator | `cv.md`, `config/profile.yml` |
| `doctor.mjs` | Prerequisites checker | Node.js, Playwright |
| `test-all.mjs` | CI/CD test suite (63+ checks) | All components |
| `update-system.mjs` | Safe auto-updater (user-layer preserved) | Git |

## Modes Directory

### English Modes (default)

| Mode File | Purpose |
|-----------|---------|
| `auto-pipeline.md` | Full pipeline: evaluate + report + PDF + tracker |
| `pipeline.md` | Process pending URLs from inbox |
| `scan.md` | Portal scanning instructions |
| `offer.md` | Single offer evaluation (A-G blocks) |
| `offers.md` | Compare and rank multiple offers |
| `pdf.md` | Generate ATS-optimized CV |
| `apply.md` | Live application assistant |
| `contact.md` | LinkedIn outreach (find contacts + draft) |
| `deep.md` | Deep company research |
| `interview-prep.md` | Interview preparation at specific company |
| `training.md` | Evaluate course/cert against goals |
| `project.md` | Evaluate portfolio project idea |
| `tracker.md` | Application status overview |
| `batch.md` | Batch processing instructions |
| `patterns.md` | Analyze rejection patterns |
| `followup.md` | Follow-up cadence tracker |
| `_shared.md` | System-wide config (scoring, archetypes, tools) |
| `_profile.md` | User customizations (archetypes, narrative) |

### Language Modes

| Directory | Language | Market Focus |
|-----------|----------|--------------|
| `de/` | German | DACH (13. Monatsgehalt, Probezeit, Tarifvertrag) |
| `fr/` | French | France/Belgium/Switzerland (CDI, mutuelle, RTT) |
| `ja/` | Japanese | Japan (正社員, 業務委託, 賞与) |
| `es/` | Spanish | Spain/LatAm (BSPCE, Seguridad Social) |
| `pt/` | Portuguese | Brazil/Portugal |
| `ru/` | Russian | Russia/CIS |

## Data Files

### User Data (gitignored except structure)

| File | Purpose |
|------|---------|
| `data/applications.md` | Application tracker (markdown table) |
| `data/pipeline.md` | Pending URLs inbox |
| `data/scan-history.tsv` | Scanner dedup history |
| `data/follow-ups.md` | Follow-up history |
| `reports/*.md` | Evaluation reports (`{###}-{slug}-{YYYY-MM-DD}.md`) |
| `output/*.pdf` | Generated PDFs (`cv-{candidate}-{company}-{date}.pdf`) |
| `jds/*.md` | Saved job descriptions |

### Configuration Files

| File | Purpose |
|------|---------|
| `config/profile.yml` | User identity (name, email, target roles, comp) |
| `portals.yml` | Portal queries and tracked companies |
| `templates/states.yml` | Canonical states (source of truth) |
| `templates/portals.example.yml` | Example portal config |
| `templates/cv-template.html` | ATS-optimized HTML CV template |
| `templates/README.md` | Template documentation |

## Batch Processing

```
batch/
├── batch-prompt.md      # Worker prompt (evaluation + PDF + TSV)
├── batch-runner.sh     # Orchestrator (parallel claude -p workers)
├── tracker-additions/   # TSV output per offer (merged into applications.md)
└── logs/               # Batch execution logs
```

## Dashboard (Go TUI)

```
dashboard/
├── main.go             # Entry point
├── go.mod              # Dependencies
└── internal/
    ├── data/career.go  # Data access
    ├── model/career.go  # Domain models
    ├── theme/           # Catppuccin theme
    └── ui/screens/
        ├── pipeline.go  # Main pipeline view
        ├── viewer.go    # Report viewer
        └── progress.go  # Batch progress
```

## OpenCode Commands

Located in `.opencode/commands/`:

| Command | Description |
|---------|-------------|
| `/career-ops` | Show menu or evaluate JD |
| `/career-ops-pipeline` | Process pending URLs |
| `/career-ops-evaluate` | Evaluate job offer (A-F) |
| `/career-ops-compare` | Compare offers |
| `/career-ops-contact` | LinkedIn outreach |
| `/career-ops-deep` | Deep company research |
| `/career-ops-pdf` | Generate ATS PDF |
| `/career-ops-training` | Evaluate course/cert |
| `/career-ops-project` | Evaluate portfolio project |
| `/career-ops-tracker` | Application status |
| `/career-ops-apply` | Application form assistant |
| `/career-ops-scan` | Scan portals |
| `/career-ops-batch` | Batch processing |
| `/career-ops-patterns` | Rejection pattern analysis |
| `/career-ops-followup` | Follow-up tracker |

## Report Format

Reports follow naming: `{###}-{company-slug}-{YYYY-MM-DD}.md`

Header includes:
- **URL:** (required)
- **Legitimacy:** {tier} (Block G)
- **Score:** X.X/5
- **PDF:** link or N/A

Blocks A-F:
- A: Role Summary
- B: CV Match (gaps + mitigation)
- C: Level & Strategy
- D: Comp & Demand (WebSearch)
- E: Personalization Plan
- F: Interview Prep (STAR stories)
- G: Posting Legitimacy (auto-added)

## npm Scripts

```bash
npm run doctor      # Validate prerequisites
npm run verify      # Pipeline health check
npm run normalize   # Fix non-canonical statuses
npm run dedup       # Remove duplicates
npm run merge       # Merge TSV into applications.md
npm run pdf         # Generate PDF
npm run sync-check  # CV/profile consistency
npm run liveness    # Check URL liveness
npm run scan        # Portal scanner
npm run update:check # Check for updates
npm run update      # Apply update
npm run rollback    # Rollback last update
```

## CI/CD

- **test-all.mjs**: 63+ checks run on every PR
- **GitHub Actions**: codeql, dependency-review, labeler, release, sbom, stale, test, welcome
- **Branch protection**: main requires status checks to pass

## Skills

Located in `.claude/skills/career-ops/SKILL.md` — shared between Claude Code and OpenCode platforms.

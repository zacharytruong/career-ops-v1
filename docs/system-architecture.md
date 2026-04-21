# System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Claude Code Agent                        │
│              (reads CLAUDE.md + modes/*.md)                │
└───────────────────────────┬─────────────────────────────────┘
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                   │
   ┌─────▼─────┐     ┌─────▼─────┐     ┌─────▼─────┐
   │   Scan    │     │  Evaluate  │     │   Batch   │
   │  (scan)   │     │   (A-G)    │     │ (parallel)│
   └─────┬─────┘     └─────┬─────┘     └─────┬─────┘
         │                  │                   │
         │           ┌──────▼──────┐    ┌─────▼─────┐
         │           │   Report.md  │    │ N workers  │
         │           │   (A-G eval) │    │(claude -p) │
         │           └──────┬──────┘    └─────┬─────┘
         │                  │                   │
         │           ┌──────▼──────┐           │
         │           │  PDF (HTML   │           │
         │           │  → Playwright│           │
         │           └──────┬──────┘           │
         │                  │                   │
         │           ┌──────▼──────┐           │
         │           │ Tracker TSV  │           │
         │           │ (merge into  │◄──────────┘
         │           │  applica-    │
         │           │  tions.md)   │
         │           └──────┬──────┘
         │                  │
         │           ┌──────▼──────┐
         │           │data/applica- │
         │           │  tions.md   │
         └──────────►└─────────────┘
```

## Core Data Flow

### Single Evaluation (auto-pipeline)

```
1. Input: JD text or URL
         ↓
2. Extract: Playwright fetches JD from URL
         ↓
3. Classify: Detect archetype (1 of N types)
         ↓
4. Evaluate: 7 blocks (A-G)
   - A: Role summary
   - B: CV match (gaps + mitigation)
   - C: Level & strategy
   - D: Comp research (WebSearch)
   - E: CV personalization plan
   - F: Interview prep (STAR stories)
   - G: Posting Legitimacy (auto-assessed tier)
         ↓
5. Score: Weighted average across 10 dimensions (1-5)
         ↓
6. Report: Save as reports/{###}-{slug}-{date}.md
         ↓
7. PDF: Generate ATS-optimized CV
         ↓
8. Track: Write TSV to batch/tracker-additions/
         ↓
9. Merge: node merge-tracker.mjs
```

### Batch Processing

```
batch-input.tsv    →  batch-runner.sh  →  N × claude -p workers
(id, url, source)     (orchestrator)       (self-contained prompt)
                           │
                    batch-state.tsv
                    (tracks progress)
```

Each worker produces:
- Report .md
- PDF
- Tracker TSV line

## Layer Architecture

### Mode Files (modes/)

```
modes/
├── _shared.md          # System-wide: scoring, archetypes, tools
├── _profile.md         # User customization (NEVER auto-updated)
├── auto-pipeline.md    # Full pipeline orchestration
├── pipeline.md         # URL inbox processor
├── scan.md             # Portal scanner instructions
├── offer.md            # Single evaluation (A-G blocks)
├── offers.md           # Multi-offer comparison
├── pdf.md              # PDF generation
├── apply.md            # Application form assistant
├── contact.md          # LinkedIn outreach
├── deep.md             # Company research
├── interview-prep.md   # Interview preparation
├── training.md         # Course/cert evaluation
├── project.md          # Project idea evaluation
├── tracker.md          # Status dashboard
├── batch.md            # Batch processing
├── patterns.md         # Rejection pattern analysis
└── followup.md         # Follow-up cadence
```

### Language Modes

Each language directory contains:
- `_shared.md` — localized scoring and rules
- Mode files translated to that language
- Market-specific vocabulary and conventions

## Data Storage

### User Layer (gitignored)

| Directory | Contents |
|-----------|----------|
| `data/` | applications.md, pipeline.md, scan-history.tsv, follow-ups.md |
| `reports/` | Evaluation reports (markdown) |
| `output/` | Generated PDFs |
| `jds/` | Saved job descriptions |
| `interview-prep/` | STAR stories, company-specific intel |

### Configuration

| File | Purpose |
|------|---------|
| `config/profile.yml` | User identity, targets, compensation |
| `portals.yml` | Portal queries, tracked companies |
| `templates/states.yml` | Canonical states (source of truth) |
| `templates/portals.example.yml` | Example portal config |
| `templates/cv-template.html` | HTML CV template |

## Portal Scanning Architecture

```
scan.mjs
  │
  ├── reads portals.yml
  │     ├── search_queries (WebSearch)
  │     └── tracked_companies (direct API)
  │
  ├── Greenhouse API
  ├── Ashby API
  ├── Lever API
  └── WebSearch (fallback)
  │
  └── writes to data/pipeline.md
        (deduped against scan-history.tsv)
```

**Zero LLM tokens**: All scanning hits ATS APIs directly.

## PDF Generation Architecture

```
generate-pdf.mjs
  │
  ├── reads templates/cv-template.html
  │     └── Space Grotesk + DM Sans (from fonts/)
  │
  ├── applies candidate data from cv.md + profile.yml
  │
  ├── normalizes Unicode (ATS compatibility)
  │     └── em-dashes, smart quotes, zero-width chars
  │
  └── Playwright (Chromium headless)
        │
        └── outputs to output/*.pdf
```

## Dashboard TUI

Go-based terminal UI for viewing pipeline:

```
dashboard/
├── main.go
└── internal/
    ├── data/career.go     # Data access
    ├── model/career.go     # Domain models
    ├── theme/              # Catppuccin theme
    └── ui/screens/
        ├── pipeline.go     # Main view
        ├── viewer.go       # Report viewer
        └── progress.go     # Batch progress
```

Features:
- Filter tabs: All, Evaluated, Applied, Interview, Top >=4, SKIP
- Sort: Score, Date, Company, Status
- Lazy-loaded report previews
- Inline status picker

## Pipeline Integrity System

```
merge-tracker.mjs     → Merges TSV into applications.md
       │
       └── detects duplicates by:
           - Report number
           - Entry number
           - Company + role fuzzy match
       │
verify-pipeline.mjs   → Health check (7 rules)
       │
       ├── canonical statuses (templates/states.yml)
       ├── no duplicate company+role
       ├── all report links exist
       ├── scores match X.XX/5 or N/A or DUP
       ├── proper pipe-delimited format
       ├── no pending TSVs
       └── no markdown bold in scores
       │
normalize-statuses.mjs → Maps aliases to canonical
       │
       └── creates .bak backup
       │
dedup-tracker.mjs     → Removes duplicates
       │
       └── keeps highest score
           promotes advanced status if needed
```

## Update System

```
update-system.mjs check
  │
  └── GitHub API → JSON status

update-system.mjs apply
  │
  ├── creates backup branch (backup-pre-update-{version})
  ├── git fetch origin
  ├── git checkout only system-layer files
  ├── npm install
  └── git commit
  │
  └── User layer NEVER touched:
      - cv.md
      - config/profile.yml
      - modes/_profile.md
      - data/*
      - reports/*
      - output/*
```

## Security Model

- **User data isolation**: System updates never touch user layer
- **No credentials in repo**: `.env` gitignored
- **Private vulnerability reporting**: Email in SECURITY.md
- **Branch protection**: PRs required, status checks enforced

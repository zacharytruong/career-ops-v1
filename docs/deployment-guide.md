# Deployment Guide

## Prerequisites

| Requirement | Version | Purpose |
|-------------|---------|---------|
| Node.js | 18+ | Script execution, PDF generation |
| npm | 9+ | Package management |
| Playwright Chromium | latest | PDF generation, job verification |
| Git | 2.30+ | Version control |
| Go (optional) | 1.21+ | Dashboard TUI only |

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/santifer/career-ops.git
cd career-ops
npm install
npx playwright install chromium
```

### 2. Verify Prerequisites

```bash
node doctor.mjs
```

Expected output: All checks pass (exit code 0)

### 3. Configure Profile

```bash
cp config/profile.example.yml config/profile.yml
```

Edit `config/profile.yml` with your details:
- candidate: name, email, phone, location, LinkedIn, portfolio
- target_roles: roles and archetypes
- narrative: headline, exit story, superpowers
- compensation: target range, minimum, currency
- location: country, timezone, visa status

### 4. Add Your CV

Create `cv.md` in the project root:

```markdown
# {Your Name}

## Summary
{2-3 sentence overview}

## Experience
{...}

## Projects
{...}

## Education
{...}

## Skills
{...}
```

(Optional) Create `article-digest.md` with proof points from your portfolio.

### 5. Configure Portals

```bash
cp templates/portals.example.yml portals.yml
```

Edit `portals.yml`:
- `title_filter.positive`: Keywords matching your target roles
- `title_filter.negative`: Tech stacks to exclude
- `search_queries`: Job board search queries
- `tracked_companies`: Companies to check directly

### 6. Initialize Tracker

If `data/applications.md` doesn't exist, create it:

```markdown
# Applications Tracker

| # | Date | Company | Role | Score | Status | PDF | Report | Notes |
|---|------|---------|------|-------|--------|-----|--------|-------|
```

## Verification Commands

### Check Setup Integrity

```bash
node cv-sync-check.mjs
```

Validates:
- cv.md exists and is not too short
- config/profile.yml exists with required fields
- No hardcoded metrics in modes
- article-digest.md freshness (warns if > 30 days old)

### Check Pipeline Health

```bash
node verify-pipeline.mjs
```

Validates:
- Canonical statuses (templates/states.yml)
- No duplicate company+role pairs
- All report links point to existing files
- Scores match X.XX/5 format
- Proper pipe-delimited format
- No pending TSVs
- No markdown bold in scores

## Daily Workflow Commands

| Action | Command |
|--------|---------|
| Scan portals | `npm run scan` |
| Check liveness | `npm run liveness -- {url}` |
| Verify pipeline | `npm run verify` |
| Merge batch additions | `npm run merge` |
| Normalize statuses | `npm run normalize` |
| Remove duplicates | `npm run dedup` |
| Generate PDF | `npm run pdf -- input.html output.pdf` |

## Update Management

### Check for Updates

```bash
npm run update:check
```

JSON output:
- `{"status": "up-to-date"}` — no action needed
- `{"status": "update-available", "local": "1.0.0", "remote": "1.1.0", "changelog": "..."}` — update available
- `{"status": "offline"}` — could not reach GitHub

### Apply Update

```bash
npm run update
```

Creates backup branch, fetches system-layer files, runs npm install.

**User data is NEVER touched:**
- cv.md
- config/profile.yml
- modes/_profile.md
- data/*, reports/*, output/*

### Rollback

```bash
npm run rollback
```

Restores system-layer files from most recent backup branch.

## Dashboard (Optional)

Build and run the Go TUI dashboard:

```bash
cd dashboard
go build -o career-dashboard .
./career-dashboard --path ..
```

Dashboard features:
- Filter tabs: All, Evaluated, Applied, Interview, Top >=4, SKIP
- Sort: Score, Date, Company, Status
- Lazy-loaded report previews
- Inline status picker

## Troubleshooting

### Playwright Not Found

```bash
npx playwright install chromium
```

### Missing Fonts

Fonts are self-hosted in `fonts/`. Do not delete or modify this directory.

### Pipeline Errors

Run verification and follow recommended fixes:

```bash
npm run verify
```

### Merge Conflicts

If merge-tracker.mjs reports conflicts:

1. Check `batch/tracker-additions/merged/` for processed TSVs
2. Manually review conflicting entries in applications.md
3. Delete conflicting TSV files
4. Run `npm run merge -- --dry-run` to preview
5. Run `npm run merge` to apply

## CI/CD

GitHub Actions run on every PR:
- `test-all.mjs` (63+ checks)
- Auto-labeler (risk-based)
- CodeQL
- Dependency review

Branch protection on `main`: status checks must pass before merge.

## Uninstall

```bash
cd ..
rm -rf career-ops
```

Your user data remains in `career-ops/data/`, `cv.md`, `config/profile.yml`, etc. If you want a clean slate, delete those too.

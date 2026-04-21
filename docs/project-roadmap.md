# Project Roadmap

## Current Status

**Phase 2: Core Pipeline (In Progress)**

The core job search pipeline is operational. Active development focuses on expanding language modes, improving batch processing, and enhancing the dashboard TUI.

## Project History

| Version | Date | Milestone |
|---------|------|-----------|
| 1.0.0 | 2024 | Initial release: Claude Code integration, A-G evaluation, PDF generation |
| 1.1.0 | 2025 | Multi-language modes (DE, FR, JA, ES), batch processing |

## Roadmap Phases

### Phase 1: Foundation (Complete)

- [x] Claude Code skill integration
- [x] Single offer evaluation (A-G blocks)
- [x] ATS-optimized PDF generation
- [x] Application tracker (applications.md)
- [x] Portal scanner (Greenhouse, Ashby, Lever APIs)

### Phase 2: Core Pipeline (Current)

- [x] Auto-pipeline (URL → Report + PDF + Tracker)
- [x] Batch processing (parallel workers)
- [x] Multi-language modes (DE, FR, JA, ES)
- [x] Pipeline integrity scripts (merge, verify, normalize, dedup)
- [x] Liveness checker
- [x] Pattern analysis
- [ ] Follow-up cadence tracker
- [ ] Interview prep mode improvements

### Phase 3: Expansion (In Progress)

- [x] Portuguese (PT) and Russian (RU) modes completion
- [x] Dashboard TUI (Go + Bubble Tea)
- [ ] Improved CV template customization options
- [ ] LinkedIn outreach integration improvements

### Phase 4: Intelligence (Backlog)

- [ ] Rejection pattern analysis improvements
- [ ] Salary negotiation scripts expansion
- [ ] Market trend analysis
- [ ] Interview prep with AI mock questions

## Features in Development

### Active Development

| Feature | Status | Notes |
|---------|--------|-------|
| Portuguese modes (pt/) | Partial | Basic files exist, needs full translation |
| Russian modes (ru/) | Partial | Basic files exist, needs full translation |
| Follow-up cadence | Planned | `followup-cadence.mjs` exists, needs mode integration |
| Batch state tracking | Complete | `batch-state.tsv` tracks progress |

### Backlog

| Feature | Priority | Notes |
|---------|----------|-------|
| Interview prep AI mock questions | Medium | STAR story bank already exists |
| Dashboard mobile view | Low | TUI focused on desktop |
| Email outreach integration | Low | LinkedIn contact mode exists |
| Offer comparison visualization | Medium | `offers.md` exists, could add charts |

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for the full contribution workflow:

1. Open issue first (discussion before code)
2. Link PR to issue
3. CI must pass (test-all.mjs: 63+ checks)
4. Maintainer review required
5. Squash merge to main

## Governance

BDFL model with contributor ladder:

```
Participant → Contributor → Triager → Reviewer → Maintainer
```

See [GOVERNANCE.md](../GOVERNANCE.md) for details.

## Community

- **Discord**: https://discord.gg/8pRpHETxa4
- **Code of Conduct**: Contributor Covenant 2.1
- **Support**: Discord/Discussions (not GitHub Issues)

## Changelog

See [CHANGELOG.md](../CHANGELOG.md) for detailed version history.

## Metrics

| Metric | Value |
|--------|-------|
| Job offers evaluated (santifer) | 740+ |
| Tailored CVs generated | 100+ |
| Roles evaluated against | AI/Automation |
| Outcome | Head of Applied AI |
| Portal APIs | 3 (Greenhouse, Ashby, Lever) |
| Language modes | 5 (EN, DE, FR, JA, ES) |
| CI checks | 63+ |

# Model-aware web search routing in career-ops

**Date:** 2026-04-19
**Severity:** Low
**Component:** modes/ (routing infrastructure)
**Status:** Completed

## What Happened

Implemented centralized model-aware web search routing by creating `modes/_websearch-routing.md` as a single source of truth. The routing logic routes to `mcp__MiniMax__web_search` for MiniMax models (case-insensitive prefix match) and falls back to the Claude built-in `WebSearch` for all other models. Updated 26 mode files across 7 language directories to reference this routing note instead of hardcoding the tool name.

## The Brutal Truth

Scattering `mcp__MiniMax__web_search` across 26 files was a maintainability nightmare waiting to happen. Every time someone added a new mode or touched an existing one, they had to remember to use the MiniMax-specific tool. The routing note approach means the actual tool name lives in exactly one place -- change it once and every mode inherits the correct behavior automatically.

## Technical Details

Routing logic: `if modelName.toLowerCase().startsWith("minimax")` → `mcp__MiniMax__web_search`, else → `WebSearch`.

Files updated: core English modes (`_shared.md`, `scan.md`, `pipeline.md`, `auto-pipeline.md`, `contact.md`, `interview-prep.md`, `offer.md`) plus `de/`, `fr/`, `ja/`, `pt/`, `ru/`, `es/` language dirs. Phase 3 (docs update) was skipped as optional.

## Lessons Learned

Centralized routing beats scattered conditionals. A routing note in the modes dir is the right abstraction -- it lives alongside the modes that depend on it, making it easy to discover and update. The case-insensitive prefix match is deliberate: MiniMax model names are predictable and this approach won't break if the vendor adds new MiniMax variants.

## Next Steps

None -- this task is complete. The routing note is established and all modes reference it.

# Web Search Routing

Model-aware routing for web search operations.

## Routing Logic

**Self-aware model detection** (model name available in system prompt/context):

1. Extract the model name from your current context
2. IF model name starts with `MiniMax` (case-insensitive, e.g., `MiniMax-M2.7-highspeed`):
   → Use `mcp__MiniMax__web_search` tool (MiniMax MCP)
3. ELSE:
   → Use `WebSearch` tool (Claude built-in)

## Fallback Detection

If model name detection is unavailable, use this heuristic:
- MiniMax models: `MiniMax-*` pattern
- Claude models: all other models (opus, sonnet, haiku, claude-*)

## Usage in Mode Files

At the top of each mode file that performs web searches, add:

```markdown
## Web Search Routing

See [modes/_websearch-routing.md](modes/_websearch-routing.md) for model-aware routing.
```

This ensures all mode files route web search to the appropriate tool based on the current model.

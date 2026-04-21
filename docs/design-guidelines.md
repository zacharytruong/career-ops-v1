# Design Guidelines

## CV Template Design

Location: `templates/cv-template.html`

### Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Heading Font | Space Grotesk | Headings (H1, H2, H3) |
| Body Font | DM Sans | Body text, bullets |
| Primary Color | `hsl(187,74%,32%)` | Name, section headers |
| Accent Color | `hsl(270,70%,45%)` | Highlights, links |
| Background | `#ffffff` | Paper white |
| Text | `#1a1a2e` | High contrast dark |

### Font Files

Self-hosted in `fonts/`:
- `space-grotesk-latin.woff2`
- `space-grotesk-latin-ext.woff2`
- `dm-sans-latin.woff2`
- `dm-sans-latin-ext.woff2`

### Layout

- Single-column layout
- ATS-optimized structure
- Standard section headings (H1, H2, H3)
- Clean bullet points (no special characters)
- High contrast text
- No heavy graphics or images

## ATS Optimization

### Do

- Use standard fonts (Space Grotesk, DM Sans are safe)
- Include structured headings (H1, H2, H3)
- Use standard bullet characters (- or *)
- Keep high contrast (dark text on light background)
- Include plain text alongside any special formatting
- Use standard date formats

### Don't

- Use custom bullet characters (emojis, symbols)
- Render text as images
- Use light gray text on white background
- Include heavy graphics or logos
- Use decorative elements that may not render
- Include text in headers/footers that ATS cannot parse

### Testing

Use `examples/ats-normalization-test.md` to verify ATS compatibility of your CV.

## CV Content Structure

### Required Sections

```markdown
# {Name}

## Summary
{2-3 sentence overview of your value proposition}

## Experience
{Company} | {Role} | {Date Range}
- Achievement with metrics
- Achievement with metrics

## Projects
{Project Name} | {Tech Stack}
- Description with proof points

## Education
{Degree} | {Institution} | {Year}

## Skills
{Category}: {skill1}, {skill2}, {skill3}
```

### Proof Points

Always include metrics and outcomes:

| Instead of | Write |
|------------|-------|
| "Improved performance" | "Reduced latency by 40% (2s → 1.2s)" |
| "Led team" | "Managed 5 engineers across 2 time zones" |
| "Worked on AI" | "Deployed LLM fine-tuning pipeline processing 10K docs/day" |

### Personalization Per Application

When generating tailored CV for a specific role:

1. Read the job description
2. Extract key requirements and keywords
3. Reorder experience/projects to prioritize relevant ones
4. Add keyword-aligned phrases from JD
5. Adjust summary to match role's thematic axis

## Report Writing Style

### Block A: Role Summary

- 2-3 sentences max
- Role title, level, company type
- Key draw of the opportunity

### Block B: CV Match

Format:
```
**Gaps:**
- {gap 1}
- {gap 2}

**Mitigation:**
- {how you address gap 1}
- {how you address gap 2}
```

### Block C: Level & Strategy

- Assess level (IC4, IC5, Staff, Principal)
- Identify leveling gaps
- Suggest negotiation angle

### Block D: Comp & Demand

- Base salary range (WebSearch)
- Equity details if available
- Market demand for this role/level
- Negotiation leverage points

### Block E: Personalization Plan

- 3-5 specific changes to CV for this role
- Key proof points to emphasize
- Narrative framing adjustments

### Block F: Interview Plan

STAR+R stories relevant to this role:
- Situation (1-2 sentences)
- Task (1 sentence)
- Action (3-5 bullet points)
- Result (metrics + outcomes)
- Reflection (what you learned)

### Block G: Posting Legitimacy

Auto-assessed tier:
- **Tier 1**: Direct company career page, clear JD
- **Tier 2**: LinkedIn/Indeed, standard JD
- **Tier 3**: Third-party posting, some ambiguity
- **Tier 4**: Vague JD, potential red flags

### Block H: Draft Application Answers (auto-pipeline only)

Generated when score >= 4.5. Contains draft answers to application form questions:
- Why are you interested in this role?
- Why do you want to work at [Company]?
- Tell us about a relevant project or achievement
- What makes you a good fit for this position?
- How did you hear about this role?

Tone: "I'm choosing you" — confident, specific, proof-point driven.

## Writing Style

### Tone

- Professional but direct
- Data-driven (use metrics)
- Honest about gaps
- Confident without arrogance

### Sentence Structure

- Prefer short sentences
- Use active voice
- Lead with impact (metrics, outcomes)
- Avoid filler phrases

### Scoring Rationale

Always justify scores:
- Score 5: Exceptional match, exceeds requirements
- Score 4: Strong match, minor gaps easily addressed
- Score 3: Acceptable match, some gaps
- Score 2: Below target, significant gaps
- Score 1: Poor fit, major gaps

## Markdown Formatting

### Reports

```markdown
**URL:** https://example.com/job/123
**Legitimacy:** Tier 1
**Score:** 4.2/5
**PDF:** [link](output/...) or N/A

## Block A: Role Summary
{content}
```

### Tracker

```markdown
| # | Date | Company | Role | Score | Status | PDF | Report | Notes |
|---|------|---------|------|-------|--------|-----|--------|-------|
| 042 | 2024-01-15 | Acme Corp | Senior Engineer | 4.2/5 | Evaluated | ✅ | [042](reports/...) | Strong fit |
```

### No Markdown in Status Field

Status field must be plain text, no `**bold**`:
- Correct: `Evaluated`
- Incorrect: `**Evaluated**`

Use notes column for additional context.

## Version

See [VERSION](../VERSION) file for current version.

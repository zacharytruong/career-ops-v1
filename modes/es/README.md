# career-ops -- Spanish Modes (`modes/es/`)

This folder contains Spanish translations of career-ops core modes for candidates targeting the Spanish-speaking market (Spain, Latin America).

## When to Use These Modes

Use `modes/es/` if any of these apply:

- You are primarily applying to **Spanish-language job postings** (InfoJobs, Indeed ESP, LinkedIn ES, Tecnoempleo, Computrabajo, OCC, etc.)
- Your **CV is in Spanish** or you switch between ES and EN depending on the offer
- You need responses and cover letters in **natural Spanish tech language**, not machine-translated
- You need to handle **Spanish/LatAm specific contractual terms**: CDI/CDD, Seguridad Social, bonus, stock options (BSPCE), periodo de prueba, preaviso, retribucion flexible, etc.

If most of your offers are in English, use the default `modes/`. English modes work for Spanish-language offers, but don't have deep knowledge of Spanish/LatAm market specifics.

## How to Activate

### Option 1 -- Per Session

Tell Claude at the start of a session:

> "Use the Spanish modes under `modes/es/`."

Claude will then read files from this folder instead of `modes/`.

### Option 2 -- Permanent

Add to `config/profile.yml`:

```yaml
language:
  primary: sp
  modes_dir: modes/sp
```

Remind Claude at your first session ("Look in `profile.yml`, I've set `language.modes_dir`"). Claude will automatically use the Spanish modes.

## What Is Translated

This first iteration covers the four highest-impact modes:

| File | Translated From | Purpose |
|------|----------------|---------|
| `_shared.md` | `modes/_shared.md` (EN) | Shared context, archetypes, global rules, Spanish market specifics |
| `oferta.md` | `modes/oferta.md` (ES) | Complete offer evaluation (Blocks A-F) |
| `aplicar.md` | `modes/apply.md` (EN) | Live assistant for filling application forms |
| `pipeline.md` | `modes/pipeline.md` (ES) | URL inbox / Second Brain for collected offers |

The remaining modes (`scan`, `batch`, `pdf`, `tracker`, `auto-pipeline`, `deep`, `contacto`, `ofertas`, `project`, `training`) are intentionally not included. Their content is mostly tooling, paths, and commands -- they should remain language-independent.

## What Stays in English

Intentionally untranslated because they are standard tech vocabulary:

- `cv.md`, `pipeline`, `tracker`, `report`, `score`, `archetype`, `proof point`
- Tool names (`Playwright`, `WebSearch`, `WebFetch`, `Read`, `Write`, `Edit`, `Bash`)
- Tracker status values (`Evaluated`, `Applied`, `Interview`, `Offer`, `Rejected`)
- Code snippets, file paths, commands

Modes use natural Spanish tech language as spoken in engineering teams across Spain and Latin America: body text in Spanish, technical terms in English where that's the norm. No forced translation of "pipeline" to "tubería" or "deploy" to "despliegue".

## Reference Glossary

To keep tone consistent when you modify or extend the modes:

| English | Spanish (in this codebase) |
|---------|---------------------------|
| Job posting | Oferta de empleo / Puesto |
| Application | Solicitud / Candidatura |
| Cover letter | Carta de presentacion / Carta de motivacion |
| Resume / CV | CV / Curriculum |
| Salary | Salario / Remuneracion |
| Compensation | Compensacion / Paquete retributivo |
| Skills | Habilidades / Competencias |
| Interview | Entrevista |
| Hiring manager | Responsable de contratacion / Hiring manager |
| Recruiter | Reclutador / Recruiter |
| AI | IA (Inteligencia Artificial) |
| Requirements | Requisitos / Requerimientos |
| Career history | Trayectoria profesional / Historial laboral |
| Notice period | Preaviso |
| Probation | Periodo de prueba |
| Vacation | Vacaciones |
| Permanent contract | Contrato indefinido / CDI |
| Fixed-term contract | Contrato temporal / CDD |
| Freelance | Freelance / Autonomo |
| Bonus | Bonus / Gratificacion |
| Stock options | Stock options / BSPCE (Spain) |
| Health insurance | Seguro medico |
| Meal vouchers | Tickets restaurante / Cheques comida |
| Transport benefit | Complemento transporte / Abono transporte |
| Training budget | Presupuesto de formacion |
| Remote work | Trabajo remoto / Teletrabajo |
| Hybrid | Hibrido |
| On-site | Presencial |

## Contributing

To improve a translation or add a mode:

1. Open an Issue with your proposal (see `CONTRIBUTING.md`)
2. Follow the glossary above to keep tone consistent
3. Translate idiomatically -- not word-for-word
4. Keep structural elements (Blocks A-F, tables, code blocks, tool instructions) identical to source
5. Test with a real Spanish-language offer (InfoJobs, LinkedIn ES, Tecnoempleo) before submitting PR

# Modo: oferta -- Evaluacion Completa A-F

Cuando el candidato pega una oferta de empleo (texto o URL), siempre genera los 6 bloques completos:

## Paso 0 -- Deteccion de Arquetipo

Clasifica la oferta en uno de los 6 arquetipos (ver `_shared.md`). Si es hibrido, indica los 2 mas cercanos. Esto determina:
- Que proof points priorizar en Bloque B
- Como reformular el resumen en Bloque E
- Que historias STAR preparar en Bloque F

## Bloque A -- Resumen de la Oferta

Tabla con:
- Arquetipo detectado
- Dominio (platform/agentic/LLMOps/ML/enterprise)
- Funcion (build/consult/manage/deploy)
- Seniority
- Remoto (full/hibrido/presencial)
- Tamanio de equipo (si se indica)
- TL;DR (1 frase)

## Bloque B -- Match con CV

Leer `cv.md`. Crear tabla mapeando cada requerimiento del JD a lineas exactas del curriculum.

**Adaptar segun arquetipo:**
- FDE → Priorizar proof points de entrega rapida y cercana al cliente
- SA → Priorizar diseno de sistemas e integraciones
- PM → Priorizar Product Discovery y metricas
- LLMOps → Priorizar Evals, Observability, Pipelines
- Agentic → Priorizar Multi-agent, HITL, Orchestration
- Transformation → Priorizar Change management, Adoption, Escalabilidad

**Seccion de gaps** (con mitigacion para cada gap):
1. Es hard blocker o nice-to-have?
2. Puede el candidato mostrar experiencia adyacente?
3. Puede un proyecto del portfolio cubrir el gap?
4. Mitigacion especifica (frases para carta, proyecto rapido, etc.)

## Bloque C -- Nivel y Estrategia

1. **Nivel** detectado en JD vs **nivel natural del candidato** en este arquetipo
2. **Plan para vender como senior sin mentir**: frases especificas adaptadas al arquetipo, logros a enfatizar, como posicionar experiencia de fundador como ventaja
3. **Plan si te downlevelean**: aceptar si la compensacion es justa, negociar revision en 6 meses, criterios claros de promocion

## Bloque D -- Compensacion y Demanda

Investigar con WebSearch:
- Salario actual para este puesto (InfoJobs, Glassdoor, LinkedIn Salary, Robert Half, Michael Page)
- Reputacion de compensacion de la empresa
- Tendencias de demanda para este puesto

Tabla con datos y fuentes citadas. Si no hay datos, indicarlo sin inventar.

**Mercado hispanohablante -- Verificaciones obligatorias:**
- **España**: Salario bruto vs neto? Incluir contribucion SS empresa (~30% adicional)? Bonus o pagas extras?
- **Contrato indefinido vs temporal**: Prima de riesgo por temporalidad?
- **Freelance**: Si es autonomo, cotizacion + IVA como coste total. Cual es el equivalent salariado?
- **Equity/Stock Options**: BSPCE en Spain? Valoracion actual? Fiscalidad?
- **Beneficios**: Seguro medico, tickets restaurante, transporte, formacion -- anadir al paquete total
- **Latinoamerica**: Moneda local vs USD? Prestaciones obligatorias incluidas?

## Bloque E -- Plan de Personalizacion

| # | Seccion | Estado actual | Cambio propuesto | Razon |
|---|---------|--------------|-----------------|-------|
| 1 | Resumen | ... | ... | ... |
| ... | ... | ... | ... | ... |

Top 5 cambios en CV + Top 5 cambios en LinkedIn para maximizar match.

## Bloque F -- Plan de Preparacion para Entrevista

Historias STAR+R (STAR + **Reflection**) 6-10 mapeadas a requerimientos del JD:

| # | Requerimiento JD | Historia STAR+R | S | T | A | R | Reflection |
|---|-----------------|---------------|---|---|---|---|------------|

**Reflection** captura aprendizaje o siguiente accion. Esto es la senal de seniority -- junior explica lo que paso, senior extrae la leccion.

**Story Bank:** Si existe `interview-prep/story-bank.md`, verificar si estas historias ya existen. Si no, anadir nuevas. Con el tiempo se construye un banco de 5-10 historias maestra que se adaptan a cualquier pregunta.

**Seleccion y framing de historias segun arquetipo:**
- FDE → Enfatizar velocidad de entrega y cercana al cliente
- SA → Enfatizar decisiones arquitectonicas
- PM → Enfatizar Discovery y tradeoffs
- LLMOps → Enfatizar metricas, Evals, hardening para produccion
- Agentic → Enfatizar orchestration, error handling, HITL
- Transformation → Enfatizar Adoption y cambio organizacional

Tambien:
- 1 caso de estudio recomendado (que proyecto presentar y como)
- Preguntas de red flag y como responder (ej: "Por que vendiste la empresa?" "Tenias reportes directos?")

---

## Despues de la Evaluacion

**Siempre** genera los Bloques A-F primero, luego:

### 1. Guardar informe como .md

Guardar evaluacion completa en `reports/{###}-{company-slug}-{YYYY-MM-DD}.md`:

- `{###}` = siguiente numero secuencial (3 digitos, zero-padded)
- `{company-slug}` = nombre empresa en minusculas, sin espacios (guiones)
- `{YYYY-MM-DD}` = fecha actual

**Formato del informe:**

```markdown
# Evaluacion: {Empresa} -- {Titulo del puesto}

**Fecha:** {YYYY-MM-DD}
**Arquetipo:** {resultado deteccion}
**Puntuacion:** {X/5}
**URL:** {URL del puesto}
**PDF:** {ruta o no generado}

---

## A) Resumen de la Oferta
(contenido completo bloque A)

## B) Match con CV
(contenido completo bloque B)

## C) Nivel y Estrategia
(contenido completo bloque C)

## D) Compensacion y Demanda
(contenido completo bloque D)

## E) Plan de Personalizacion
(contenido completo bloque E)

## F) Plan de Preparacion Entrevista
(contenido completo bloque F)

## G) Borrador de Respuestas para Aplicar
(solo si puntuacion >= 4.5 -- borrador de respuestas para el formulario)

---

## Keywords Extraidos
(15-20 keywords del JD para optimizacion ATS)
```

### 2. Registrar en tracker

**Siempre** registrar en `data/applications.md`:
- Siguiente numero secuencial
- Fecha actual
- Nombre empresa
- Titulo del puesto
- Puntuacion: promedio de match (1-5)
- Estado: `Evaluated`
- PDF: ❌ (o ✅ si auto-pipeline genero PDF)
- Report: enlace relativo al .md del informe (ej: `[001](reports/001-empresa-2026-01-01.md)`)

**Formato del tracker:**

```markdown
| # | Fecha | Empresa | Puesto | Puntuacion | Estado | PDF | Report |
```

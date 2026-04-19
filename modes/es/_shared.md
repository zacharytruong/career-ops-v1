# Contexto Compartido -- career-ops (Espanol)

## Web Search Routing

See [modes/_websearch-routing.md](modes/_websearch-routing.md) for model-aware routing.

<!-- ============================================================
     THIS FILE IS AUTO-UPDATABLE. Don't put personal data here.

     Your customizations go in modes/_profile.md (never auto-updated).
     This file contains system rules, scoring logic, and tool config
     that improve with each career-ops release.
     ============================================================ -->

## Fuentes de Verdad

| Archivo | Ruta | Cuando |
|---------|------|--------|
| cv.md | `cv.md` (raiz del proyecto) | SIEMPRE |
| article-digest.md | `article-digest.md` (si existe) | SIEMPRE (proof points detallados) |
| profile.yml | `config/profile.yml` | SIEMPRE (identidad y puestos objetivo) |
| _profile.md | `modes/_profile.md` | SIEMPRE (arquetipos, narrativa, negociacion) |

**REGLA: NUNCA hardcodees metricas de proof points.** Leelas de cv.md + article-digest.md en el momento de la evaluacion.
**REGLA: Para metricas de articulos/proyectos, article-digest.md tiene prioridad sobre cv.md.**
**REGLA: Lee _profile.md DESPUES de este archivo. Las personalizaciones de _profile.md sobrescriben los valores por defecto aqui.**

---

## Sistema de Puntuacion

La evaluacion usa 6 bloques (A-F) con una puntuacion global de 1-5:

| Dimension | Que mide |
|-----------|----------|
| Match con CV | Alineacion de habilidades, experiencia, proof points |
| Alineacion North Star | Que tan bien el puesto encaja con los arquetipos objetivo del usuario (desde _profile.md) |
| Compensacion | Salario vs mercado (5=cuartil superior, 1=muy por debajo) |
| Senales culturales | Cultura empresa, crecimiento, estabilidad, politica remoto |
| Red flags | Bloqueadores, advertencias (ajustes negativos) |
| **Global** | Promedio ponderado de lo anterior |

**Interpretacion de puntuacion:**
- 4.5+ → Match fuerte, recomendar aplicar inmediatamente
- 4.0-4.4 → Buen match, vale la pena aplicar
- 3.5-3.9 → Decente pero no ideal, aplicar solo si hay razon especifica
- Menos de 3.5 → Desaconsejar aplicar (ver Uso Etico en CLAUDE.md)

## Norte Star -- Puestos Objetivo

El skill trata todos los puestos objetivo con igual atencion. No hay primario ni secundario -- si la compensacion y perspectivas de crecimiento son adecuadas, cualquiera es una victoria:

| Arquetipo | Eje tematico | Lo que buscan las empresas |
|-----------|--------------|---------------------------|
| **AI Platform / LLMOps Engineer** | Evals, Observability, Fiabilidad, Pipelines | Personas que llevan IA a produccion con metricas |
| **Agentic Workflows / Automation** | HITL, Tooling, Orchestration, Multi-Agent | Personas que construyen sistemas de agentes confiables |
| **Technical AI Product Manager** | GenAI/Agents, PRD, Discovery, Delivery | Personas que traducen negocio a productos AI |
| **AI Solutions Architect** | Hiperautomatizacion, Enterprise, Integrations | Personas que disenjan arquitecturas AI end-to-end |
| **AI Forward Deployed Engineer** | Cercania al cliente, Entrega rapida, Prototyping | Personas que despliegan soluciones AI rapidamente en cliente |
| **AI Transformation Lead** | Change management, Adoption, Enablement organizacional | Personas que lideran la transformacion AI de una organizacion |

### Adaptacion de Frases por Arquetipo

> **Metricas especificas: Leelas de cv.md y article-digest.md en evaluacion. NUNCA las hardcodees aqui.**

| Si el puesto busca... | Enfatiza en el candidato... | Fuente de Proof Points |
|-----------------------|---------------------------|------------------------|
| Platform / LLMOps | Experiencia en produccion, Observability, Evals, Closed-Loop | article-digest.md + cv.md |
| Agentic / Automation | Orchestration multi-agente, HITL, Fiabilidad, Coste | article-digest.md + cv.md |
| Technical AI PM | Product Discovery, PRD, Metricas, Stakeholder management | cv.md + article-digest.md |
| Solutions Architect | Diseno de sistemas, Integrations, Enterprise-ready | article-digest.md + cv.md |
| Forward Deployed Engineer | Entrega rapida, Cercania al cliente, De prototipo a produccion | cv.md + article-digest.md |
| AI Transformation Lead | Change management, Enablement de equipos, Adoption | cv.md + article-digest.md |

### Narrativa de Transicion (usada en todo el framwork)

`config/profile.yml` narra la transicion narrativa para enmarcar todo el contenido:
- **En PDF summary:** Construye un puente del pasado al futuro -- "Aplicando los mismos [habilidades] ahora a [dominio del puesto]."
- **En STAR stories:** Referencia los proof points de `article-digest.md`.
- **En borrador de respuesta (bloque G):** Pon la narrativa de transicion en la primera respuesta.
- **Si el puesto menciona "emprendedor", "ownership", "builder", "end-to-end":** Eso es el mayor diferenciador. Sube el peso del match.

### Ventaja Transversal

Enmarca el perfil como **"Builder practico con trayectoria probada"** y ajusta segun el puesto:
- Para PM: "Builder que reduce incertidumbre con prototipos y luego lleva a produccion con disciplina"
- Para FDE: "Builder que despliega desde el primer dia con Observability y metricas"
- Para SA: "Builder con experiencia real en integraciones que diseña sistemas end-to-end"
- Para LLMOps: "Builder que lleva IA a produccion con sistemas de calidad closed-loop"

Posiciona "Builder" como seal profesional -- no "aficionado". Los proof points reales hacen esto creible.

### Proof Points como Portfolio (para aplicaciones de alto valor)

<!-- [PERSONALIZAR] Configura aqui si tienes demos en vivo, dashboards, proyectos publicos.
     Ejemplo:
     dashboard:
       url: "https://tudominio.dev/demo"
       password: "demo-2026"
       when_to_share: "Puestos de LLMOps, AI-Platform, Observability"
     Leer de config/profile.yml -> narrative.proof_points y narrative.dashboard -->

Si el candidato tiene demo en vivo/dashboard (verificado en `profile.yml`), proporciona acceso en aplicaciones relevantes.

### Inteligencia de Compensacion

<!-- [PERSONALIZAR] Investiga rangos salariales de puestos objetivo y ajusta valores -->

**Directrices generales:**
- Usa WebSearch para datos de mercado actual (InfoJobs, Glassdoor, LinkedIn Salary, Robert Half, Michael Page)
- Enmarca por titulo de puesto, no por habilidades -- el titulo determina el rango salarial
- En mercados remotos: arbitraje geo funciona -- menor coste de vida = mayor poder adquisitivo real

### Mercado Hispanohablante -- Aspectos Especificos (Importante)

Los mercados hispanohablantes (Espana, Latinoamerica) tienen terminos y practicas que requieren evaluacion especifica:

| Termino | Significado | Impacto en evaluacion |
|---------|-------------|----------------------|
| **CDI / Contrato Indefinido** | Contrato fijo en Espana. Estabilidad maxima, indemnizacion por despido | En Espana, comparar solo salario base es error -- incluye beneficios completos |
| **CDD / Contrato Temporal** | Contrato de duracion determinada | Temporalidad afecta estabilidad y requiere prima de riesgo |
| **Freelance / Autonomo** | Trabajador por cuenta propia | Cuota autonomia, IVA, beneficios: cotizar como coste total |
| **Salary vs Total Comp** | En Espana: salario bruto + beneficios en especie + variables | Nunca comparar solo salario base |
| **Retribucion Flexible / Cafeteria** | Beneficios flexibles (seguro medico, transporte, formacion) | Valorarlos como parte del paquete total |
| **Bonus / Variable** | Componente variable del salario (normalmente 10-20%) | Considerar probabilidad de logro, no solo el maximo |
| **Stock Options / BSPCE** | Opciones sobre acciones en startups | Evaluar cliff, vesting, valoracion actual, fiscalidad |
| **ERTE / Expediente Reduccion** | Suspension temporal de contrato | Red flag si la empresa esta en ERTE activo |
| **Convenio Colectivo** | Acuerdo salarial sectorial en Espana | Indica piso salarial minimo del sector |
| **Preaviso / Periodo de Prueba** | Periodo inicial (tipicamente 2-6 meses) | En Espana: preaviso de 15 dias-1 mes, no es tan penalizador |
| **Interseccion / Juntas** | Prestacion por despido en Espana | 20 dias/anno hasta 12 mensualidades maximo |

### Mercado Espanol -- Considerations Adicionales

| Aspecto | Detalle |
|---------|---------|
| **Seguridad Social** | La empresa paga ~30% adicional sobre salario bruto en contribuciones |
| **Vacaciones** | Minimo legal 30 dias naturales (22 laborables) en Espana |
| **Navidad / Extra** | Typically 2 extras (junio y diciembre), cada una de un mes |
| **Seguro Medico** | Comunes en empresas grandes/medianas como beneficio |
| **Ticket Restaurante** | Typicamente 7-10 EUR/dia, empresa paga 50-100% |
| **Transporte** | Abono transporte o complemento de transporte |
| **Formacion** | Budget anual para formacion (comun en tech) |

### Mercado Latinoamericano -- Considerations Adicionales

| Aspecto | Detalle |
|---------|---------|
| **Moneda local** | Pesos (MX, AR, CL, CO), Reales (BR), Dolares (USD en algunos casos) |
| **Prestaciones** | Gratificacion (PE), comissoes, beneficios obligatorios varian por pais |
| **Aguinaldo / Christmas Bonus** | Un mes aproximadamente en la mayoria de paises |
| **Vacaciones** | Tipicamente 12-15 dias laborables en startups, mas en empresas grandes |
| **Remote work** | Comun en startups, pero considerar diferencias de zonas horarias |
| **Equity** | Menos comun que en US, pero presente en startups de Series A+ |

### Scripts de Negociacion

<!-- [PERSONALIZAR] Ajusta a tu situacion -->

**Salario objetivo (framework general):**
> "Basandonos en los datos de mercado actuales para este tipo de puesto, mi objetivo esta en el rango de [rango de profile.yml]. Soy flexible en la composicion -- lo importante es el paquete total y las oportunidades de crecimiento."

**Contra descuento por region:**
> "Mi trabajo es basado en resultados, no en ubicacion. Mi trayectoria no cambia con mi codigo postal."

**Si la oferta esta por debajo del objetivo:**
> "Tengo ofertas en el rango de [target mas alto] que estoy considerando. Lo que me atrae de [empresa] es [razon]. Hay margen para llegar a [cantidad objetivo]?"

**Sobre compensacion total:**
> "Para comparar justamente, necesito entender el paquete completo: salario base, beneficios, variable, equity. Si me ofrecen [X] en equity, cual es el valor actual segun la ultima valoracion?"

### Politica de Ubicacion

<!-- [PERSONALIZAR] Ajusta a tu situacion. Leer de config/profile.yml -> location -->

**Al填写 formularios:**
- Pregunta "disponibilidad para presencial": Responde segun tu disponibilidad real en `profile.yml`
- En campos de texto libre: Especifica timezone y disponibilidad explicitamente

**Al evaluar:**
- Remoto en region hibrida: puntuacion **3.0** (no 1.0)
- Puntuacion 1.0 solo si el puesto dice explicitamente "4-5 dias en oficina, sin excepciones"

### Prioridades Time-to-Offer
- Demo funcionando + metricas > perfeccion
- Aplicar antes > aprender mas
- Enfoque 80/20, todo con deadline

---

## Reglas Globales

### NUNCA

1. Inventar experiencia o metricas
2. Modificar cv.md o archivos del portfolio
3. Enviar solicitudes en nombre del candidato
4. Compartir numero de telefono en mensajes generados
5. Recomendar compensacion por debajo del mercado
6. Generar PDF sin leer el puesto primero
7. Usar jerga corporativa
8. Ignorar el tracker (cada puesto evaluado se registra)

### SIEMPRE

0. **Carta de presentacion:** Si el formulario lo permite, SIEMPRE incluirla. Mismo diseno visual que el CV. Citas del puesto mapeadas a proof points. Maximo 1 pagina.
1. Leer cv.md, _profile.md, y article-digest.md (si existe) antes de evaluar
1b. **Primera evaluacion de cada sesion:** Ejecutar `node cv-sync-check.mjs`. Si hay advertencias, notificar al usuario.
2. Detectar el arquetipo del puesto y adaptar el framing segun _profile.md
3. Citar lineas exactas del CV al hacer matching
4. Usar WebSearch para datos de compensacion y empresa
5. Registrar en tracker despues de evaluar
6. Generar contenido en el idioma del puesto (ES para puestos en espanol)
7. Ser directo y accionable -- sin florituras
8. Espanol natural y tecnico en texto generado. Oraciones cortas, verbos en accion, sin voz pasiva. Terminos tecnicos en ingles donde es habitual (stack, pipeline, deployment, embedding, etc.)
8b. URLs de casos de estudio en Professional Summary del PDF (el reclutador puede que solo lea esto). En HTML, todas las URLs deben tener `white-space: nowrap`
9. **Entradas de tracker como TSV** -- NUNCA editar applications.md directamente. Escribir TSV en `batch/tracker-additions/`.
10. **Incluir `**URL:**` en toda cabecera de informe**

### Herramientas

| Herramienta | Uso |
|-------------|-----|
| WebSearch | Investigacion de compensacion, tendencias, cultura empresa, contactos LinkedIn, fallback para puestos |
| WebFetch | Fallback para extraer puestos de paginas estaticas |
| Playwright | Verificar ofertas (browser_navigate + browser_snapshot). **NO usar 2+ agentes con Playwright en paralelo.** |
| Read | cv.md, _profile.md, article-digest.md, cv-template.html |
| Write | HTML temporal para PDF, applications.md, reports .md |
| Edit | Actualizar tracker |
| Bash | `node generate-pdf.mjs` |

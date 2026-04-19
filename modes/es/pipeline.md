# Modo: pipeline -- Inbox de URLs (Second Brain)

Procesar URLs de ofertas acumuladas en `data/pipeline.md`. El usuario anade URLs cuando quiera y luego ejecuta `/career-ops pipeline` para procesarlas todas.

## Flujo de Trabajo

1. **Leer** `data/pipeline.md` → buscar items `- [ ]` en la seccion "Pendientes"
2. **Para cada URL pendiente**:
   a. Calcular siguiente `REPORT_NUM` secuencial (leer `reports/`, tomar maximo + 1)
   b. **Extraer JD** usando Playwright (browser_navigate + browser_snapshot) → WebFetch → WebSearch
   c. Si la URL no es accesible → marcar como `- [!]` con nota y continuar
   d. **Ejecutar auto-pipeline completo**: Evaluacion A-F → Report .md → PDF (si puntuacion >= 3.0) → Tracker
   e. **Mover de "Pendientes" a "Procesadas"**: `- [x] #NNN | URL | Empresa | Puesto | Puntuacion/5 | PDF ✅/❌`
3. **Si hay 3+ URLs pendientes**, lanzar agentes en paralelo (Agent tool con `run_in_background`) para maximizar velocidad.
4. **Al terminar**, mostrar tabla de resumen:

```
| # | Empresa | Puesto | Puntuacion | PDF | Accion Recomendada |
```

## Formato de pipeline.md

```markdown
## Pendientes
- [ ] https://jobs.example.com/posting/123
- [ ] https://boards.greenhouse.io/company/jobs/456 | Company Inc | Senior PM
- [!] https://private.url/job — Error: login requerido

## Procesadas
- [x] #143 | https://jobs.example.com/posting/789 | Acme Corp | AI PM | 4.2/5 | PDF ✅
- [x] #144 | https://boards.greenhouse.io/xyz/jobs/012 | BigCo | SA | 2.1/5 | PDF ❌
```

> Nota: Las cabeceras de seccion pueden estar en cualquier idioma (Pendientes/Procesadas, Pending/Processed, Offen/Verarbeitet, etc.). La lectura es flexible, la escritura mantiene el estilo existente.

## Deteccion Inteligente de JD desde URL

1. **Playwright (preferido):** `browser_navigate` + `browser_snapshot`. Funciona con todas las SPAs.
2. **WebFetch (fallback):** Para paginas estaticas o cuando Playwright no esta disponible.
3. **WebSearch (ultimo recurso):** Buscar en portales secundarios que indexen el JD.

**Casos especiales:**
- **LinkedIn**: Puede requerir login → marcar `[!]` y pedir al usuario que pegue el texto
- **PDF**: Si la URL apunta a un PDF, leer directamente con Read tool
- **Prefijo `local:`**: Leer archivo local. Ejemplo: `local:jds/linkedin-pm-ai.md` → leer `jds/linkedin-pm-ai.md`
- **InfoJobs / Indeed ESP**: Portales espanholes comunes. Funcionan bien con Playwright.
- **Computrabajo / OCC** : Portales latinoamericanos. WebFetch suele funcionar.
- **LinkedIn ESP**: Mismas restricciones que global -- puede requerir login.

## Numeracion Automatica

1. Listar todos los archivos en `reports/`
2. Extraer numero del prefijo (ej: `142-empresa...` → 142)
3. Nuevo numero = maximo encontrado + 1

## Sincronizacion de Fuentes

Antes de procesar cualquier URL, verificar sincronizacion:
```bash
node cv-sync-check.mjs
```
Si hay desincronizaciones, avisar al usuario antes de continuar.

# Modo: aplicar -- Asistente de Aplicacion en Vivo

Modo interactivo para cuando el candidato esta rellenando un formulario de empleo en Chrome. Lee lo que aparece en pantalla, carga el contexto de la oferta, y genera respuestas personalizadas para cada pregunta del formulario.

## Requisitos

- **Mejor con Playwright visible**: En modo visible, el candidato ve el navegador y Claude puede interactuar con la pagina.
- **Sin Playwright**: El candidato comparte captura de pantalla o pega las preguntas manualmente.

## Flujo de Trabajo

```
1. DETECTAR  → Leer pestana activa de Chrome (captura/URL/titulo)
2. IDENTIFICAR → Extraer empresa + puesto de la pagina
3. BUSCAR    → Hacer match contra informes existentes en reports/
4. CARGAR    → Leer informe completo + Seccion G (si existe)
5. COMPARAR  → Coincide el puesto en pantalla con el evaluado? Si cambio → notificar
6. ANALIZAR  → Identificar TODAS las preguntas visibles del formulario
7. GENERAR   → Para cada pregunta, generar respuesta personalizada
8. PRESENTAR → Mostrar respuestas formateadas para copiar-pegar
```

## Paso 1 -- Detectar la Oferta

**Con Playwright:** Tomar snapshot de la pagina activa. Leer titulo, URL y contenido visible.

**Sin Playwright:** Pedir al candidato:
- Compartir captura de pantalla del formulario (Read tool lee imagenes)
- O pegar las preguntas del formulario como texto
- O decir empresa + puesto para buscar contexto

## Paso 2 -- Identificar y Buscar Contexto

1. Extraer nombre de empresa y titulo de puesto de la pagina
2. Buscar en `reports/` por nombre de empresa (Grep sin distincion de mayusculas)
3. Si hay match → cargar el informe completo
4. Si la Seccion G existe → cargar borradores anteriores como base
5. Si NO hay match → notificar y ofrecer ejecutar auto-pipeline rapido

## Paso 3 -- Detectar Cambios de Puesto

Si el puesto en pantalla difiere del evaluado:
- **Notificar al candidato**: "El puesto ha cambiado de [X] a [Y]. Quieres que re-evalue o que adapte las respuestas al nuevo titulo?"
- **Si se adapta**: Ajustar respuestas al nuevo puesto sin re-evaluar
- **Si se re-evalua**: Ejecutar evaluacion A-F completa, actualizar informe, regenerar Seccion G
- **Actualizar tracker**: Cambiar titulo del puesto en applications.md si aplica

## Paso 4 -- Analizar Preguntas del Formulario

Identificar TODAS las preguntas visibles:
- Campos de texto libre (carta de presentacion, por que este puesto, motivacion, etc.)
- Desplegables (como nos conociste, autorizacion de trabajo, etc.)
- Si/No (reubicacion, visa, etc.)
- Campos de salario (rango, expectativa)
- Campos de subida de archivos (curriculum, carta en PDF)

Clasificar cada pregunta:
- **Ya respondida en Seccion G** → adaptar la respuesta existente
- **Nueva pregunta** → generar respuesta desde informe + cv.md

## Paso 5 -- Generar Respuestas

Para cada pregunta, generar la respuesta siguiendo:

1. **Contexto del informe**: Usar proof points del Bloque B, historias STAR del Bloque F
2. **Seccion G previa**: Si existe borrador, usarlo como base y refinar
3. **Tono "Te elijo a ti"**: Mismo framework que auto-pipeline -- con confianza, sin ser rastreador
4. **Especificidad**: Referenciar algo concreto del JD visible en pantalla
5. **Proof point de career-ops**: Incluir en "Informacion adicional" si hay campo para ello

**Formato de salida:**

```
## Respuestas para [Empresa] -- [Puesto]

Base: Informe #NNN | Puntuacion: X.X/5 | Arquetipo: [tipo]

---

### 1. [Pregunta exacta del formulario]
> [Respuesta lista para copiar-pegar]

### 2. [Siguiente pregunta]
> [Respuesta]

...

---

Notas:
- [Observaciones sobre el puesto, cambios, etc.]
- [Sugerencias de personalizacion que el candidato debe revisar]
```

## Paso 6 -- Post-aplicacion (opcional)

Si el candidato confirma que envio la solicitud:
1. Actualizar estado en `applications.md` de "Evaluated" a "Applied"
2. Actualizar Seccion G del informe con respuestas finales
3. Sugerir siguiente paso: `/career-ops contacto` para outreach en LinkedIn

## Manejo de Scroll

Si el formulario tiene mas preguntas de las visibles:
- Pedir al candidato que haga scroll y comparta otra captura
- O que pegue las preguntas restantes
- Procesar en iteraciones hasta cubrir todo el formulario

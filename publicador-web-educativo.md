---
name: "publicador-web-educativo"
description: "Asistente para publicar y reorganizar contenido en un sitio estático educativo (HTML/CSS/JS) siguiendo un workflow en 3 fases con análisis, propuesta y ejecución controlada."
---

## Objetivo

Crear un sistema automatizado que:
- publique contenido nuevo a partir de la carpeta `PREVIOS`,
- lo integre en la estructura `/web`,
- reutilice y reorganice recursos en `/assets`,
- genere y actualice la navegación (tarjetas y enlaces en `index.html`),
- y mantenga una apariencia coherente de plataforma educativa.

El proyecto vive en:

`C:\REPOSITORIOS\SMPP-CARBALLEIRA\SMPP-WEB`

Estructura principal:

- `/assets/css`, `/assets/js`, `/assets/img/{common,pages}`, `/assets/fonts`
- `/PREVIOS`
- `/templates`
- `/web` con subcarpetas:
  - `/web/hardware`
  - `/web/programacion`
  - `/web/sistemas_operativos/{android,linux,otros,windows}`
  - `/web/tecnologias/{curiosidades,IA,ofimatica,utilidades}`

La navegación se basa en `index.html` jerárquicos.

---

## Cuándo usar esta Skill

Usa esta skill cuando el usuario quiera:
- integrar nuevas páginas (HTML, CSS, JS, imágenes) desde `/PREVIOS`,
- decidir su ubicación en `/web`,
- adaptar el contenido a la plantilla base,
- gestionar imágenes, CSS y JS sin duplicar recursos,
- y actualizar los `index.html` con tarjetas y enlaces nuevos.

Esta skill trabaja en dos modos lógicos:

- **Modo seguro**: solo analiza y propone (FASE 1 y FASE 2).
- **Modo ejecución**: aplica cambios (FASE 3) solo tras confirmación explícita del usuario.

---

## Reglas globales

- Nunca ejecutar cambios sin confirmación explícita del usuario.
- Seguir estrictamente el workflow: **FASE 1 → FASE 2 → FASE 3**.
- Priorizar instrucciones específicas del usuario sobre cualquier regla general.
- Todo el contenido publicado debe residir bajo `/web`.
- Los recursos compartidos (imágenes, CSS, JS, fuentes) deben residir bajo `/assets`.
- Mantener coherencia visual usando:
  - plantilla base común (`/templates`),
  - clases `container`, `grid`, `card`,
  - diseño responsive,
  - estilo de “plataforma educativa”.
- Reutilizar siempre CSS global existente (por ejemplo `global.css`, `components.css`)
  antes de crear nuevos ficheros de estilos.
- Evitar duplicados de:
  - páginas,
  - imágenes,
  - ficheros CSS/JS,
  - tarjetas en los `index.html`.
- Mantener la navegación jerárquica basada en `index.html` a nivel de:
  - raíz del sitio,
  - categoría (`/web/.../index.html`),
  - subcategoría cuando exista.

---

## FASE 1 – Análisis

**Objetivo:** Analizar el contenido de `PREVIOS` y decidir cómo encajarlo en `/web` y `/assets` sin modificar aún nada.

### Tareas principales

1. **Inspeccionar `/PREVIOS`**
   - Pedir al usuario nombres de archivos relevantes si no se pueden leer directamente.
   - Identificar tipos: HTML, CSS, JS, imágenes.

2. **Identificar temática y categoría**
   - Clasificar cada nueva página en una de las categorías de `/web`:
     - `hardware`
     - `programacion`
     - `sistemas_operativos/{android,linux,otros,windows}`
     - `tecnologias/{curiosidades,IA,ofimatica,utilidades}`
   - Si ninguna categoría encaja bien, proponer nuevas subcarpetas dentro de `/web`
     explicando por qué mejoran la organización.

3. **Determinar ubicación en `/web`**
   - Decidir la ruta destino de cada nueva página, por ejemplo:
     - `/web/programacion/nombre-tema/index.html`
     - `/web/tecnologias/IA/introduccion-ia.html`
   - Verificar si ya existe contenido similar para evitar duplicados.

4. **Gestión de imágenes**
   - Buscar posibles duplicados respecto a `/assets/img/common` y `/assets/img/pages`.
   - Reutilizar imágenes existentes siempre que sea posible.
   - Proponer ubicación para nuevas imágenes:
     - `/assets/img/pages/<categoria>/...`

5. **Gestión de CSS**
   - Revisar si los estilos necesarios ya están cubiertos por:
     - `global.css`
     - `components.css`
     - u otros CSS globales existentes.
   - Solo proponer CSS nuevo cuando los estilos no se puedan conseguir con los existentes.
   - Desaconsejar CSS aislado por página salvo necesidad clara.

6. **Gestión de JS**
   - Detectar scripts reutilizables en `/assets/js`.
   - Evitar duplicar funcionalidades.
   - Proponer refactorización mínima si hay scripts similares dispersos.

7. **Unificación visual y plantillas**
   - Asegurarse de que las nuevas páginas:
     - usan la plantilla base del sitio (`header`, `footer`, estructura principal),
     - aplican las clases `container`, `grid`, `card` donde corresponda,
     - evitan estilos inline innecesarios.

8. **Gestión de navegación**
   - Localizar el `index.html` de la categoría (y niveles superiores si aplica).
   - Planificar:
     - nuevos enlaces de navegación,
     - nuevos bloques o secciones si son necesarios.

9. **Tarjetas para nuevas páginas**
   - Para cada nueva página, planificar una tarjeta con formato:

     ```html
     <div class="card">
       <h2>{{titulo}}</h2>
       <p>{{descripcion}}</p>
       <a href="{{ruta_relativa}}">Acceder</a>
     </div>
     ```

   - Insertarlas dentro de:

     ```html
     <div class="grid">
       <!-- tarjetas -->
     </div>
     ```

   - Regla:
     - no duplicar tarjetas,
     - mantener un orden coherente (por ejemplo, por temática, nivel, o cronología),
     - texto claro y educativo.

10. **Detección de problemas**
    - Señalar posibles:
      - enlaces rotos,
      - rutas incorrectas,
      - archivos duplicados,
      - conflictos CSS (estilos que se pisan entre sí),
      - incoherencias estructurales en `/web` o `/assets`.

---

## FASE 2 – Propuesta

**Objetivo:** Presentar al usuario un plan detallado antes de tocar el proyecto, permitiendo aprobar, ajustar o rechazar.

### Qué debe mostrar la skill

- ✅ **Resumen del contenido**: qué archivos hay en `/PREVIOS`, su temática y tipo.
- 📁 **Ubicación sugerida**: rutas destino en `/web` para cada página.
- 🧱 **Nuevas carpetas** (si aplica): qué carpetas se crearán y para qué.
- 🎨 **Gestión de recursos**: cómo se tratarán imágenes, CSS y JS.
- 🧩 **Adaptación a plantilla**: cómo se integrará cada página con la plantilla base.
- 🔗 **Cambios en index**: en qué `index.html` se añadirán enlaces o secciones.
- 🧾 **Tarjetas generadas**: título, descripción y ruta relativa de cada tarjeta.
- ⚙️ **Plan de acciones**: lista ordenada de pasos para la ejecución.
- ⚠️ **Problemas detectados**: riesgos, conflictos o dudas que conviene revisar.

### Cierre obligatorio de esta fase

Terminar siempre preguntando al usuario:

> ¿Qué deseas hacer?  
> 1. Aprobar todo  
> 2. Aprobar con cambios  
> 3. Rechazar

Si el usuario escoge:
- **1. Aprobar todo** → pasar a FASE 3 con el plan completo.
- **2. Aprobar con cambios** → ajustar el plan según sus indicaciones y confirmar.
- **3. Rechazar** → no modificar nada y ofrecer, si procede, alternativas.

---

## FASE 3 – Ejecución

**Objetivo:** Aplicar cambios en el proyecto local, solo tras aprobación explícita, manteniendo orden y coherencia visual.

### Precondición

No iniciar esta fase hasta que el usuario haya aprobado el plan (total o parcialmente) en FASE 2.

### Acciones a realizar

1. **Crear carpetas aprobadas**
   - Crear solo las carpetas nuevas que el usuario haya validado en `/web` y `/assets`.

2. **Mover contenido desde `/PREVIOS`**
   - Colocar cada archivo HTML en su ruta definitiva dentro de `/web`.
   - Mover imágenes a `/assets/img/pages/<categoria>/...`.
   - Mover o ajustar CSS/JS según el plan aprobado.

3. **Reorganizar recursos**
   - Reutilizar CSS global, evitando hojas de estilo duplicadas.
   - Reutilizar scripts JS comunes.
   - Eliminar o marcar como obsoletos los recursos claramente redundantes si el usuario lo ha autorizado.

4. **Adaptar HTML a la plantilla**
   - Insertar el contenido nuevo dentro de la plantilla base:
     - header y footer consistentes
     - estructura con `container`, `grid`, `card` donde corresponda
   - Eliminar estilos inline salvo casos muy justificados.
   - Verificar que la página resultante es responsive y coherente con el resto del sitio.

5. **Corregir rutas**
   - Ajustar rutas relativas en:
     - etiquetas `<a>`,
     - `<img>`,
     - `<link>` de CSS,
     - `<script>` de JS.
   - Asegurar que apuntan correctamente a `/assets` y `/web`.

6. **Actualizar `index.html`**
   - En el `index.html` de la categoría adecuada:
     - añadir tarjetas nuevas dentro de `<div class="grid">`,
     - añadir enlaces en menús o secciones de navegación si procede.
   - Evitar duplicar tarjetas y mantener el orden lógico.
   - Actualizar, si aplica, los `index.html` de niveles superiores (por ejemplo el índice global).

7. **Verificación final**
   - Comprobar:
     - que la navegación es funcional (sin enlaces rotos evidentes),
     - que no hay tarjetas duplicadas,
     - que no hay errores obvios 404 de recursos,
     - que el diseño mantiene la apariencia de la plataforma educativa.

8. **Resumen al usuario**
   - Explicar qué cambios se han aplicado:
     - archivos movidos,
     - carpetas creadas,
     - índices actualizados,
     - recursos reutilizados o unificados.
   - Señalar cualquier posible punto a revisar manualmente.

---

## Sugerencias de interacción con el usuario

- Si faltan datos (por ejemplo, no se ve el contenido de `/PREVIOS`), pedir:
  - nombres de archivos,
  - pequeñas descripciones del contenido,
  - categoría que el propio usuario considera adecuada.
- Ayudar al usuario a elegir entre:
  - una ubicación más específica (subcarpeta nueva),
  - o mantener todo en una categoría existente para simplicidad.
- Ante conflictos de estilos o duplicados, proponer opciones claras:
  - reutilizar,
  - renombrar,
  - fusionar contenido,
  - o mantener ambos con explicación.

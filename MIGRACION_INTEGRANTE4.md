# Migración del integrante 4

La sección está integrada en `index.html`, después de Salud y antes de las referencias generales. Se accede mediante el menú principal y una cuarta tarjeta en el índice.

## Contenido

- Investigación de Sofía sobre riesgos físicos y emocionales, con correcciones de redacción y citas enlazadas a las referencias.
- Cuatro datos desplegables sobre calor extremo, salud emocional, niñez sin acompañamiento y derechos humanos.
- Controles para abrir o cerrar todos los datos y un contador que anuncia su estado.
- Tres referencias del documento de Sofía, incorporadas a la bibliografía general en orden alfabético.

El texto sobre el calor conserva el ámbito y la fecha de la fuente: la frontera entre México y Estados Unidos en 2024. Se eliminó el calificativo «crónica» de la deshidratación para ajustarlo a la advertencia del Instituto Guatemalteco de Migración. La sección distingue los riesgos de las consecuencias inevitables: las experiencias varían entre personas.

La OMS tiene dos obras de 2026 en la bibliografía conjunta. Se distinguen como 2026a para el perfil de Guatemala que ya estaba en la revista y 2026b para la ficha de salud de refugiados y migrantes. Se ajustó la cita del perfil de Guatemala y su etiqueta en `script.js` para mantener esa correspondencia.

El documento sobre ingresos y alimentación no forma parte de esta integración de Migración. Tampoco se añadieron estadísticas, testimonios, fotografías ni actividades de reflexión asignadas a otros integrantes.

## Diseño e interacción

`migracion.css` reutiliza las variables de color de `style.css`, DM Sans y Playfair Display. Los estilos nuevos se limitan al capítulo, a sus referencias y a la cuadrícula del índice. Los capítulos existentes conservan sus archivos de estilo.

`migracion.js` se carga con `defer` y actúa únicamente dentro de `#migracion`. Los desplegables nativos `details` y `summary` permiten acceder al contenido sin JavaScript. El botón general y el contador aparecen cuando el script se ha inicializado. No se cargan dependencias adicionales.

## Comprobación

Se comprobaron la sintaxis de JavaScript, la lógica de apertura y cierre, el contador, la apertura parcial, la inicialización repetida, los identificadores, los enlaces internos nuevos y la existencia de los recursos locales. Se revisó el contenido de las tres referencias frente a las fuentes oficiales.

Chromium no pudo ejecutarse porque el entorno bloquea la creación de sockets. Quedan pendientes las pruebas visuales y de teclado en un navegador real y la comprobación final en GitHub Pages.

Para la revisión visual, abrir `index.html`, entrar a Migración desde el menú y desde el índice, abrir cada dato con ratón y con Tab/Enter/Espacio, probar «Mostrar todos» y «Ocultar todos» y comprobar el diseño en móvil. Desactivar JavaScript debe conservar el texto y los cuatro desplegables.

## Rama y publicación

La rama local se llama exactamente `Integrante4Migra`. El ZIP original no contenía `.git`; se creó un repositorio local con una confirmación base y otra para esta integración. Por ello, este historial local no comparte los identificadores del repositorio de GitHub.

Para subir una rama que conserve el historial original, utiliza el parche incluido en la entrega desde una copia ya clonada del repositorio original. Crea allí `Integrante4Migra`, aplica el parche, revisa los cambios y crea el commit con tu identidad. No copies la carpeta `.git` de esta entrega sobre la de un repositorio existente.

No se cambió el flujo de publicación: el archivo `.github/workflows/static.yml` sigue publicando automáticamente solo las actualizaciones de `main`. No se hizo push, merge ni despliegue.

## Referencias del nuevo contenido

Instituto Guatemalteco de Migración. (2024, 6 de mayo). *Recomendaciones ante la ola de calor en la frontera de México y Estados Unidos*. https://igm.gob.gt/recomendaciones-ante-ola-de-calor-frontera-de-estados-unidos-y-mexico-mayo-2024/

Organización Mundial de la Salud. (2025, 1 de septiembre). *Salud mental de refugiados y migrantes*. https://www.who.int/es/news-room/fact-sheets/detail/refugee-and-migrant-mental-health

Organización Mundial de la Salud. (2026b, 25 de marzo). *Salud de los refugiados y los migrantes*. https://www.who.int/es/news-room/fact-sheets/detail/refugee-and-migrant-health

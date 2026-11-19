# Economía y Remesas

La rama de trabajo se llama `economia-remesas`. Parte de la versión proporcionada de `Integrante4MigraS`, que incluye los capítulos existentes y el aporte de riesgos de Migración. Los ZIP no contienen el historial Git original; las ramas del espacio de trabajo se reconstruyeron con dos instantáneas locales. El parche de entrega permite llevar los cambios al repositorio original conservando su historial.

## Qué incorpora

- Capítulo 05, Economía: selección de seis trimestres, indicadores nacionales, distribución de personas desocupadas por pueblo de pertenencia, informalidad nacional y por dominio, tablas completas y descarga CSV.
- Capítulo 06, Remesas: infografía de cuatro destinos, ejemplos de montos en quetzales, comparación mensual de 2025 y 2026, tablas y descarga CSV.
- Dos enlaces en el menú, dos tarjetas en el índice y cinco referencias nuevas insertadas alfabéticamente en la bibliografía existente.
- `economia-remesas.css` y `economia-remesas.js`, sin dependencias nuevas ni consultas de red para las interacciones.

En `index.html` solo se añaden recursos, navegación, tarjetas, capítulos y referencias; se cambia «Cuatro dimensiones» por «Seis dimensiones». El contenido de Desarrollo humano, Historias, Educación, Salud y Migración se conserva. Los demás archivos originales permanecen idénticos. No se corrigen ni se reorganizan contenidos previos.

## Datos y trazabilidad

Consulta editorial: **18 de noviembre de 2026**. Los datos son una instantánea, no una conexión en tiempo real.

| Contenido | Fuente y ubicación | Período |
| --- | --- | --- |
| Desempleo abierto nacional | INE, informe ENEIC 2026, apartado 2.7, p. 31 (página 42 del PDF) | IV trimestre de 2024–I trimestre de 2026 |
| Composición del desempleo por pueblo de pertenencia | Mismo informe, apartado 4.2, p. 61 (página 72 del PDF) | Mismos seis trimestres |
| Informalidad nacional | Mismo informe, apartado 2.5, p. 29 (página 40 del PDF) | Mismos seis trimestres |
| Informalidad por dominio | Mismo informe, apartado 2.6, p. 30 (página 41 del PDF) | Mismos seis trimestres |
| Ingreso mensual de remesas | Banco de Guatemala, cuadro 1 de la serie 2002–2026 | Enero–octubre de 2025 y de 2026 |
| Acumulado de remesas | Mismo cuadro: total publicado de 2026 | Enero–octubre de 2026: US$22,484.9 millones |
| Distribución por usos | OIM, encuesta 2022, publicada en 2023, sección «Uso de remesas» | 2022 |

### Criterios de interpretación

- El gráfico por pueblo de pertenencia muestra **la composición del total de personas desocupadas**. No muestra la tasa de desempleo dentro de cada pueblo. No se estimaron tasas ni desgloses que el cuadro no ofrece.
- Las dos agrupaciones reproducen las del INE. No se atribuyen cifras separadas a población maya, xinka o garífuna.
- Se utiliza el apartado 4.2, que incluye a toda la población desocupada; no se confunde con el 4.5, limitado a quienes trabajaron previamente.
- Las tasas de informalidad tienen como referencia las personas ocupadas de cada dominio. El desempleo utiliza la población económicamente activa.
- Los porcentajes de uso de remesas son del **monto**, no del número de personas ni de hogares. Suman 100 %: 43.8, 29.3, 14.6 y 12.3.
- Se utiliza el desglose de la sección de usos de la OIM, corroborado en su informe y en una publicación del PNUD; no el 44.8 que aparece en un párrafo introductorio del resumen y que haría sumar 101 %.
- El explorador en quetzales es una proporción matemática ilustrativa. No recomienda presupuestos ni aplica esos porcentajes al acumulado nacional de 2026.
- La suma de los meses de 2026 da US$22,484.8 millones por los valores redondeados. Se mantiene el total oficial de US$22,484.9 millones y se explica la diferencia.
- El crecimiento enero–octubre se calcula como `(22484.9 / 21358.4 - 1) × 100`, presentado como 5.3 %. Las variaciones mensuales comparan el mismo mes de ambos años.
- Los estudios académicos aportan contexto de sus propios períodos; no se presentan como estadísticas de 2026.

## Fuentes

Banco de Guatemala. (s. f.). *Ingreso de divisas por remesas familiares: Años 2002–2026* [Conjunto de datos]. Recuperado el 18 de noviembre de 2026, de https://www.banguat.gob.gt/sites/default/files/banguat/estaeco/remesas/remfam2002_2026.htm

Canelas, C., & Gisselquist, R. M. (2018). Human capital, labour market outcomes, and horizontal inequality in Guatemala. *Oxford Development Studies, 46*(3), 378–397. https://doi.org/10.1080/13600818.2017.1388360

Instituto Nacional de Estadística. (2026). *Encuesta Nacional de Empleo e Ingresos Continua (ENEIC) 2026: Informe de resultados*. https://www.ine.gob.gt/wp-content/uploads/2026/09/INFORME-ENEIC-2026-4%C2%B0-TRIM-2024-1%C2%B0-TRIM-2026.pdf

Organización Internacional para las Migraciones. (2023). *Encuesta sobre migración internacional de personas guatemaltecas y remesas 2022*. https://infounitnca.iom.int/document/encuesta-sobre-migracion-internacional-de-personas-guatemaltecas-y-remesas-2022/

Santos-Lozada, A. R., & Cuxil, E. R. (2025). The effect of the COVID-19 pandemic on remittances in Guatemala: A causal impact analysis. *Economics Letters, 252*, Artículo 112351. https://doi.org/10.1016/j.econlet.2025.112351

El artículo de Santos-Lozada y Cuxil está en ScienceDirect: https://www.sciencedirect.com/science/article/pii/S0165176525001880. Sus metadatos y resumen se contrastaron con la ficha de Penn State: https://pure.psu.edu/en/publications/the-effect-of-the-covid-19-pandemic-on-remittances-in-guatemala-a/

El artículo de Canelas y Gisselquist se contrastó con su editorial y UNU-WIDER: https://www.wider.unu.edu/publication/human-capital-labour-market-outcomes-and-horizontal-inequality-guatemala-0

Ambos tienen enlaces de búsqueda por DOI en Google Académico dentro de la bibliografía de la revista. Se cita la obra original, no el buscador.

Corroboración institucional del desglose OIM: https://www.undp.org/es/guatemala/comunicados-de-prensa/se-presenta-por-primera-vez-en-el-pais-el-indice-de-actividad-migratoria-de-guatemala-iamg

## Comprobaciones

- Sintaxis del JavaScript nuevo.
- Recursos locales presentes, identificadores únicos, enlaces internos y destinos de atributos ARIA.
- Conservación de los capítulos previos y comparación byte a byte del resto de los archivos originales.
- Correspondencia entre los datos de las tablas y el JavaScript; porcentajes y redondeos.
- Ejecución del JavaScript real sobre un árbol DOM de prueba: seis trimestres, cuatro destinos, montos de Q100/Q1,000/Q10,000, diez meses, variaciones positivas y negativas, descarga de ambos CSV e inicialización repetida.
- Tablas y gráficos iniciales presentes en el HTML; las tablas nativas `details` siguen disponibles sin JavaScript.

**Límite de las pruebas:** Chromium no pudo iniciarse porque el entorno bloquea la creación de sockets. Las comprobaciones de lógica no sustituyen una prueba visual o con lector de pantalla. Quedan por probar en un navegador real el diseño de escritorio/móvil, teclado y descargas.

## Revisión manual

1. Abrir `index.html` y acceder a Economía y Remesas desde menú e índice.
2. Cambiar entre los seis trimestres; comprobar que indicadores, títulos y ambos gráficos cambian juntos.
3. Seleccionar los cuatro destinos con Tab y Enter/Espacio. Mover el rango con las flechas y revisar los montos.
4. Elegir mayo en la comparación mensual: debe mostrar una disminución; octubre muestra aumento.
5. Abrir las tablas y descargar ambos CSV.
6. Revisar a 375 px y con zoom del 200 %. El gráfico mensual tiene desplazamiento horizontal dentro de su contenedor.
7. Desactivar JavaScript y comprobar tablas, textos y enlaces a las fuentes.

Los errores previamente detectados en otros componentes no se modificaron por indicación del usuario.

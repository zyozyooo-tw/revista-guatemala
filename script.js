
// GUATEMALA: MÁS ALLÁ DE LAS CIFRAS
// JAVASCRIPT COMPLETO

// DIMENSIONES DEL IDH

const dimensionesIDH = {
  salud: {
    titulo: "Salud",
    descripcion: "Se mide mediante la esperanza de vida al nacer."
  },
  educacion: {
    titulo: "Educación",
    descripcion: "Se consideran los años promedio y esperados de escolaridad."
  },
  ingresos: {
    titulo: "Nivel de vida",
    descripcion: "Se utiliza el ingreso nacional bruto per cápita ajustado por paridad de poder adquisitivo."
  }
};

function mostrarDimension(clave) {
  const dato = dimensionesIDH[clave];
  const panel = document.getElementById("resultado-idh");
  if (!dato || !panel) return;

  panel.innerHTML = `<h3>${dato.titulo}</h3><p>${dato.descripcion}</p>`;

  document.querySelectorAll(".dimension-card").forEach(b => {
    const activa = b.dataset.dimension === clave;
    b.classList.toggle("activa", activa);
    b.setAttribute("aria-pressed", String(activa));
  });
}

// COMPARACIÓN ENTRE PAÍSES

const paises = {
  mexico: { nombre: "México", idh: 0.789, puesto: 81 },
  bolivia: { nombre: "Bolivia", idh: 0.733, puesto: 108 },
  guatemala: { nombre: "Guatemala", idh: 0.662, puesto: 137 },
  honduras: { nombre: "Honduras", idh: 0.645, puesto: 139 }
};

function mostrarPais(clave) {
  const p = paises[clave];
  if (!p) return;

  document.getElementById("detalle-pais").innerHTML = `
    <h3>${p.nombre}</h3>
    <div class="valor-grande">${p.idh.toFixed(3)}</div>
    <p>IDH de 2023 · Posición mundial: ${p.puesto}</p>
  `;

  document.querySelectorAll("[data-pais]").forEach(b => {
    const activo = b.dataset.pais === clave;
    b.classList.toggle("activo", activo);
    b.setAttribute("aria-pressed", String(activo));
  });
}

// GRÁFICO HISTÓRICO
// Serie provisional: pendiente de cotejo año por año con PNUD.

const evolucionIDH = [
  { anio: 2014, valor: 0.650 },
  { anio: 2015, valor: 0.638 },
  { anio: 2016, valor: 0.642 },
  { anio: 2017, valor: 0.647 },
  { anio: 2018, valor: 0.649 },
  { anio: 2019, valor: 0.653 },
  { anio: 2020, valor: 0.645 },
  { anio: 2021, valor: 0.639 },
  { anio: 2022, valor: 0.655 },
  { anio: 2023, valor: 0.662 }
];

let anioSeleccionado = 2023;

function mostrarAnio(anio) {
  const d = evolucionIDH.find(x => x.anio === anio);
  if (!d) return;

  anioSeleccionado = anio;

  document.getElementById("detalle-anio").innerHTML = `
    <h3>Guatemala · ${d.anio}</h3>
    <div class="valor-grande">${d.valor.toFixed(3)}</div>
    <p>Índice de Desarrollo Humano</p>
  `;

  document.querySelectorAll("[data-anio]").forEach(b => {
    const activo = Number(b.dataset.anio) === anio;
    b.classList.toggle("activo", activo);
    b.setAttribute("aria-pressed", String(activo));
  });

  dibujarGrafico();
}

function dibujarGrafico() {
  const svg = document.getElementById("grafico-idh");
  if (!svg) return;

  const izq = 70, der = 755, arriba = 35, abajo = 280;
  const minimo = 0.62, maximo = 0.68;

  const puntos = evolucionIDH.map((d, i) => ({
    ...d,
    x: izq + i * (der - izq) / (evolucionIDH.length - 1),
    y: abajo - (d.valor - minimo) /
      (maximo - minimo) * (abajo - arriba)
  }));

  const linea = puntos.map((p, i) =>
    `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`
  ).join(" ");

  let contenido = "";

  [0.62, 0.64, 0.66, 0.68].forEach(v => {
    const y = abajo - (v - minimo) /
      (maximo - minimo) * (abajo - arriba);

    contenido += `
      <line class="eje-grafico"
        x1="${izq}" y1="${y}" x2="${der}" y2="${y}"/>
      <text class="texto-grafico"
        x="12" y="${y + 5}">${v.toFixed(2)}</text>
    `;
  });

  contenido += `<path class="linea-idh" d="${linea}"/>`;

  puntos.forEach(p => {
    const activo = p.anio === anioSeleccionado;
    contenido += `
      <circle class="punto-idh ${activo ? "seleccionado" : ""}"
        cx="${p.x}" cy="${p.y}" r="${activo ? 8 : 5}"/>
      <text class="texto-grafico" x="${p.x}" y="315"
        text-anchor="middle">${String(p.anio).slice(2)}</text>
    `;
  });

  svg.innerHTML = contenido;
}

function prepararGrafico() {
  const selector = document.getElementById("selector-anios");
  if (!selector) return;

  evolucionIDH.forEach(d => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = d.anio;
    b.dataset.anio = d.anio;
    b.addEventListener("click", () => mostrarAnio(d.anio));
    selector.appendChild(b);
  });

  mostrarAnio(2023);
}

// SABÍAS QUE

const curiosidades = [
  {
    titulo: "El IDH no mide toda la desigualdad",
    texto: "El IDH presenta promedios nacionales, pero no muestra por sí solo las diferencias entre las personas y comunidades."
  },
  {
    titulo: "El desarrollo humano va más allá del dinero",
    texto: "El desarrollo humano considera las capacidades y oportunidades de las personas para estudiar, vivir saludablemente y alcanzar sus metas."
  },
  {
    titulo: "Existe un IDH ajustado por desigualdad",
    texto: "El PNUD utiliza un indicador adicional que considera las desigualdades en salud, educación e ingresos."
  }
];

function mostrarCuriosidad(indice) {
  const d = curiosidades[indice];
  if (!d) return;

  document.getElementById("respuesta-curiosidad").innerHTML =
    `<h3>${d.titulo}</h3><p>${d.texto}</p><p class="fuente">Fuente: PNUD (s. f.).</p>`;

  document.querySelectorAll(".curiosidad").forEach(b => {
    const activo = Number(b.dataset.curiosidad) === indice;
    b.classList.toggle("activa", activo);
    b.setAttribute("aria-expanded", String(activo));
  });
}

// HISTORIAS DOCUMENTADAS

const historias = {
  caty: {
    titulo: "Caty: construir un futuro con más oportunidades",
    texto:
      "Caty es una adolescente de Nebaj, Quiché, que continúa " +
      "sus estudios con apoyo de la Asociación Ixmucané. " +
      "Además de estudiar Perito Contador, realiza tejidos " +
      "para cubrir algunos gastos y ahorrar, lo que le " +
      "permitió comprar su propia computadora " +
      "(Escudero, 2026a).",
    analisis:
      "Su historia demuestra que el desarrollo humano incluye " +
      "la posibilidad de estudiar, obtener ingresos y tomar " +
      "decisiones sobre el propio futuro, además de mostrar " +
      "la importancia del apoyo familiar y comunitario.",
    foto:
      "En el ensayo fotográfico original aparecen escenas de " +
      "Caty utilizando tecnología, caminando hacia sus " +
      "actividades educativas y realizando tejidos. " +
      "Las imágenes muestran la relación entre sus estudios, " +
      "su identidad cultural y sus oportunidades económicas.",
    credito:
      "Fotografías: UNICEF/GUA2025/Izquierdo y otros créditos " +
      "indicados en el ensayo fotográfico de UNICEF.",
    enlace:
      "https://www.unicef.org/guatemala/historias/caty-una-adolescente-de-guatemala-que-est%C3%A1-transformando-su-futuro-con-educaci%C3%B3n-y"
  },

  mirna: {
    titulo: "Mirna Ixcanil: la libertad de elegir",
    texto:
      "Mirna Ixcanil es una mujer maya achí cuya historia " +
      "fue publicada por UNICEF en 2016. En ese momento " +
      "había completado la secundaria, trabajaba como " +
      "maestra y estudiaba Pedagogía en la universidad, " +
      "a pesar de las distancias que debía recorrer " +
      "para continuar su formación (Figueroa, 2016).",
    analisis:
      "Su experiencia muestra que el desarrollo humano " +
      "significa tener libertad para elegir un proyecto " +
      "de vida, continuar aprendiendo y contribuir " +
      "a la comunidad.",
    foto:
      "El reportaje presenta fotografías de Mirna estudiando " +
      "en su hogar y retratos de su entorno cotidiano. " +
      "Estas imágenes permiten comprender cómo combina " +
      "sus responsabilidades familiares, su trabajo " +
      "y su formación universitaria.",
    credito:
      "Fotografías: UNICEF/GUA2016/Francisco Javier Figueroa.",
    enlace:
      "https://www.unicef.org/guatemala/historias/hambre-por-saber"
  },

  joselin: {
    titulo: "Joselin: ciencia y nuevas posibilidades",
    texto:
      "Joselin es una adolescente de San Juan Sacatepéquez " +
      "que combina sus estudios con trabajo en una piñatería " +
      "para cubrir gastos educativos. También participa " +
      "en actividades de ciencia y tecnología de UNICEF, " +
      "donde ha desarrollado habilidades relacionadas " +
      "con la robótica (Escudero, 2026b).",
    analisis:
      "Su historia muestra que el acceso a nuevas habilidades " +
      "puede ampliar las oportunidades profesionales, " +
      "fortalecer la confianza personal y ayudar a " +
      "encontrar soluciones para la comunidad.",
    foto:
      "El reportaje incluye fotografías de Joselin trabajando " +
      "con un proyecto de robótica y participando en " +
      "actividades tecnológicas. Las imágenes muestran " +
      "cómo aplica sus conocimientos a proyectos prácticos.",
    credito:
      "Fotografías: UNICEF/UNI942406/Izquierdo " +
      "y UNICEF/UNI942412/Izquierdo.",
    enlace:
      "https://www.unicef.org/guatemala/historias/adolescentes-en-la-ciencia-la-historia-de-joselyn-y-el-poder-de-las-habilidades-steam"
  }
};

function mostrarHistoria(clave) {
  const h = historias[clave];
  const panel = document.getElementById("panel-historia");
  if (!h || !panel) return;

  document.getElementById("historia-titulo").textContent = h.titulo;
  document.getElementById("historia-texto").textContent = h.texto;
  document.getElementById("historia-analisis").textContent = h.analisis;
  document.getElementById("historia-foto").textContent = h.foto;
  document.getElementById("historia-credito").textContent = h.credito;
  document.getElementById("historia-enlace").href = h.enlace;

  panel.hidden = false;

  document.querySelectorAll(".abrir-historia").forEach(b => {
    b.setAttribute(
      "aria-pressed",
      String(b.dataset.historia === clave)
    );
  });

  panel.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto" : "smooth",
    block: "center"
  });
}

// CUESTIONARIO

const preguntas = [
  {
    pregunta: "¿Cuáles son las tres dimensiones básicas del IDH?",
    opciones: [
      "Salud, educación y nivel de vida",
      "Salud, turismo y empleo",
      "Educación, comercio y transporte",
      "Economía, territorio y clima"
    ],
    correcta: 0,
    explicacion: "El IDH combina salud, educación y nivel de vida."
  },
  {
    pregunta: "¿Qué indicador utiliza el IDH para medir la salud?",
    opciones: [
      "Cantidad de hospitales",
      "Esperanza de vida al nacer",
      "Número de consultas médicas",
      "Gasto hospitalario"
    ],
    correcta: 1,
    explicacion: "La dimensión de salud utiliza la esperanza de vida al nacer."
  },
  {
    pregunta: "¿Qué indicadores considera la dimensión educativa?",
    opciones: [
      "Cantidad de escuelas y docentes",
      "Resultados de exámenes nacionales",
      "Años promedio y esperados de escolaridad",
      "Cantidad de universidades"
    ],
    correcta: 2,
    explicacion: "El IDH considera años promedio y esperados de escolaridad."
  },
  {
    pregunta: "¿Cuál es una limitación importante del IDH?",
    opciones: [
      "No muestra por sí solo todas las desigualdades",
      "Mide todas las desigualdades individuales",
      "Solo considera el crecimiento económico",
      "No incluye ninguna dimensión educativa"
    ],
    correcta: 0,
    explicacion: "El IDH debe complementarse con otros indicadores."
  }
];

let preguntaActual = 0;
let puntuacion = 0;
let respondida = false;

function mostrarPregunta() {
  const p = preguntas[preguntaActual];

  document.getElementById("numero-pregunta").textContent =
    `PREGUNTA ${preguntaActual + 1} DE ${preguntas.length}`;

  document.getElementById("puntuacion-actual").textContent =
    `${puntuacion} respuestas correctas`;

  document.getElementById("texto-pregunta").textContent = p.pregunta;

  document.getElementById("progreso-quiz").style.width =
    `${preguntaActual / preguntas.length * 100}%`;

  document.getElementById("retroalimentacion").textContent = "";

  const contenedor = document.getElementById("opciones-quiz");
  contenedor.innerHTML = "";

  p.opciones.forEach((opcion, indice) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opcion-quiz";
    b.textContent = `${String.fromCharCode(65 + indice)}. ${opcion}`;
    b.addEventListener("click", () => seleccionarRespuesta(indice));
    contenedor.appendChild(b);
  });

  const siguiente = document.getElementById("boton-siguiente");
  siguiente.disabled = true;
  siguiente.textContent =
    preguntaActual === preguntas.length - 1
      ? "Ver mi resultado" : "Siguiente pregunta";

  respondida = false;
}

function seleccionarRespuesta(indice) {
  if (respondida) return;
  respondida = true;

  const p = preguntas[preguntaActual];
  const correcta = indice === p.correcta;

  if (correcta) puntuacion++;

  document.querySelectorAll(".opcion-quiz").forEach((b, i) => {
    b.disabled = true;
    if (i === p.correcta) b.classList.add("correcta");
    else if (i === indice) b.classList.add("incorrecta");
  });

  document.getElementById("retroalimentacion").textContent =
    (correcta ? "Respuesta correcta. " : "Respuesta incorrecta. ") +
    p.explicacion;

  document.getElementById("puntuacion-actual").textContent =
    `${puntuacion} respuestas correctas`;

  document.getElementById("boton-siguiente").disabled = false;
}

function siguientePregunta() {
  preguntaActual++;
  if (preguntaActual < preguntas.length) mostrarPregunta();
  else mostrarResultado();
}

function mostrarResultado() {
  document.getElementById("quiz-preguntas").hidden = true;
  document.getElementById("quiz-resultado").hidden = false;

  document.getElementById("puntuacion-final").textContent =
    `${puntuacion} de ${preguntas.length} respuestas correctas`;

  document.getElementById("mensaje-final").textContent =
    puntuacion === preguntas.length
      ? "Excelente. Comprendes los conceptos principales del IDH."
      : "Puedes revisar las dimensiones y volver a intentarlo.";
}

function reiniciarCuestionario() {
  preguntaActual = 0;
  puntuacion = 0;
  respondida = false;

  document.getElementById("quiz-preguntas").hidden = false;
  document.getElementById("quiz-resultado").hidden = true;
  mostrarPregunta();
}

// REFLEXIONES

async function copiarReflexiones() {
  const preguntasTexto = [
    "¿Qué significa para ti el desarrollo humano?",
    "¿Cómo se relaciona el IDH con tu vida cotidiana?",
    "Describe tres aspectos que afectan el IDH en Guatemala."
  ];

  const texto = preguntasTexto.map((p, i) => {
    const respuesta =
      document.getElementById(`reflexion${i + 1}`).value.trim();
    return `${i + 1}. ${p}\n${respuesta || "Sin responder"}`;
  }).join("\n\n");

  const mensaje = document.getElementById("mensaje-copia");

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(texto);
      mensaje.textContent = "Reflexiones copiadas correctamente.";
    } else {
      const temporal = document.createElement("textarea");
      temporal.value = texto;
      temporal.style.position = "fixed";
      temporal.style.opacity = "0";
      document.body.appendChild(temporal);
      temporal.select();
      const exito = document.execCommand("copy");
      temporal.remove();
      mensaje.textContent = exito
        ? "Reflexiones copiadas correctamente."
        : "No se pudo copiar automáticamente.";
    }
  } catch (error) {
    mensaje.textContent =
      "No se pudo copiar. Selecciona tus respuestas manualmente.";
  }
}

// INICIALIZACIÓN

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  document.querySelectorAll(".dimension-card").forEach(b => {
    b.addEventListener("click", () =>
      mostrarDimension(b.dataset.dimension));
  });

  document.querySelectorAll("[data-pais]").forEach(b => {
    b.addEventListener("click", () =>
      mostrarPais(b.dataset.pais));
  });

  document.querySelectorAll(".curiosidad").forEach(b => {
    b.addEventListener("click", () =>
      mostrarCuriosidad(Number(b.dataset.curiosidad)));
  });

  document.querySelectorAll(".abrir-historia").forEach(b => {
    b.addEventListener("click", () =>
      mostrarHistoria(b.dataset.historia));
  });

  document.getElementById("boton-siguiente")
    .addEventListener("click", siguientePregunta);

  document.getElementById("reiniciar-quiz")
    .addEventListener("click", reiniciarCuestionario);

  document.getElementById("copiar-reflexiones")
    .addEventListener("click", copiarReflexiones);

  mostrarPais("guatemala");
  prepararGrafico();
  mostrarPregunta();
});


// CAPÍTULO DE SALUD: tarjetas y datos interactivos
(()=>{
const programs=[{title:'Programa de Inmunizaciones',responsible:'Ministerio de Salud Pública y Asistencia Social (MSPAS), con cooperación técnica de la OPS.',action:'Previene enfermedades mediante la vacunación. En agosto de 2025 se documentó el fortalecimiento de la microplanificación local para adecuar la vacunación de rutina a cada territorio y reducir brechas de cobertura.',impact:'Contribuye a la prevención y al acceso a servicios esenciales.',source:9},{title:'Programa Nacional de Salud Reproductiva',responsible:'Ministerio de Salud Pública y Asistencia Social (MSPAS).',action:'Aborda la salud reproductiva y los riesgos maternos. Se documentaron acciones de vigilancia de muertes maternas, apertura de Centros de Atención Permanente en Huehuetenango y prevención del cáncer cervicouterino.',impact:'Fortalece la atención durante el embarazo y el parto, vinculada con la mortalidad materna.',source:2},{title:'Programa de Seguridad Alimentaria y Nutricional',responsible:'Ministerio de Salud Pública y Asistencia Social, a través de PROSAN.',action:'Realiza monitoreo del crecimiento, consejería alimentaria y suplementación. En octubre de 2026 se anunció una intervención nutricional para niñas y niños de 6 a 23 meses en siete municipios de Alta Verapaz y Totonicapán. El suplemento no reemplaza la lactancia ni la alimentación habitual.',impact:'Busca prevenir y detectar problemas nutricionales; la intervención citada comienza en siete municipios.',source:10}];
const facts=[{value:'71.6 años',label:'Esperanza de vida al nacer',year:'Guatemala · 2023',explain:'Promedio de años que viviría una persona recién nacida si se mantuvieran las condiciones de mortalidad de ese período. Fuente: OMS (perfil de Guatemala).'}, {value:'94',label:'Muertes maternas por cada 100,000 nacidos vivos',year:'Estimación · 2023',explain:'Razón estimada de mortalidad materna; ayuda a comprender los riesgos del embarazo, parto y posparto. Fuente: OMS y organismos asociados (2025).'}, {value:'42.0 %',label:'Desnutrición crónica en menores de cinco años',year:'ENDESA · 2025',explain:'Se refiere a talla baja para la edad, no a desnutrición aguda. La comparación con la ENSMI 2014–2015 exige cautela por tratarse de encuestas distintas. Fuente: ENDESA 2025, citada en la investigación.'}];
const sources=[['Arreaga, S. (2026, 9 de octubre). Salud pone en marcha estrategia para prevenir la desnutrición infantil. Agencia Guatemalteca de Noticias.','https://agn.gt/salud-pone-en-marcha-estrategia-para-prevenir-la-desnutricion-infantil/'],['Baldizon, P. (2025, 17 de diciembre). Llegar a tiempo salvó la vida de Santos antes de una emergencia por desnutrición aguda. UNICEF.','https://www.unicef.org/guatemala/historias/llegar-tiempo-salv%C3%B3-la-vida-de-santos-antes-de-una-emergencia-por-desnutrici%C3%B3n-aguda'],['MSPAS. (2024, 11 de enero). Ministerio de Salud presenta principales avances de salud reproductiva en Guatemala.','https://www.prensa.gob.gt/comunicado/ministerio-de-salud-presenta-principales-avances-de-salud-reproductiva-en-guatemala'],['Naciones Unidas en Guatemala. (2025, 11 de marzo). Mujeres abren el camino a una mayor seguridad alimentaria y la nutrición.','https://guatemala.un.org/es/290665-mujeres-abren-el-camino-una-mayor-seguridad-alimentaria-y-la-nutrici%C3%B3n'],['Ola, A. L. (2026, 27 de abril). Endesa 2025: tras una década sin datos, desnutrición infantil baja 4.5 puntos. Prensa Libre.','https://www.prensalibre.com/guatemala/comunitario/endesa-2025-tras-una-decada-sin-datos-desnutricion-infantil-baja-4-5-puntos/'],['Organización Mundial de la Salud. (2026). Guatemala [Perfil de país]. Data WHO.','https://data.who.int/countries/320'],['OMS, UNICEF, UNFPA, Banco Mundial y UNDESA. (2025). Trends in maternal mortality 2000 to 2023.','https://www.who.int/publications/i/item/9789240108462'],['OMS y Banco Mundial. (2025). Tracking universal health coverage: 2025 global monitoring report.','https://www.who.int/publications/i/item/9789240117808'],['OPS. (2024). Perfil de país Guatemala. Salud en las Américas.','https://hia.paho.org/es/perfiles-de-pais/guatemala'],['OPS. (2025, 11 de agosto). Guatemala inicia la primera fase de fortalecimiento técnico para la implementación de la microplanificación para la vacunación de rutina.','https://www.paho.org/es/noticias/11-8-2025-guatemala-inicia-primera-fase-fortalecimiento-tecnico-para-implementacion'],['UNICEF. (2026, 9 de octubre). MSPAS, UNICEF y la Iglesia de Jesucristo presentan estrategia nutricional preventiva.','https://www.unicef.org/guatemala/comunicados-prensa/mspas-unicef-y-la-iglesia-de-jesucristo-presentan-estrategia-nutricional']];
const pg=document.getElementById('salud-programGrid');programs.forEach((p,i)=>{const article=document.createElement('article');article.className='salud-programa';article.innerHTML=`<span class="numero">PROGRAMA 0${i+1}</span><h3>${p.title}</h3><button type="button" aria-expanded="false" aria-controls="salud-program-detail-${i}">Conocer el programa +</button><div class="salud-detalles" id="salud-program-detail-${i}" hidden><p><strong>Responsable:</strong> ${p.responsible}</p><p>${p.action}</p><p><strong>Relación con indicadores:</strong> ${p.impact}</p><a href="${sources[p.source][1]}" target="_blank" rel="noopener noreferrer">Ver fuente ↗</a></div>`;const b=article.querySelector('button'),d=article.querySelector('.salud-detalles');b.addEventListener('click',()=>{const open=d.hidden;d.hidden=!open;b.setAttribute('aria-expanded',String(open));b.textContent=open?'Ocultar información −':'Conocer el programa +'});pg.append(article)});
const fg=document.getElementById('salud-factGrid');facts.forEach((f,i)=>{const b=document.createElement('button');b.className='salud-dato';b.type='button';b.setAttribute('aria-expanded','false');b.innerHTML=`<span class="salud-valor">${f.value}</span><span class="salud-etiqueta">${f.label}</span><span class="salud-periodo">${f.year}</span><span class="salud-explicacion" hidden>${f.explain}</span>`;b.addEventListener('click',()=>{const e=b.querySelector('.explain'),open=e.hidden;e.hidden=!open;b.setAttribute('aria-expanded',String(open))});fg.append(b)});
const list=document.getElementById('salud-sourceList');sources.forEach(([label,url])=>{const li=document.createElement('li'),a=document.createElement('a');a.textContent=label;a.href=url;a.target='_blank';a.rel='noopener noreferrer';li.append(a);list.append(li)});

})();

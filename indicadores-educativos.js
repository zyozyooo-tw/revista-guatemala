/* Indicadores educativos y actividades - Integrante 5 */

(() => {
  "use strict";

  const capitulo = document.getElementById("indicadores-educativos");

  // Evita ejecutar este código en páginas que no tengan nuestra sección.
  if (!capitulo) return;

  const fuentes = {
    censo: {
      cita: "Instituto Nacional de Estadística (2019)",
      url: "https://censo2018.ine.gob.gt/archivos/resultados_censo2018.pdf"
    },
    pueblos: {
      cita: "Instituto Nacional de Estadística (2021), apartado 2.1, p. 11",
      url: "https://www.ine.gob.gt/sistema/uploads/2021/12/30/20211230192119ITIf0Taxw7mbshQNenoLw9A9K5cR4pMt.pdf"
    },
    bid: {
      cita: "Us et al. (2022)",
      url: "https://doi.org/10.18235/0003883"
    },
    gobierno: {
      cita: "Vicepresidencia de la República de Guatemala (s. f.)",
      url: "https://www.vicepresidencia.gob.gt/politica-gobierno-2024-2028/72-desarrollo-social"
    }
  };

  const indicadores = [
    {
      titulo: "Alfabetización por sexo",
      contexto: "CENSO 2018 · POBLACIÓN DE 7 AÑOS O MÁS",
      descripcion:
        "La alfabetización es la capacidad de leer y escribir. Los datos " +
        "publicados por sexo permiten observar una brecha de género.",
      unidad: "%",
      maximo: 100,
      datos: [
        { nombre: "Hombres", valor: 85.0 },
        { nombre: "Mujeres", valor: 78.3 },
        { nombre: "Total nacional", valor: 81.5 }
      ],
      interpretacion:
        "La diferencia entre hombres y mujeres era de 6,7 puntos " +
        "porcentuales. El dato describe una desigualdad, pero por sí " +
        "solo no explica sus causas.",
      fuente: "censo"
    },
    {
      titulo: "Alfabetización por pueblo de pertenencia",
      contexto: "CENSO 2018 · POBLACIÓN DE 7 AÑOS O MÁS",
      descripcion:
        "Para analizar las diferencias por grupo étnico se utiliza la " +
        "categoría pueblo de pertenencia del INE. Estas tasas corresponden " +
        "al alfabetismo general, no únicamente en español.",
      unidad: "%",
      maximo: 100,
      datos: [
        { nombre: "Maya", valor: 71.8 },
        { nombre: "Garífuna", valor: 85.3 },
        { nombre: "Xinka", valor: 79.1 },
        { nombre: "Afrodescendiente", valor: 88.7 },
        { nombre: "Ladino", valor: 88.5 }
      ],
      interpretacion:
        "La diferencia entre la población ladina y la maya era de " +
        "16,7 puntos porcentuales. Son desigualdades educativas, " +
        "no diferencias de capacidad entre los pueblos.",
      fuente: "pueblos"
    },
    {
      titulo: "Escolaridad: años de estudio aprobados",
      contexto: "CENSO 2018 · POBLACIÓN DE 15 AÑOS O MÁS",
      descripcion:
        "La escolaridad se mide aquí como el promedio de años de estudio " +
        "aprobados. Es diferente de la alfabetización.",
      unidad: " años",
      maximo: 10,
      datos: [
        { nombre: "Total nacional", valor: 6.2 },
        { nombre: "Mujeres indígenas rurales", valor: 3.4 },
        { nombre: "Hombres no indígenas urbanos", valor: 8.7 }
      ],
      interpretacion:
        "Estos grupos ilustran diferencias combinadas de sexo, pertenencia " +
        "étnica y residencia. No representan a todas las mujeres rurales " +
        "ni a todos los hombres urbanos. Un promedio nacional de 6,2 años " +
        "tampoco significa que todas las personas terminaron primaria.",
      fuente: "bid"
    },
    {
      titulo: "Deserción escolar",
      contexto: "AÑO ESCOLAR 2022",
      descripcion:
        "La deserción es el abandono de los estudios durante un período " +
        "escolar. No es lo mismo que no aprobar un grado ni que estar " +
        "fuera del sistema educativo.",
      unidad: "%",
      maximo: 100,
      datos: [
        { nombre: "Total nacional", valor: 4.0 },
        { nombre: "Ciclo básico", valor: 6.2 }
      ],
      interpretacion:
        "La fuente gubernamental identifica al ciclo básico como el más " +
        "afectado. El total nacional incluye distintos niveles: estas " +
        "dos cifras no deben sumarse ni interpretarse como categorías " +
        "independientes.",
      fuente: "gobierno"
    },
    {
      titulo: "Brecha digital: acceso a internet",
      contexto: "CENSO 2018 · HOGARES",
      descripcion:
        "La brecha digital incluye diferencias de conexión, dispositivos " +
        "y habilidades. Este indicador mide solamente los hogares " +
        "que contaban con servicio de internet.",
      unidad: "%",
      maximo: 100,
      datos: [
        { nombre: "Área urbana", valor: 27.4 },
        { nombre: "Área rural", valor: 3.5 },
        { nombre: "Total nacional", valor: 17.3 }
      ],
      interpretacion:
        "La diferencia urbana-rural era de 23,9 puntos porcentuales. " +
        "El indicador no mide todo uso de internet mediante celulares, " +
        "escuelas u otros lugares, ni la calidad de la conexión.",
      fuente: "bid"
    }
  ];

  // Formato: 85.0 se muestra como 85,0.
  function numero(valor) {
    return valor.toFixed(1).replace(".", ",");
  }

  function crearGrafico(indicador) {
    const filas = indicador.datos.map((dato) => {
      const ancho = (dato.valor / indicador.maximo) * 100;

      return `
        <div class="ie-fila">
          <span>${dato.nombre}</span>

          <div class="ie-pista" aria-hidden="true">
            <div class="ie-barra" style="width: ${ancho}%"></div>
          </div>

          <strong>${numero(dato.valor)}${indicador.unidad}</strong>
        </div>
      `;
    }).join("");

    return `
      <figure class="ie-grafico">
        <figcaption>${indicador.titulo}</figcaption>

        <p class="ie-escala">
          Escala de 0 a ${indicador.maximo}${indicador.unidad}.
        </p>

        ${filas}
      </figure>
    `;
  }

  function crearTabla(indicador) {
    const filas = indicador.datos.map((dato) => `
      <tr>
        <th scope="row">${dato.nombre}</th>
        <td>${numero(dato.valor)}${indicador.unidad}</td>
      </tr>
    `).join("");

    return `
      <div class="ie-tabla">
        <table>
          <caption>${indicador.titulo}</caption>

          <thead>
            <tr>
              <th scope="col">Población o indicador</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>

          <tbody>${filas}</tbody>
        </table>
      </div>
    `;
  }

  const contenedor = capitulo.querySelector("#ie-indicadores");

  indicadores.forEach((indicador, indice) => {
    const fuente = fuentes[indicador.fuente];
    const seccion = document.createElement("section");
    const tituloId = `ie-titulo-${indice}`;

    seccion.className = "ie-panel";
    seccion.setAttribute("aria-labelledby", tituloId);

    // Solo se insertan datos definidos en este archivo, no entradas del usuario.
    seccion.innerHTML = `
      <p class="edu-kicker">${indicador.contexto}</p>

      <h4 id="${tituloId}">${indicador.titulo}</h4>

      <p>${indicador.descripcion}</p>

      <div class="ie-comparacion">
        ${crearGrafico(indicador)}
        ${crearTabla(indicador)}
      </div>

      <p class="ie-interpretacion">
        <strong>Lectura de los datos:</strong>
        ${indicador.interpretacion}
      </p>

      <p class="ie-fuente">
        Fuente: ${fuente.cita}.
        <a
          href="${fuente.url}"
          target="_blank"
          rel="noopener noreferrer"
        >Consultar fuente ↗</a>
      </p>
    `;

    contenedor.append(seccion);
  });

  // Comparación interactiva entre áreas urbanas y rurales.
  const datosTerritorio = [
    { nombre: "Indígena · urbana", valor: 5.6, area: "urbana" },
    { nombre: "Indígena · rural", valor: 3.8, area: "rural" },
    { nombre: "No indígena · urbana", valor: 8.3, area: "urbana" },
    { nombre: "No indígena · rural", valor: 5.3, area: "rural" }
  ];

  const selectorArea = capitulo.querySelector("#ie-area");
  const territorio = capitulo.querySelector("#ie-territorio");
  const estadoArea = capitulo.querySelector("#ie-area-estado");

  function actualizarTerritorio() {
    const area = selectorArea.value;

    const datosFiltrados = datosTerritorio.filter((dato) => {
      return area === "todas" || dato.area === area;
    });

    const indicador = {
      titulo: "Escolaridad por área y pertenencia étnica, 2018",
      unidad: " años",
      maximo: 10,
      datos: datosFiltrados
    };

    territorio.innerHTML = `
      <div class="ie-comparacion">
        ${crearGrafico(indicador)}
        ${crearTabla(indicador)}
      </div>
    `;
  }

  actualizarTerritorio();

  selectorArea.addEventListener("change", () => {
    actualizarTerritorio();

    estadoArea.textContent = selectorArea.value === "todas"
      ? "Se muestran las áreas urbana y rural."
      : `Se muestra únicamente el área ${selectorArea.value}.`;
  });

  // Actividad de interpretación del gráfico.
  const formulario = capitulo.querySelector("#ie-pregunta");
  const resultado = capitulo.querySelector("#ie-resultado");

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const seleccion = formulario.querySelector(
      'input[name="ie-respuesta"]:checked'
    );

    if (!seleccion) return;

    if (seleccion.value === "23.9") {
      resultado.textContent =
        "¡Correcto! 27,4 − 3,5 = 23,9 puntos porcentuales. " +
        "Recordá que se comparan porcentajes de hogares, no de estudiantes.";
    } else {
      resultado.textContent =
        "Revisá la operación: debés restar 27,4 − 3,5. " +
        "La diferencia es de 23,9 puntos porcentuales. Podés intentarlo otra vez.";
    }
  });

  // Actividad de reflexión: cada propuesta atiende una barrera distinta.
  const propuestas = {
    transporte:
      "El apoyo de transporte podría reducir el costo y facilitar la " +
      "asistencia. Necesita financiamiento continuo, rutas seguras y " +
      "horarios adecuados. No resuelve por sí solo la falta de internet.",

    internet:
      "Un centro comunitario podría ofrecer conexión y equipos compartidos. " +
      "Necesita electricidad, mantenimiento, acompañamiento y horarios " +
      "accesibles. También hay que considerar la distancia para llegar.",

    materiales:
      "Los materiales impresos o descargables permiten estudiar sin " +
      "conexión permanente. Requieren distribución, actualización y " +
      "acompañamiento docente. No sustituyen todas las actividades " +
      "presenciales o en línea."
  };

  const botones = capitulo.querySelectorAll("[data-ie-propuesta]");
  const detalle = capitulo.querySelector("#ie-propuesta-detalle");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      botones.forEach((otro) => {
        otro.setAttribute("aria-pressed", String(otro === boton));
      });

      detalle.textContent = propuestas[boton.dataset.iePropuesta];
    });
  });
})();
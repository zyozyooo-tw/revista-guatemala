/* Solo modifica los controles del capítulo de Migración. */
(() => {
  'use strict';

  const capitulo = document.getElementById('migracion');
  if (!capitulo || capitulo.dataset.migraInicializado === 'true') return;

  const datos = [...capitulo.querySelectorAll('.migra-dato')];
  const boton = capitulo.querySelector('#migra-alternar');
  const estado = capitulo.querySelector('#migra-estado');
  if (!datos.length || !boton || !estado) return;

  capitulo.dataset.migraInicializado = 'true';

  const actualizar = () => {
    const abiertos = datos.filter(dato => dato.open).length;
    boton.textContent = abiertos === datos.length
      ? 'Ocultar todos los datos'
      : 'Mostrar todos los datos';
    estado.textContent = `${abiertos} de ${datos.length} datos abiertos.`;
  };

  datos.forEach(dato => dato.addEventListener('toggle', actualizar));
  boton.addEventListener('click', () => {
    const abrir = !datos.every(dato => dato.open);
    datos.forEach(dato => { dato.open = abrir; });
    actualizar();
  });

  actualizar();
  boton.hidden = false;
  estado.hidden = false;
})();
/* Indicadores de Migración · Integrante 2 */

(() => {
  "use strict";

  const seccion = document.getElementById("indicadores-migracion");
  if (!seccion) return;

  const buscar = id => seccion.querySelector("#" + id);

  const porcentaje = n => n.toFixed(1).replace(".", ",") + " %";

  const entero = n => new Intl.NumberFormat("es-GT").format(n);

  // Fuente: INE, Censo 2018, gráfico 18.
  const porSexo = [
    {
      nombre: "Hombres",
      cantidad: 187756,
      porcentaje: 77.5,
      clase: "mi-hombres"
    },
    {
      nombre: "Mujeres",
      cantidad: 54447,
      porcentaje: 22.5,
      clase: "mi-mujeres"
    }
  ];

  // Fuente: INE, Censo 2018, gráfico 19.
  // Porcentajes dentro de cada grupo, según edad al salir del país.
  const edades = [
    {
      edad: "0–14 años",
      hombres: 4.9,
      mujeres: 9.1,
      total: 5.9
    },
    {
      edad: "15–29 años",
      hombres: 63.0,
      mujeres: 61.2,
      total: 62.6
    },
    {
      edad: "30–49 años",
      hombres: 29.3,
      mujeres: 26.3,
      total: 28.6
    },
    {
      edad: "50 años o más",
      hombres: 2.7,
      mujeres: 3.4,
      total: 2.9
    }
  ];

  const nombres = {
    hombres: "Hombres",
    mujeres: "Mujeres",
    total: "Total"
  };

  // Los valores y etiquetas proceden únicamente de los datos
  // definidos en este archivo.
  function barra(etiqueta, valor, maximo, texto, clase) {
    return `
      <div class="mi-fila">
        <span>${etiqueta}</span>

        <div class="mi-pista" aria-hidden="true">
          <div
            class="mi-barra ${clase}"
            style="width: ${valor / maximo * 100}%">
          </div>
        </div>

        <strong>${texto}</strong>
      </div>
    `;
  }

  // Primer gráfico: cantidades o porcentajes por sexo.
  function actualizarSexo() {
    const mostrarCantidad = buscar("mi-unidad").value === "cantidad";

    const maximo = mostrarCantidad ? 242203 : 100;

    buscar("mi-grafico-sexo").innerHTML = porSexo.map(dato => {
      const valor = mostrarCantidad
        ? dato.cantidad
        : dato.porcentaje;

      const texto = mostrarCantidad
        ? entero(dato.cantidad)
        : porcentaje(dato.porcentaje);

      return barra(
        dato.nombre,
        valor,
        maximo,
        texto,
        dato.clase
      );
    }).join("");

    buscar("mi-escala-sexo").textContent = mostrarCantidad
      ? "Escala de 0 a 242,203 personas."
      : "Escala de 0 a 100 %. Base: 242,203 personas con información reportada.";
  }

  // Segundo gráfico: distribución por edad.
  function actualizarEdades() {
    const opcion = buscar("mi-grupo").value;

    const grupos = opcion === "comparar"
      ? ["hombres", "mujeres"]
      : [opcion];

    buscar("mi-grafico-edad").innerHTML = edades.map(fila => `
      <div class="mi-grupo-edad">
        <h4>${fila.edad}</h4>

        ${grupos.map(grupo => barra(
          nombres[grupo],
          fila[grupo],
          100,
          porcentaje(fila[grupo]),
          "mi-" + grupo
        )).join("")}
      </div>
    `).join("");

    const lecturas = {
      comparar:
        "Entre los hombres emigrantes, el 63,0 % salió a los 15–29 años; " +
        "entre las mujeres emigrantes, el 61,2 %. Cada porcentaje " +
        "tiene como referencia su propio grupo.",

      hombres:
        "Entre los hombres emigrantes, el grupo de 15–29 años " +
        "concentraba el 63,0 %.",

      mujeres:
        "Entre las mujeres emigrantes, el grupo de 15–29 años " +
        "concentraba el 61,2 %.",

      total:
        "En el conjunto de personas emigrantes, el 62,6 % tenía " +
        "entre 15 y 29 años cuando salió del país."
    };

    buscar("mi-lectura").textContent = lecturas[opcion];
  }

  buscar("mi-unidad").addEventListener("change", actualizarSexo);

  buscar("mi-grupo").addEventListener("change", actualizarEdades);

  actualizarSexo();
  actualizarEdades();
})();


/* Reflexión local: no se almacena ni transmite información. */
(() => {
  'use strict';
  const seccion = document.getElementById('migra-reflexion');
  if (!seccion) return;
  const pregunta = seccion.querySelector('#migra-pregunta');
  const respuesta = seccion.querySelector('#migra-respuesta-texto');
  const estado = seccion.querySelector('#migra-reflexion-estado');
  seccion.querySelector('#migra-limpiar').addEventListener('click', () => {
    respuesta.value = '';
    estado.textContent = 'Se limpió el texto de esta actividad.';
    respuesta.focus();
  });
  seccion.querySelector('#migra-copiar').addEventListener('click', async () => {
    if (!respuesta.value.trim()) { estado.textContent = 'Escribí una reflexión antes de copiar.'; respuesta.focus(); return; }
    const texto = `${pregunta.options[pregunta.selectedIndex].text}\n\n${respuesta.value.trim()}`;
    try {
      await navigator.clipboard.writeText(texto);
      estado.textContent = 'Reflexión copiada al portapapeles.';
    } catch (_) {
      respuesta.focus(); respuesta.select();
      estado.textContent = 'No se pudo copiar automáticamente. Seleccioná el texto y presioná Ctrl+C.';
    }
  });
})();

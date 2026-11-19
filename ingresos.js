(() => {
  "use strict";

  const seccion = document.getElementById("ingresos-trabajo");
  if (!seccion) return;

  const buscar = id => seccion.querySelector("#" + id);

  const dinero = n => new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ"
  }).format(n);

  // Salarios mensuales de 2026 sin bonificación.
  const salarios = [
    ["CE1", "Agrícola", 3791.20],
    ["CE1", "No agrícola", 4002.28],
    ["CE1", "Exportación y maquila", 3409.73],
    ["CE2", "Agrícola", 3625.89],
    ["CE2", "No agrícola", 3816.90],
    ["CE2", "Exportación y maquila", 3221.10]
  ];

  // CBA mensual por persona, octubre de 2026.
  const canastas = {
    urbana: 986.95,
    rural: 767.51
  };

  // Ingreso relativo: hombres de cada grupo = Q100.
  // Fuente: ENEIC, segundo trimestre de 2025.
  const brechas = {
    nacional: {
      mujer: 71.5,
      titulo: "Total nacional"
    },
    indigena: {
      mujer: 61.4,
      titulo: "Población indígena"
    },
    rural: {
      mujer: 61.8,
      titulo: "Área rural"
    }
  };

  // Completa la tabla de salarios.
  buscar("it-tabla-salarios").innerHTML = salarios.map(
    ([ce, actividad, base]) => `
      <tr>
        <th scope="row">${ce} · ${actividad}</th>
        <td>${dinero(base)}</td>
        <td>${dinero(250)}</td>
        <td>${dinero(base + 250)}</td>
      </tr>
    `
  ).join("");

  // Completa el selector. Inicialmente: CE1, no agrícola.
  buscar("it-salario").innerHTML = salarios.map(
    ([ce, actividad], i) => `
      <option value="${i}" ${i === 1 ? "selected" : ""}>
        ${ce} · ${actividad}
      </option>
    `
  ).join("");

  // Completa la tabla de canasta alimentaria.
  buscar("it-tabla-canasta").innerHTML = Object.entries(canastas).map(
    ([area, valor]) => `
      <tr>
        <th scope="row">${area === "urbana" ? "Urbana" : "Rural"}</th>
        <td>${dinero(valor)}</td>
      </tr>
    `
  ).join("");

  function barra(nombre, valor, maximo) {
    return `
      <div class="it-barra-fila">
        <span>${nombre}</span>

        <div class="it-pista" aria-hidden="true">
          <div
            class="it-barra"
            style="width:${valor / maximo * 100}%">
          </div>
        </div>

        <strong>${dinero(valor)}</strong>
      </div>
    `;
  }

  function actualizarComparador() {
    const personas = buscar("it-personas");
    const perceptores = buscar("it-perceptores");

    if (!personas.checkValidity() || !perceptores.checkValidity()) {
      buscar("it-resultado").textContent =
        "Ingresá cantidades enteras entre 1 y 20.";

      buscar("it-grafico").innerHTML = "";
      return;
    }

    const n = Number(personas.value);
    const p = Number(perceptores.value);

    if (p > n) {
      buscar("it-resultado").textContent =
        "La cantidad de personas que reciben ingreso no puede " +
        "superar a los integrantes del hogar.";

      buscar("it-grafico").innerHTML = "";
      return;
    }

    const fila = salarios[Number(buscar("it-salario").value)];

    const ingresoIndividual =
      fila[2] + (buscar("it-bono").checked ? 250 : 0);

    const ingresoHogar = ingresoIndividual * p;

    const costo = canastas[buscar("it-area").value] * n;

    const saldo = ingresoHogar - costo;
    const cobertura = ingresoHogar / costo * 100;

    buscar("it-resultado").textContent =
      `Ingreso mensual del hogar antes de descuentos: ${dinero(ingresoHogar)}. ` +
      `Costo alimentario estimado: ${dinero(costo)}. ` +
      `${saldo >= 0 ? "Saldo después de alimentos" : "Faltante para alimentos"}: ` +
      `${dinero(Math.abs(saldo))}. Cobertura: ${cobertura.toFixed(1)} %. ` +
      "Un saldo positivo no implica que se cubran vivienda, transporte, " +
      "salud u otros gastos.";

    const maximo = Math.max(ingresoHogar, costo);

    buscar("it-grafico").innerHTML =
      barra("Ingreso del hogar", ingresoHogar, maximo) +
      barra("Alimentación del hogar", costo, maximo);
  }

  // Actualiza el escenario al modificar cualquiera de sus controles.
  [
    "it-salario",
    "it-area",
    "it-personas",
    "it-perceptores",
    "it-bono"
  ].forEach(id => {
    buscar(id).addEventListener("input", actualizarComparador);
    buscar(id).addEventListener("change", actualizarComparador);
  });

  function actualizarBrecha() {
    const dato = brechas[buscar("it-contexto").value];

    buscar("it-brecha-resultado").textContent =
      `${dato.titulo}: por cada Q100 de ingreso laboral promedio de los ` +
      `hombres del mismo grupo, las mujeres recibían Q${dato.mujer.toFixed(1)}. ` +
      `La brecha publicada por el INE es de ${(100 - dato.mujer).toFixed(1)} %.`;

    buscar("it-brecha-grafico").innerHTML =
      barra("Hombres: referencia", 100, 100) +
      barra("Mujeres", dato.mujer, 100);
  }

  buscar("it-contexto").addEventListener("change", actualizarBrecha);

  actualizarComparador();
  actualizarBrecha();
})();
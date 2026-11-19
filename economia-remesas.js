/*
 * Economía y Remesas. Sin dependencias ni peticiones de red.
 * INE: ENEIC 2026, apartados 2.5–2.7 y 4.2 (pp. 29–31 y 61).
 * OIM: encuesta 2022, publicada en 2023, sección «Uso de remesas».
 * Banguat: cuadro 1 de remfam2002_2026.htm, consulta 18/11/2026.
 * Los capítulos anteriores conservan sus archivos y comportamientos.
 */
(() => {
  'use strict';

  const datos = {
  "corte": "2026-11-18",
  "economia": [
    {
      "periodo": "IV trimestre de 2024",
      "corto": "IV / 2024",
      "desempleo": 1.7,
      "indigenas": 24.4,
      "ladinosOtros": 75.6,
      "informalidad": [
        66.7,
        48.8,
        65.5,
        77.4
      ]
    },
    {
      "periodo": "I trimestre de 2025",
      "corto": "I / 2025",
      "desempleo": 2.3,
      "indigenas": 24.1,
      "ladinosOtros": 75.9,
      "informalidad": [
        66.1,
        46.1,
        65.7,
        76.9
      ]
    },
    {
      "periodo": "II trimestre de 2025",
      "corto": "II / 2025",
      "desempleo": 2.2,
      "indigenas": 24.4,
      "ladinosOtros": 75.6,
      "informalidad": [
        66.2,
        45.2,
        65.4,
        77.8
      ]
    },
    {
      "periodo": "III trimestre de 2025",
      "corto": "III / 2025",
      "desempleo": 1.9,
      "indigenas": 25.4,
      "ladinosOtros": 74.6,
      "informalidad": [
        65.9,
        44.1,
        65.0,
        78.1
      ]
    },
    {
      "periodo": "IV trimestre de 2025",
      "corto": "IV / 2025",
      "desempleo": 2.3,
      "indigenas": 29.2,
      "ladinosOtros": 70.8,
      "informalidad": [
        65.6,
        44.3,
        65.0,
        77.3
      ]
    },
    {
      "periodo": "I trimestre de 2026",
      "corto": "I / 2026",
      "desempleo": 2.2,
      "indigenas": 23.1,
      "ladinosOtros": 76.9,
      "informalidad": [
        64.9,
        43.7,
        64.7,
        75.6
      ]
    }
  ],
  "dominios": [
    "Total nacional",
    "Urbano metropolitano",
    "Resto urbano",
    "Rural nacional"
  ],
  "usos": [
    {
      "id": "consumo",
      "titulo": "Consumo",
      "porcentaje": 43.8,
      "color": "#205a48",
      "icono": "shopping-basket",
      "descripcion": "Sostener la vida cotidiana: alimentos, vivienda, transporte y otros gastos del hogar.",
      "ejemplo": "Por ejemplo, comprar alimentos o pagar el transporte familiar.",
      "idea": "Cubrir necesidades básicas también contribuye al bienestar de las familias."
    },
    {
      "id": "inversion",
      "titulo": "Inversión y ahorro",
      "porcentaje": 29.3,
      "color": "#8b5b2b",
      "icono": "landmark",
      "descripcion": "Construcción o compra de vivienda, ahorro y otras inversiones de los hogares.",
      "ejemplo": "Por ejemplo, ampliar una vivienda o reservar una parte de los ingresos.",
      "idea": "Esta categoría combina distintos destinos; el 29.3 % no corresponde únicamente al ahorro."
    },
    {
      "id": "negocios",
      "titulo": "Consumo intermedio",
      "porcentaje": 14.6,
      "color": "#466d93",
      "icono": "store",
      "descripcion": "Insumos y gastos vinculados con pequeños negocios o actividades productivas.",
      "ejemplo": "Por ejemplo, adquirir mercadería o materia prima para un emprendimiento.",
      "idea": "Se refiere a gastos del negocio, distintos de las compras para consumo del hogar."
    },
    {
      "id": "social",
      "titulo": "Inversión social",
      "porcentaje": 12.3,
      "color": "#755185",
      "icono": "book-heart",
      "descripcion": "Recursos destinados a salud y educación, agrupados por la OIM como inversión social.",
      "ejemplo": "Por ejemplo, cubrir una consulta médica o gastos educativos.",
      "idea": "La salud y la educación aparecen separadas del consumo en esta clasificación."
    }
  ],
  "meses": [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre"
  ],
  "remesas2025": [
    1817.6,
    1821.4,
    2003.7,
    1984.6,
    2281.1,
    2219.3,
    2366.0,
    2368.0,
    2106.7,
    2390.0
  ],
  "remesas2026": [
    1954.7,
    1893.9,
    2441.8,
    2141.2,
    2221.4,
    2325.5,
    2468.6,
    2327.7,
    2240.8,
    2469.2
  ],
  "acumulado2026": 22484.9
};
  const numero = valor => valor.toLocaleString('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });
  const porcentaje = valor => numero(valor) + ' %';
  const quetzales = valor => 'Q' + numero(valor);

  function descargarCSV(nombre, filas) {
    // UTF-8 con BOM y separador ; para conservar tildes y facilitar su uso en Excel.
    const escapar = valor => '"' + String(valor).replace(/"/g, '""') + '"';
    const contenido = '\uFEFF' + filas.map(fila => fila.map(escapar).join(';')).join('\r\n');
    const url = URL.createObjectURL(new Blob([contenido], { type: 'text/csv;charset=utf-8;' }));
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = nombre;
    document.body.append(enlace);
    enlace.click();
    enlace.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function crearBarra(nombre, valor, alterna) {
    const fila = document.createElement('div');
    fila.className = 'er-barra-fila';
    const etiqueta = document.createElement('span');
    etiqueta.textContent = nombre;
    const pista = document.createElement('div');
    pista.className = 'er-barra-fondo';
    pista.setAttribute('aria-hidden', 'true');
    const barra = document.createElement('span');
    barra.className = 'er-barra' + (alterna ? ' er-barra-alterna' : '');
    barra.style.width = valor + '%';
    pista.append(barra);
    const cifra = document.createElement('strong');
    cifra.textContent = porcentaje(valor);
    fila.append(etiqueta, pista, cifra);
    return fila;
  }

  const economia = document.getElementById('economia');
  if (economia && economia.dataset.erInicializado !== 'true') {
    economia.dataset.erInicializado = 'true';
    const buscar = id => economia.querySelector('#' + id);
    const selector = buscar('eco-periodo');

    function actualizarEconomia(anunciar) {
      const registro = datos.economia[Number(selector.value)];
      if (!registro) return;
      economia.querySelectorAll('[data-eco-periodo]').forEach(elemento => {
        elemento.textContent = registro.periodo;
      });
      buscar('eco-cifra-desempleo').textContent = porcentaje(registro.desempleo);
      buscar('eco-cifra-informalidad').textContent = porcentaje(registro.informalidad[0]);
      buscar('eco-cifra-rural').textContent = porcentaje(registro.informalidad[3]);
      buscar('eco-etnia').replaceChildren(
        crearBarra('Pueblos indígenas', registro.indigenas, false),
        crearBarra('Ladino/a, mestizo/a y otros', registro.ladinosOtros, true)
      );
      buscar('eco-informalidad').replaceChildren(...datos.dominios.map((dominio, i) => {
        return crearBarra(dominio, registro.informalidad[i], i === 0);
      }));
      buscar('eco-lectura-etnia').textContent =
        `De cada 100 personas desocupadas, aproximadamente ${numero(registro.indigenas)} ` +
        `pertenecían a pueblos indígenas y ${numero(registro.ladinosOtros)} al conjunto ladino, mestizo y otros.`;
      const diferencia = registro.informalidad[3] - registro.informalidad[1];
      buscar('eco-lectura-informalidad').textContent =
        `La diferencia entre el área rural y el área urbana metropolitana fue de ${numero(diferencia)} puntos porcentuales.`;
      if (anunciar) buscar('eco-estado').textContent =
        `Se muestran los indicadores y ambos gráficos del ${registro.periodo}. ` +
        `Desempleo abierto nacional: ${porcentaje(registro.desempleo)}. ` +
        `Informalidad nacional: ${porcentaje(registro.informalidad[0])}.`;
    }

    selector.addEventListener('change', () => actualizarEconomia(true));
    actualizarEconomia(false);
    buscar('eco-control').hidden = false;

    const descarga = buscar('eco-descargar');
    descarga.addEventListener('click', () => {
      const filas = [['Periodo', 'Indicador', 'Grupo o dominio', 'Valor', 'Unidad', 'Poblacion de referencia', 'Fuente', 'Apartado']];
      datos.economia.forEach(registro => {
        filas.push([registro.periodo, 'Desempleo abierto', 'Total nacional', registro.desempleo,
          '%', 'Poblacion economicamente activa', 'INE, ENEIC 2026', '2.7']);
        [['Pueblos indigenas', registro.indigenas], ['Ladino/a, mestizo/a y otros', registro.ladinosOtros]].forEach(([nombre, valor]) => {
          filas.push([registro.periodo, 'Distribucion del desempleo por pueblo de pertenencia', nombre,
            valor, '%', 'Total de personas desocupadas', 'INE, ENEIC 2026', '4.2']);
        });
        datos.dominios.forEach((dominio, i) => filas.push([registro.periodo, 'Tasa de informalidad', dominio,
          registro.informalidad[i], '%', 'Personas ocupadas del dominio', 'INE, ENEIC 2026', i === 0 ? '2.5' : '2.6']));
      });
      descargarCSV('economia-guatemala-eneic-2026.csv', filas);
    });
    descarga.hidden = false;
  }

  const remesas = document.getElementById('remesas');
  if (remesas && remesas.dataset.erInicializado !== 'true') {
    remesas.dataset.erInicializado = 'true';
    const buscar = id => remesas.querySelector('#' + id);
    const botones = [...remesas.querySelectorAll('[data-rem-uso]')];
    const rango = buscar('rem-monto');

    function seleccionarUso(id) {
      const uso = datos.usos.find(elemento => elemento.id === id);
      if (!uso) return;
      botones.forEach(boton => boton.setAttribute('aria-pressed', String(boton.dataset.remUso === id)));
      buscar('rem-anillo-valor').textContent = porcentaje(uso.porcentaje);
      buscar('rem-anillo-nombre').textContent = uso.titulo;
      buscar('rem-detalle-titulo').textContent = uso.titulo + ' · ' + porcentaje(uso.porcentaje);
      buscar('rem-detalle-texto').textContent = uso.descripcion;
      buscar('rem-detalle-ejemplo').textContent = uso.ejemplo;
      buscar('rem-detalle-idea').textContent = uso.idea;
      remesas.querySelectorAll('[data-rem-segmento]').forEach(segmento => {
        segmento.style.opacity = segmento.dataset.remSegmento === id ? '1' : '0.4';
      });
    }

    botones.forEach(boton => {
      boton.addEventListener('click', () => seleccionarUso(boton.dataset.remUso));
      boton.disabled = false;
    });

    function actualizarMonto(anunciar) {
      const monto = Number(rango.value);
      if (!Number.isFinite(monto)) return;
      buscar('rem-monto-salida').value = quetzales(monto);
      rango.setAttribute('aria-valuetext', quetzales(monto));
      const resumen = [];
      datos.usos.forEach(uso => {
        const calculo = quetzales(monto * uso.porcentaje / 100);
        const elemento = remesas.querySelector(`[data-rem-monto="${uso.id}"]`);
        elemento.textContent = calculo;
        elemento.hidden = false;
        resumen.push(uso.titulo + ': ' + calculo);
      });
      if (anunciar) buscar('rem-presupuesto-estado').textContent =
        `Para un ejemplo de ${quetzales(monto)}, ${resumen.join('; ')}. Proporciones de 2022.`;
    }

    rango.addEventListener('input', () => actualizarMonto(false));
    rango.addEventListener('change', () => actualizarMonto(true));
    actualizarMonto(false);
    buscar('rem-presupuesto').hidden = false;

    const mes = buscar('rem-mes');
    function actualizarMes(anunciar) {
      const indice = Number(mes.value);
      if (!Number.isInteger(indice) || indice < 0 || indice >= datos.meses.length) return;
      const nombre = datos.meses[indice];
      const previo = datos.remesas2025[indice];
      const actual = datos.remesas2026[indice];
      const variacion = (actual / previo - 1) * 100;
      buscar('rem-mes-titulo').textContent = nombre;
      buscar('rem-mes-2025').textContent = numero(previo);
      buscar('rem-mes-2026').textContent = numero(actual);
      const sentido = variacion >= 0 ? 'más' : 'menos';
      const explicacion = `En ${nombre.toLowerCase()} de 2026 se recibieron ${numero(Math.abs(variacion))} % ${sentido} remesas que en ${nombre.toLowerCase()} de 2025.`;
      buscar('rem-variacion-mes').textContent = explicacion;
      const x = 64 + indice * 624 / 9;
      const marca = buscar('rem-marca-mes');
      marca.setAttribute('x1', x);
      marca.setAttribute('x2', x);
      [2025, 2026].forEach(anio => {
        const punto = buscar('rem-punto-' + anio);
        punto.setAttribute('cx', x);
        punto.setAttribute('cy', 262 - datos['remesas' + anio][indice] / 3000 * 220);
      });
      if (anunciar) buscar('rem-mes-estado').textContent =
        `${nombre}. 2025: ${numero(previo)} millones de dólares. ` +
        `2026: ${numero(actual)} millones de dólares. ${explicacion}`;
    }

    mes.addEventListener('change', () => actualizarMes(true));
    actualizarMes(false);
    buscar('rem-mes-control').hidden = false;

    const descarga = buscar('rem-descargar');
    descarga.addEventListener('click', () => {
      const filas = [['Indicador', 'Periodo', 'Categoria', 'Valor', 'Unidad', 'Fuente', 'Consulta']];
      datos.usos.forEach(uso => filas.push(['Distribucion del monto por uso', '2022', uso.titulo,
        uso.porcentaje, '% del monto de remesas', 'OIM, encuesta 2022 publicada en 2023', datos.corte]));
      [2025, 2026].forEach(anio => datos.meses.forEach((nombre, i) => {
        filas.push(['Ingreso de divisas por remesas familiares', anio, nombre,
          datos['remesas' + anio][i], 'Millones de US$', 'Banco de Guatemala, cuadro 1', datos.corte]);
      }));
      filas.push(['Ingreso acumulado oficial', '2026', 'Enero-octubre', datos.acumulado2026,
        'Millones de US$', 'Banco de Guatemala, cuadro 1', datos.corte]);
      descargarCSV('remesas-guatemala-usos-2022-ingresos-2026.csv', filas);
    });
    descarga.hidden = false;
  }
})();

(() => {
  'use strict';
  const root = document.getElementById('salud-i7');
  if (!root) return;

  const graficos = {
    materna: {
      max: 160,
      unidad: 'por 100,000',
      filas: [['Indígenas', 144], ['No indígenas', 68]]
    },
    partos: {
      max: 100,
      unidad: '%',
      filas: [['Área urbana', 77.8], ['Área rural', 51.9]]
    },
    nutricion: {
      max: 100,
      unidad: '%',
      filas: [['ENSMI 2014-2015', 46.5], ['ENDESA 2025', 42.0]]
    }
  };

  root.querySelectorAll('[data-grafico]').forEach(contenedor => {
    const datos = graficos[contenedor.dataset.grafico];
    if (!datos) return;

    datos.filas.forEach(([nombre, valor]) => {
      const grupo = document.createElement('div');
      grupo.className = 'salud-barra-grupo';

      const etiqueta = document.createElement('div');
      etiqueta.className = 'salud-barra-etiqueta';

      const nombreEl = document.createElement('span');
      nombreEl.textContent = nombre;

      const numero = document.createElement('strong');
      numero.textContent = valor.toLocaleString('es-GT') + ' ' + datos.unidad;

      etiqueta.append(nombreEl, numero);

      const fondo = document.createElement('div');
      fondo.className = 'salud-barra-fondo';

      const barra = document.createElement('div');
      barra.className = 'salud-barra';
      barra.style.width = (valor / datos.max * 100) + '%';

      fondo.append(barra);
      grupo.append(etiqueta, fondo);
      contenedor.append(grupo);
    });
  });

  const pasos = [
    ['Identificar la necesidad', 'La persona reconoce síntomas o necesita vacunación, control prenatal u otra atención.'],
    ['Buscar atención', 'Acude a un puesto o centro de salud, o recibe orientación de personal comunitario.'],
    ['Recibir evaluación', 'El personal sanitario evalúa la situación y ofrece la atención disponible.'],
    ['Obtener referencia', 'Si se requiere atención de mayor complejidad, se gestiona una referencia.'],
    ['Continuar seguimiento', 'Se realizan controles y seguimiento según las necesidades de la persona.']
  ];

  let pasoActual = 0;
  const botones = root.querySelector('#salud-ruta-botones');
  const detalle = root.querySelector('#salud-ruta-detalle');
  const anterior = root.querySelector('#salud-anterior');
  const siguiente = root.querySelector('#salud-siguiente');

  pasos.forEach(([nombre], indice) => {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = (indice + 1) + '. ' + nombre;
    boton.addEventListener('click', () => mostrarPaso(indice));
    botones.append(boton);
  });

  function mostrarPaso(indice) {
    pasoActual = indice;
    detalle.replaceChildren();

    const titulo = document.createElement('h4');
    titulo.textContent = pasos[indice][0];

    const descripcion = document.createElement('p');
    descripcion.textContent = pasos[indice][1];

    detalle.append(titulo, descripcion);

    botones.querySelectorAll('button').forEach((boton, i) => {
      if (i === indice) boton.setAttribute('aria-current', 'step');
      else boton.removeAttribute('aria-current');
    });

    anterior.disabled = indice === 0;
    siguiente.disabled = indice === pasos.length - 1;
  }

  anterior.addEventListener('click', () => mostrarPaso(pasoActual - 1));
  siguiente.addEventListener('click', () => mostrarPaso(pasoActual + 1));
  mostrarPaso(0);

  const botonReflexion = root.querySelector('#salud-mostrar-reflexion');
  const ejemplo = root.querySelector('#salud-reflexion-ejemplo');

  botonReflexion.addEventListener('click', () => {
    ejemplo.hidden = !ejemplo.hidden;
    botonReflexion.setAttribute('aria-expanded', String(!ejemplo.hidden));
    botonReflexion.textContent = ejemplo.hidden
      ? 'Mostrar reflexión de referencia'
      : 'Ocultar reflexión de referencia';
  });

  const propuestas = {
    camotan: [
      'Fortalecer las brigadas de detección y seguimiento nutricional.',
      'Promover talleres sobre alimentación, higiene y agua segura.',
      'Facilitar referencias y transporte para atención médica.'
    ],
    chiantla: [
      'Ampliar la formación de consejeras comunitarias.',
      'Organizar talleres de nutrición, lactancia e higiene.',
      'Mejorar la coordinación de referencias hacia los servicios de salud.'
    ]
  };

  const comunidad = root.querySelector('#salud-comunidad');
  const lista = root.querySelector('#salud-lista-propuestas');

  function actualizarPropuestas() {
    lista.replaceChildren();
    propuestas[comunidad.value].forEach(texto => {
      const li = document.createElement('li');
      li.textContent = texto;
      lista.append(li);
    });
  }

  comunidad.addEventListener('change', actualizarPropuestas);
  actualizarPropuestas();

  root.querySelector('#salud-copiar').addEventListener('click', async () => {
    const obtener = id => root.querySelector('#' + id).value.trim() || '(Sin respuesta)';
    const texto = [
      'REFLEXIONES SOBRE SALUD EN GUATEMALA',
      '',
      'Comparación de rutas:',
      obtener('salud-comparacion'),
      '',
      'Relación entre salud y pobreza:',
      obtener('salud-pobreza'),
      '',
      'Comunidad: ' + comunidad.options[comunidad.selectedIndex].text,
      'Propuestas:',
      ...propuestas[comunidad.value].map((p, i) => (i + 1) + '. ' + p),
      '',
      'Mi propuesta:',
      obtener('salud-propuesta-personal')
    ].join('\n');

    const mensaje = root.querySelector('#salud-mensaje');
    try {
      await navigator.clipboard.writeText(texto);
      mensaje.textContent = 'Tus respuestas se copiaron correctamente.';
    } catch (error) {
      mensaje.textContent = 'No se pudo copiar. Revisa los permisos del navegador.';
    }
  });
})();

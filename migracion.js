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

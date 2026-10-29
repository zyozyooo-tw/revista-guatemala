(() => {
  const grid = document.getElementById('edu-datos');
  if (!grid) return;
  const datos = [
    {titulo:'25 idiomas en Guatemala',detalle:'El Ministerio de Educación reconoce 22 idiomas mayas, además del garífuna, el xinka y el español. Esta diversidad importa para la educación bilingüe intercultural.',fuente:'MINEDUC · Guía de Cultura e Idioma',url:'https://digecur.mineduc.gob.gt/wp-content/uploads/2025/10/Guia-Docente-Area-Culturas-e-Idiomas-Mayas-Garifuna-y-Xinka-1o.-Basico.pdf'},
    {titulo:'Aprender en lengua materna',detalle:'La UNESCO destaca que aprender en la lengua materna favorece la comprensión, la participación y la transmisión cultural.',fuente:'UNESCO · Lengua materna, pilar de la inclusión',url:'https://www.unesco.org/es/articles/lengua-materna-pilar-de-la-inclusion'},
    {titulo:'¿Qué significa STEAM?',detalle:'STEAM reúne ciencia, tecnología, ingeniería, arte y matemáticas. Joselin aplicó habilidades de robótica para diseñar iluminación LED activada por movimiento.',fuente:'UNICEF · Historia de Joselyn',url:'https://www.unicef.org/guatemala/historias/adolescentes-en-la-ciencia-la-historia-de-joselyn-y-el-poder-de-las-habilidades-steam'},
    {titulo:'Un hogar también puede apoyar el estudio',detalle:'La historia de Caty muestra cómo una residencia segura y acompañamiento educativo pueden contribuir a continuar los estudios.',fuente:'UNICEF · Historia de Caty',url:'https://www.unicef.org/guatemala/historias/caty-una-adolescente-de-guatemala-que-est%C3%A1-transformando-su-futuro-con-educaci%C3%B3n-y'}
  ];
  datos.forEach((dato,i) => {
    const tarjeta=document.createElement('article'); tarjeta.className='edu-dato';
    const boton=document.createElement('button'); boton.type='button'; boton.setAttribute('aria-expanded','false'); boton.setAttribute('aria-controls',`edu-detalle-${i}`);
    boton.innerHTML=`<span>DATO 0${i+1} · DESCUBRIR +</span><strong>${dato.titulo}</strong>`;
    const respuesta=document.createElement('div'); respuesta.className='edu-respuesta'; respuesta.id=`edu-detalle-${i}`; respuesta.hidden=true;
    const texto=document.createElement('p'); texto.textContent=dato.detalle;
    const enlace=document.createElement('a'); enlace.href=dato.url; enlace.target='_blank'; enlace.rel='noopener noreferrer'; enlace.textContent=`Fuente: ${dato.fuente} ↗`;
    respuesta.append(texto,enlace); tarjeta.append(boton,respuesta); grid.append(tarjeta);
    boton.addEventListener('click',()=>{const abrir=respuesta.hidden;respuesta.hidden=!abrir;boton.setAttribute('aria-expanded',String(abrir));boton.querySelector('span').textContent=`DATO 0${i+1} · ${abrir?'OCULTAR −':'DESCUBRIR +'}`;});
  });
})();

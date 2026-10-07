document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carrusel-track');
  const carruselContenedor = document.querySelector('.carrusel-contenedor');
  const btnPrev = document.querySelector('.carrusel-btn.prev');
  const btnNext = document.querySelector('.carrusel-btn.next');

  if (!track) return;

  const TIEMPO_CAMBIO = 4000; // Tiempo en milisegundos (4000ms = 4 segundos)
  let temporizador = null;

  // Función para avanzar a la siguiente diapositiva
  const moverSiguiente = () => {
    // Calculamos si ya llegamos al último banner
    const maxScroll = track.scrollWidth - track.clientWidth;
    
    if (track.scrollLeft >= maxScroll - 5) {
      // Si está en el final, vuelve al inicio
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      // Si no, avanza un banner a la derecha
      track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
    }
  };

  // Función para retroceder
  const moverAnterior = () => {
    if (track.scrollLeft <= 5) {
      // Si está en el inicio, salta al último
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
    }
  };

  // Iniciar el carrusel automático
  const iniciarAutoplay = () => {
    if (!temporizador) {
      temporizador = setInterval(moverSiguiente, TIEMPO_CAMBIO);
    }
  };

  // Detener el carrusel automático
  const detenerAutoplay = () => {
    clearInterval(temporizador);
    temporizador = null;
  };

  // --- EVENTOS DE CONTROLES ---

  // Flecha derecha
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      moverSiguiente();
      detenerAutoplay();
      iniciarAutoplay(); // Reinicia el tiempo tras hacer clic
    });
  }

  // Flecha izquierda
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      moverAnterior();
      detenerAutoplay();
      iniciarAutoplay();
    });
  }

  // Pausar cuando el usuario pone el ratón encima del carrusel
  if (carruselContenedor) {
    carruselContenedor.addEventListener('mouseenter', detenerAutoplay);
    carruselContenedor.addEventListener('mouseleave', iniciarAutoplay);
  }

  // Arrancar el temporizador al cargar la página
  iniciarAutoplay();
});
// CONFIGURACIÓN: Cambia esto según tus archivos
const TOTAL_PAGINAS = 4; // Cuántas imágenes tienes
const CARPETA_IMG = 'img'; // Nombre de tu carpeta de imágenes

const mangaContainer = document.querySelector('.manga-container');
const music = document.getElementById('bg-music');
const muteBtn = document.getElementById('mute-btn');


window.addEventListener('click', () => {
    if (music) music.play();
}, { once: true });


// Función para generar las imágenes automáticamente
function cargarManga() {
    if (!mangaContainer) return;

    for (let i = 1; i <= TOTAL_PAGINAS; i++) {
        const img = document.createElement('img');
        img.src = `${CARPETA_IMG}/${i}.webp`; 
        img.alt = `Pagina ${i}`;
        img.loading = "lazy"; 
        mangaContainer.appendChild(img);

        if (i === TOTAL_PAGINAS) {
            img.onload = () => crearBotonFinal();
        }
    }
}


//BOTÓN PARA PONER AL FINAL DE LA LECTURA-----
function crearBotonFinal() {
    // para ver si ya existe y no duplicarlo
    if (document.getElementById('btn-sorpresa')) return;

const btnFinal = document.createElement('button');
    btnFinal.id = "btn-sorpresa";
    btnFinal.innerText = "► PLAY ENDING";
    btnFinal.className = "boton-revelar"; // mirar en CSS
    
    btnFinal.onclick = function() {
        window.location.href = "ending.html"; // Redirige a la nueva página
    };

    mangaContainer.appendChild(btnFinal);
}


//-------------------



// Función para iniciar la experiencia
function startManga() {
    // 1. Reproducir música
    music.play().catch(e => console.log("Error al reproducir:", e));
    
    // 2. Mostrar botón de mute y ocultar bienvenida
    muteBtn.style.display = 'block';
    overlay.style.fadeOut = "slow"; 
    overlay.style.display = 'none';
    
    // 3. Cargar las imágenes
    cargarManga();
}

// Función para silenciar/activar
function toggleMute() {
    if (music.muted) {
        music.muted = false;
        muteBtn.innerText = "🔊";
    } else {
        music.muted = true;
        muteBtn.innerText = "🔇";
    }
}




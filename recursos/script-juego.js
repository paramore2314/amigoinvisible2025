const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

let dx = 0;
let dy = 0;
let score = 0;
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
const box = 20;
let juegoIniciado = false;

function cambiarDireccion(dir) {
    juegoIniciado = true; 
    if (dir === 'arriba' && dy === 0) { dx = 0; dy = -1; }
    if (dir === 'abajo' && dy === 0) { dx = 0; dy = 1; }
    if (dir === 'izquierda' && dx === 0) { dx = -1; dy = 0; }
    if (dir === 'derecha' && dx === 0) { dx = 1; dy = 0; }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') cambiarDireccion('arriba');
    if (e.key === 'ArrowDown') cambiarDireccion('abajo');
    if (e.key === 'ArrowLeft') cambiarDireccion('izquierda');
    if (e.key === 'ArrowRight') cambiarDireccion('derecha');
});

function dibujar() {
    if (juegoIniciado) {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};

        // Verificación de colisiones
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || 
            snake.some(seg => seg.x === head.x && seg.y === head.y)) {
            mostrarGameOver();
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreElement.innerText = score;
            food = { x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20) };
        } else {
            snake.pop();
        }
    }

    // Dibujado (esto debe ejecutarse siempre para ver la víbora al inicio)
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#e62222';
    snake.forEach(seg => {
        ctx.fillRect(seg.x * box, seg.y * box, box - 2, box - 2);
    });

    ctx.fillStyle = 'white';
    ctx.fillRect(food.x * box, food.y * box, box - 2, box - 2);
}

function mostrarGameOver() {
    juegoIniciado = false;
    const modal = document.getElementById('custom-modal');
    const mensaje = document.getElementById('modal-mensaje');
    if (modal && mensaje) {
        // Estructura con imagen y texto lado a lado
        mensaje.innerHTML = `
            <div class="mensaje-flex">
                
                <span>Perdiste pero seguí jugando, seguí...<br>No mires acrilicos.</span>
                <br>
                <img src="img/b.png" class="img-mensaje">

            </div>
            <br>
            <strong>Tu puntaje: ${score}</strong>
        `;
        modal.style.display = 'flex';
    }
}

function reiniciarJuego() {
    location.reload(); 
}

setInterval(dibujar, 120);
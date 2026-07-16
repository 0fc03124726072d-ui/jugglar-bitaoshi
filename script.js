// script.js
let positions = [0, 0, 0];
let isSpinning = [false, false, false];
const FRAME = 100;
const ONE_LAP_TIME = 870; 
const TOTAL_HEIGHT = 2100;

let lastTime = 0;

function update(timestamp) {
    if (!lastTime) lastTime = timestamp;
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ['reel1', 'reel2', 'reel3'].forEach((id, i) => {
        if (isSpinning[i]) {
            let speedPerMs = TOTAL_HEIGHT / ONE_LAP_TIME;
            positions[i] = (positions[i] + (speedPerMs * deltaTime)) % TOTAL_HEIGHT;
            document.getElementById(id).style.backgroundPosition = `0px ${positions[i]}px`;
        }
    });
    requestAnimationFrame(update);
}

function stopReel(i) {
    if (!isSpinning[i]) return;
    isSpinning[i] = false;
    
    let remainder = positions[i] % FRAME;
    let adjustment = (remainder > 50) ? (FRAME - remainder) : -remainder;
    positions[i] = (positions[i] + adjustment + TOTAL_HEIGHT) % TOTAL_HEIGHT;
    
    document.getElementById(['reel1', 'reel2', 'reel3'][i]).style.backgroundPosition = `0px ${positions[i]}px`;
}

function restartAll() { 
    isSpinning = [true, true, true]; 
    lastTime = performance.now();
}

requestAnimationFrame(update);

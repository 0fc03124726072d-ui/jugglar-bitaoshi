// script.js
let positions = [0, 0, 0];
let isSpinning = [false, false, false];
const FRAME = 100; // 1コマの高さ（元通り100px）
const ONE_LAP_TIME = 870; 
const TOTAL_HEIGHT = 2100; // 21コマ × 100px = 2100px

let lastTime = 0;

function update(timestamp) {
    if (!lastTime) lastTime = timestamp;
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ['reel1', 'reel2', 'reel3'].forEach((id, i) => {
        if (isSpinning[i]) {
            // 時間ベースで正確に動かす計算
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
    
    // 停止時に一番近いコマへ引き込む
    let remainder = positions[i] % FRAME;
    let adjustment = (remainder > 50) ? (FRAME - remainder) : -remainder;
    positions[i] = (positions[i] + adjustment + TOTAL_HEIGHT) % TOTAL_HEIGHT;
    
    document.getElementById(['reel1', 'reel2', 'reel3'][i]).style.backgroundPosition = `0px ${positions[i]}px`;
}

function restartAll() { 
    isSpinning = [true, true, true]; 
    lastTime = performance.now();
}

// 読み込み時に回転ループを開始
requestAnimationFrame(update);

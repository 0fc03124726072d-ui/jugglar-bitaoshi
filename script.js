// script.js
let positions = [0, 0, 0];
let isSpinning = [false, false, false];
const SPEED = 25; // 回転スピード
const FRAME = 100; // 1コマの高さ

function update() {
    ['reel1', 'reel2', 'reel3'].forEach((id, i) => {
        if (isSpinning[i]) {
            // 背景位置を動かすことでリールを回転させる
            positions[i] = (positions[i] + SPEED) % 2100;
            document.getElementById(id).style.backgroundPosition = `0px ${positions[i]}px`;
        }
    });
    requestAnimationFrame(update);
}

function stopReel(i) {
    if (!isSpinning[i]) return;
    isSpinning[i] = false;
    
    // 停止位置の引き込み計算
    let offset = positions[i] % FRAME;
    positions[i] = (offset > 50) ? positions[i] + (FRAME - offset) : positions[i] - offset;
    document.getElementById(['reel1', 'reel2', 'reel3'][i]).style.backgroundPosition = `0px ${positions[i]}px`;
}

function restartAll() { isSpinning = [true, true, true]; }

update();

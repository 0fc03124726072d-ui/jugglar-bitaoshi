// 配列を画像（1〜21番）の順番に修正しました
const REELS_DATA = {
    reel1: ['images/IMG_3471.jpg', 'images/IMG_3470.jpg', 'images/IMG_3474.jpg', 'images/IMG_3470.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3474.jpg', 'images/IMG_3468.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3470.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3468.jpg', 'images/IMG_3471.jpg'],
    reel2: ['images/IMG_3474.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3471.jpg', 'images/IMG_3472.jpg', 'images/IMG_3471.jpg', 'images/IMG_3472.jpg', 'images/IMG_3468.jpg', 'images/IMG_3472.jpg', 'images/IMG_3470.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3471.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3468.jpg', 'images/IMG_3474.jpg'],
    reel3: ['images/IMG_3472.jpg', 'images/IMG_3471.jpg', 'images/IMG_3472.jpg', 'images/IMG_3471.jpg', 'images/IMG_3472.jpg', 'images/IMG_3471.jpg', 'images/IMG_3471.jpg', 'images/IMG_3471.jpg', 'images/IMG_3472.jpg', 'images/IMG_3471.jpg', 'images/IMG_3472.jpg', 'images/IMG_3470.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3470.jpg', 'images/IMG_3470.jpg', 'images/IMG_3472.jpg', 'images/IMG_3472.jpg', 'images/IMG_3468.jpg', 'images/IMG_3472.jpg']
};

const FRAME_HEIGHT = 100;
const SPEED = (21 * FRAME_HEIGHT) / (0.87 * 60);

let isSpinning = [true, true, true];
let positions = [0, 0, 0];

function setup() {
    ['reel1', 'reel2', 'reel3'].forEach((id) => {
        const reel = document.getElementById(id);
        reel.innerHTML = '';
        // 下から上に流れるため、通常の順番で配置（下へ移動させるため）
        [...REELS_DATA[id], ...REELS_DATA[id], ...REELS_DATA[id]].forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.style.height = FRAME_HEIGHT + 'px';
            img.style.display = 'block';
            reel.appendChild(img);
        });
    });
}

function update() {
    ['reel1', 'reel2', 'reel3'].forEach((id, i) => {
        if (isSpinning[i]) {
            // マイナスに減算することで「下から上へ」流れる動きになります
            positions[i] = (positions[i] - SPEED + (21 * FRAME_HEIGHT)) % (21 * FRAME_HEIGHT);
            document.getElementById(id).style.transform = `translateY(${positions[i] - (21 * FRAME_HEIGHT)}px)`;
        }
    });
    requestAnimationFrame(update);
}

function stopReel(i) {
    isSpinning[i] = false;
    // 停止位置補正
    let remainder = Math.abs(positions[i] % FRAME_HEIGHT);
    if (remainder > FRAME_HEIGHT / 2) {
        positions[i] -= (FRAME_HEIGHT - remainder);
    } else {
        positions[i] += remainder;
    }
    document.getElementById(['reel1', 'reel2', 'reel3'][i]).style.transform = `translateY(${positions[i] - (21 * FRAME_HEIGHT)}px)`;
}

function restartAll() { isSpinning = [true, true, true]; }

setup();
update();

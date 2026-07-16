// 配列データ：ファイル名を正確に指定（大文字・小文字を厳守してください）
const REELS_DATA = {
    reel1: ['images/IMG_3471.jpg', 'images/IMG_3468.jpg', 'images/IMG_3474.jpg', 'images/IMG_3472.jpg', 'images/IMG_3474.jpg', 'images/IMG_3472.jpg', 'images/IMG_3470.jpg', 'images/IMG_3473.jpg', 'images/IMG_3472.jpg', 'images/IMG_3474.jpg', 'images/IMG_3472.jpg', 'images/IMG_3468.jpg', 'images/IMG_3473.jpg', 'images/IMG_3472.jpg', 'images/IMG_3474.jpg', 'images/IMG_3472.jpg', 'images/IMG_3473.jpg', 'images/IMG_3470.jpg', 'images/IMG_3472.jpg', 'images/IMG_3474.jpg', 'images/IMG_3472.jpg'],
    reel2: ['images/IMG_3474.jpg', 'images/IMG_3473.jpg', 'images/IMG_3474.jpg', 'images/IMG_3472.jpg', 'images/IMG_3474.jpg', 'images/IMG_3471.jpg', 'images/IMG_3472.jpg', 'images/IMG_3473.jpg', 'images/IMG_3474.jpg', 'images/IMG_3471.jpg', 'images/IMG_3472.jpg', 'images/IMG_3473.jpg', 'images/IMG_3470.jpg', 'images/IMG_3472.jpg', 'images/IMG_3473.jpg', 'images/IMG_3474.jpg', 'images/IMG_3471.jpg', 'images/IMG_3472.jpg', 'images/IMG_3473.jpg', 'images/IMG_3474.jpg', 'images/IMG_3470.jpg'],
    reel3: ['images/IMG_3472.jpg', 'images/IMG_3471.jpg', 'images/IMG_3474.jpg', 'images/IMG_3471.jpg', 'images/IMG_3472.jpg', 'images/IMG_3474.jpg', 'images/IMG_3471.jpg', 'images/IMG_3474.jpg', 'images/IMG_3472.jpg', 'images/IMG_3474.jpg', 'images/IMG_3471.jpg', 'images/IMG_3472.jpg', 'images/IMG_3474.jpg', 'images/IMG_3471.jpg', 'images/IMG_3474.jpg', 'images/IMG_3470.jpg', 'images/IMG_3470.jpg', 'images/IMG_3471.jpg', 'images/IMG_3474.jpg', 'images/IMG_3472.jpg', 'images/IMG_3474.jpg']
};

const FRAME_HEIGHT = 100;
// 1周0.87秒で21コマ移動する速度
const SPEED = (21 * FRAME_HEIGHT) / (0.87 * 60);

let isSpinning = [true, true, true];
let positions = [0, 0, 0];

function setup() {
    ['reel1', 'reel2', 'reel3'].forEach((id) => {
        const reel = document.getElementById(id);
        reel.innerHTML = ''; // 初期化
        // 画像を3セット配置してループを表現
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
            positions[i] = (positions[i] + SPEED) % (21 * FRAME_HEIGHT);
            document.getElementById(id).style.transform = `translateY(-${positions[i]}px)`;
        }
    });
    requestAnimationFrame(update);
}

function stopReel(i) { isSpinning[i] = false; }

setup();
update();

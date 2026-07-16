// 画像パスの定義
const IMG = {
    bell:   'images/IMG_3471.jpg',
    seven:  'images/IMG_3468.jpg',
    sai:    'images/IMG_3473.jpg',
    grape:  'images/IMG_3472.jpg',
    bar:    'images/IMG_3470.jpg',
    clown:  'images/IMG_3474.jpg'
};

// 21番(上)から1番(下)の順序で定義
const REELS_DATA = {
    reel1: [IMG.bell, IMG.seven, IMG.sai, IMG.grape, IMG.sai, IMG.grape, IMG.bar, IMG.sai, IMG.grape, IMG.sai, IMG.grape, IMG.seven, IMG.clown, IMG.grape, IMG.sai, IMG.grape, IMG.sai, IMG.bar, IMG.grape, IMG.sai, IMG.grape],
    reel2: [IMG.sai, IMG.seven, IMG.grape, IMG.sai, IMG.sai, IMG.bell, IMG.grape, IMG.sai, IMG.sai, IMG.bar, IMG.grape, IMG.sai, IMG.sai, IMG.bell, IMG.grape, IMG.sai, IMG.sai, IMG.bar, IMG.grape, IMG.sai, IMG.clown],
    reel3: [IMG.grape, IMG.seven, IMG.bar, IMG.bell, IMG.sai, IMG.grape, IMG.clown, IMG.bell, IMG.sai, IMG.grape, IMG.clown, IMG.bell, IMG.sai, IMG.grape, IMG.clown, IMG.bell, IMG.sai, IMG.grape, IMG.clown, IMG.bell, IMG.sai]
};

const FRAME_HEIGHT = 100;
const SPEED = 25; 

let isSpinning = [true, true, true];
let positions = [0, 0, 0];

function setup() {
    ['reel1', 'reel2', 'reel3'].forEach((id) => {
        const reel = document.getElementById(id);
        reel.innerHTML = '';
        // 3セット配置して、上から下へ流れる準備をする
        [...REELS_DATA[id], ...REELS_DATA[id], ...REELS_DATA[id]].forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            reel.appendChild(img);
        });
    });
}

function update() {
    ['reel1', 'reel2', 'reel3'].forEach((id, i) => {
        if (isSpinning[i]) {
            // ここが重要：加算することで「上から下に」流れる
            positions[i] = (positions[i] + SPEED) % (21 * FRAME_HEIGHT);
            // 現在のポジションからオフセットを引いて、上に引き上げることで「下へ流れる」見た目を作る
            document.getElementById(id).style.transform = `translateY(${positions[i] - (21 * FRAME_HEIGHT)}px)`;
        }
    });
    requestAnimationFrame(update);
}

function stopReel(i) {
    isSpinning[i] = false;
    // 停止位置補正（中央ラインに合わせる）
    let currentPos = positions[i];
    let remainder = currentPos % FRAME_HEIGHT;
    positions[i] = (remainder > FRAME_HEIGHT / 2) ? positions[i] + (FRAME_HEIGHT - remainder) : positions[i] - remainder;
    document.getElementById(['reel1', 'reel2', 'reel3'][i]).style.transform = `translateY(${positions[i] - (21 * FRAME_HEIGHT)}px)`;
}

function restartAll() { isSpinning = [true, true, true]; }

setup();
update();

// 画像パス
const IMG = {
    bell:   'images/IMG_3471.jpg',
    seven:  'images/IMG_3468.jpg',
    sai:    'images/IMG_3473.jpg',
    grape:  'images/IMG_3472.jpg',
    bar:    'images/IMG_3470.jpg',
    clown:  'images/IMG_3474.jpg'
};

const REELS_DATA = {
    reel1: [IMG.bell, IMG.seven, IMG.sai, IMG.grape, IMG.sai, IMG.grape, IMG.bar, IMG.sai, IMG.grape, IMG.sai, IMG.grape, IMG.seven, IMG.clown, IMG.grape, IMG.sai, IMG.grape, IMG.sai, IMG.bar, IMG.grape, IMG.sai, IMG.grape],
    reel2: [IMG.sai, IMG.seven, IMG.grape, IMG.sai, IMG.sai, IMG.bell, IMG.grape, IMG.sai, IMG.sai, IMG.bar, IMG.grape, IMG.sai, IMG.sai, IMG.bell, IMG.grape, IMG.sai, IMG.sai, IMG.bar, IMG.grape, IMG.sai, IMG.clown],
    reel3: [IMG.grape, IMG.seven, IMG.bar, IMG.bell, IMG.sai, IMG.grape, IMG.clown, IMG.bell, IMG.sai, IMG.grape, IMG.clown, IMG.bell, IMG.sai, IMG.grape, IMG.clown, IMG.bell, IMG.sai, IMG.grape, IMG.clown, IMG.bell, IMG.sai]
};

const FRAME_HEIGHT = 100;
const SPEED = 25;

let isSpinning = [true, true, true];
let positions = [0, 0, 0];

// ページ読み込み完了後に実行するように変更
window.onload = () => {
    setup();
    update();
};

function setup() {
    ['reel1', 'reel2', 'reel3'].forEach((id) => {
        const reel = document.getElementById(id);
        reel.innerHTML = '';
        // 3周分連結（上から下に流すため、配列順を工夫）
        const fullReel = [...REELS_DATA[id], ...REELS_DATA[id], ...REELS_DATA[id]];
        fullReel.forEach(src => {
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
            // 回転ロジック（上から下へ流れる）
            positions[i] = (positions[i] + SPEED) % (21 * FRAME_HEIGHT);
            // 現在位置から全長を引くことで、リールが上から降りてくるようにする
            document.getElementById(id).style.transform = `translateY(${positions[i] - (21 * FRAME_HEIGHT)}px)`;
        }
    });
    requestAnimationFrame(update);
}

function stopReel(i) {
    isSpinning[i] = false;
    // 停止位置の補正
    let currentPos = positions[i];
    let remainder = currentPos % FRAME_HEIGHT;
    positions[i] = (remainder > FRAME_HEIGHT / 2) ? currentPos + (FRAME_HEIGHT - remainder) : currentPos - remainder;
    document.getElementById(['reel1', 'reel2', 'reel3'][i]).style.transform = `translateY(${positions[i] - (21 * FRAME_HEIGHT)}px)`;
}

function restartAll() {
    isSpinning = [true, true, true];
}

// 図柄のファイルパス定義
const IMG = {
    bell:   'images/IMG_3471.jpg',
    seven:  'images/IMG_3468.jpg',
    sai:    'images/IMG_3473.jpg', // さい(チェリー)
    grape:  'images/IMG_3472.jpg',
    bar:    'images/IMG_3470.jpg',
    clown:  'images/IMG_3474.jpg'
};

// IMG_3461.jpg の21番から1番の順序を反映
const REELS_DATA = {
    reel1: [IMG.bell, IMG.seven, IMG.sai, IMG.grape, IMG.sai, IMG.grape, IMG.bar, IMG.sai, IMG.grape, IMG.sai, IMG.grape, IMG.seven, IMG.clown, IMG.grape, IMG.sai, IMG.grape, IMG.sai, IMG.bar, IMG.grape, IMG.sai, IMG.grape],
    reel2: [IMG.sai, IMG.seven, IMG.grape, IMG.sai, IMG.sai, IMG.bell, IMG.grape, IMG.sai, IMG.sai, IMG.bar, IMG.grape, IMG.sai, IMG.sai, IMG.bell, IMG.grape, IMG.sai, IMG.sai, IMG.bar, IMG.grape, IMG.sai, IMG.clown],
    reel3: [IMG.grape, IMG.seven, IMG.bar, IMG.bell, IMG.sai, IMG.grape, IMG.clown, IMG.bell, IMG.sai, IMG.grape, IMG.clown, IMG.bell, IMG.sai, IMG.grape, IMG.clown, IMG.bell, IMG.sai, IMG.grape, IMG.clown, IMG.bell, IMG.sai]
};

const FRAME_HEIGHT = 100;
const SPEED = (21 * FRAME_HEIGHT) / (0.87 * 60);

let isSpinning = [true, true, true];
let positions = [0, 0, 0];

function setup() {
    ['reel1', 'reel2', 'reel3'].forEach((id) => {
        const reel = document.getElementById(id);
        reel.innerHTML = '';
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
            // 下から上に流れる動き（減算ロジック）
            positions[i] = (positions[i] - SPEED + (21 * FRAME_HEIGHT)) % (21 * FRAME_HEIGHT);
            document.getElementById(id).style.transform = `translateY(-${positions[i]}px)`;
        }
    });
    requestAnimationFrame(update);
}

function stopReel(i) {
    isSpinning[i] = false;
    // 停止位置を100px単位に補正
    let remainder = Math.abs(positions[i] % FRAME_HEIGHT);
    if (remainder > FRAME_HEIGHT / 2) {
        positions[i] -= (FRAME_HEIGHT - remainder);
    } else {
        positions[i] += remainder;
    }
    document.getElementById(['reel1', 'reel2', 'reel3'][i]).style.transform = `translateY(-${positions[i]}px)`;
}

function restartAll() {
    isSpinning = [true, true, true];
}

setup();
update();

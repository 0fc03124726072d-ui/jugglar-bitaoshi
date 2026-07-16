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
const SPEED = 25; // 速度調整用

let isSpinning = [true, true, true];
let positions = [0, 0, 0];

function setup() {
    ['reel1', 'reel2', 'reel3'].forEach((id) => {
        const reel = document.getElementById(id);
        reel.innerHTML = '';
        // 画像を縦に並べるため、3セット連結して配置
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
            // 縦方向にのみスライドさせる
            document.getElementById(id).style.transform = `translateY(-${positions[i]}px)`;
        }
    });
    requestAnimationFrame(update);
}

function stopReel(i) {
    isSpinning[i] = false;
    let remainder = positions[i] % FRAME_HEIGHT;
    // ビタ押し用の補正（中央ラインに合わせる）
    positions[i] = (remainder > FRAME_HEIGHT / 2) ? positions[i] + (FRAME_HEIGHT - remainder) : positions[i] - remainder;
    document.getElementById(['reel1', 'reel2', 'reel3'][i]).style.transform = `translateY(-${positions[i]}px)`;
}

function restartAll() { isSpinning = [true, true, true]; }

setup();
update();

// 画像ファイル名定義
const IMG = {
    seven: 'images/IMG_3468.jpg',
    bar:   'images/IMG_3470.jpg',
    bell:  'images/IMG_3471.jpg',
    grape: 'images/IMG_3472.jpg',
    rep:   'images/IMG_3473.jpg',
    clown: 'images/IMG_3474.jpg'
};

// 画像と実機配列図を対応させた21コマのデータ
const REEL_ARRAYS = {
    reel1: [IMG.bell, IMG.seven, IMG.clown, IMG.grape, IMG.clown, IMG.grape, IMG.bar, IMG.rep, IMG.grape, IMG.clown, IMG.grape, IMG.seven, IMG.rep, IMG.grape, IMG.clown, IMG.grape, IMG.rep, IMG.bar, IMG.grape, IMG.clown, IMG.grape],
    reel2: [IMG.clown, IMG.rep, IMG.clown, IMG.grape, IMG.clown, IMG.bell, IMG.grape, IMG.rep, IMG.clown, IMG.bell, IMG.grape, IMG.rep, IMG.bar, IMG.grape, IMG.rep, IMG.clown, IMG.bell, IMG.grape, IMG.rep, IMG.clown, IMG.bar],
    reel3: [IMG.grape, IMG.bell, IMG.clown, IMG.bell, IMG.grape, IMG.clown, IMG.bell, IMG.clown, IMG.grape, IMG.clown, IMG.bell, IMG.grape, IMG.clown, IMG.bell, IMG.clown, IMG.bar, IMG.bar, IMG.bell, IMG.clown, IMG.grape, IMG.clown]
};

const FRAME_HEIGHT = 100; // 1コマの高さ
// 1周0.87秒の設定: (21コマ * 100px) / (0.87秒 * 60フレーム)
const SPEED = (21 * FRAME_HEIGHT) / (0.87 * 60); 

let positions = [0, 0, 0];
let isSpinning = [true, true, true];

// リール初期化
function initReels() {
    ['reel1', 'reel2', 'reel3'].forEach((id) => {
        const el = document.getElementById(id);
        const data = REEL_ARRAYS[id];
        // 3セット生成してループ
        [...data, ...data, ...data].forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.style.height = `${FRAME_HEIGHT}px`;
            el.appendChild(img);
        });
    });
}

// 回転アニメーション
function spin() {
    ['reel1', 'reel2', 'reel3'].forEach((id, i) => {
        if (isSpinning[i]) {
            positions[i] = (positions[i] + SPEED) % (21 * FRAME_HEIGHT);
            document.getElementById(id).style.transform = `translateY(${-positions[i]}px)`;
        }
    });
    requestAnimationFrame(spin);
}

function stopReel(i) { isSpinning[i] = false; }
initReels();
spin();

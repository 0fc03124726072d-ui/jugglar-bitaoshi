// --- 設定エリア ---
// リール配列（ループするように2セット用意）
const REEL_SYMBOLS = [
    'IMG_3468.jpg', 'IMG_3470.jpg', 'IMG_3471.jpg', 'IMG_3472.jpg', 
    'IMG_3473.jpg', 'IMG_3474.jpg'
];
const FRAME_HEIGHT = 100; // 1コマの高さ（適宜調整してください）

// --- ゲームの準備 ---
const reels = [
    document.getElementById('reel1'), 
    document.getElementById('reel2'), 
    document.getElementById('reel3')
];

// リールに画像をセット
reels.forEach(reel => {
    // ループさせるため、2セット分の画像を生成して追加
    [...REEL_SYMBOLS, ...REEL_SYMBOLS].forEach(symbol => {
        const img = document.createElement('img');
        img.src = `images/${symbol}`;
        img.style.height = `${FRAME_HEIGHT}px`;
        reel.appendChild(img);
    });
});

// --- 動きの心臓部（修正版：下方向へ） ---
let animationFrameId;
// 3リールの現在位置を管理
let reelPositions = [0, 0, 0];
// 3リールの個別の速度（実機っぽく微妙にずらす）
let reelSpeeds = [8, 8.5, 7.5]; 
const REEL_HEIGHT = REEL_SYMBOLS.length * FRAME_HEIGHT;

function spin() {
    reels.forEach((reel, i) => {
        // 位置を下にずらしていく（+= にすると下向きになる）
        reelPositions[i] += reelSpeeds[i];
        
        // 1周したら位置をリセットしてループさせる
        if (reelPositions[i] >= REEL_HEIGHT) {
            reelPositions[i] = 0;
        }
        
        // Y軸の移動を適用（translateY(正の値) で下に動く）
        reel.style.transform = `translateY(${reelPositions[i]}px)`;
    });
    // 次のフレームを予約
    animationFrameId = requestAnimationFrame(spin);
}

// 初期回転開始
spin();

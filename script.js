// --- 設定エリア ---
// 左リールの配列（正しい順序）
const REEL_SEQUENCE = [
    'bell', '7', 'sai', 'budou', 'sai', 'bar', 'budou', 'budou', 'sai', '7', 
    'pierrot', 'budou', 'sai', 'budou', 'bar', 'budou', 'sai', 'budou', 'sai', '7', 'bell'
];
// ファイル名定義（※小文字のキーと実際のファイル名を一致させる）
const FILES = {
    'bar': 'IMG_3468.jpg',
    'budou': 'IMG_3470.jpg',
    'sai': 'IMG_3471.jpg',
    '7': 'IMG_3472.jpg',
    'bell': 'IMG_3473.jpg',
    'pierrot': 'IMG_3474.jpg'
};
const FRAME_HEIGHT = 100; // 1コマの高さ
const REEL_HEIGHT = REEL_SEQUENCE.length * FRAME_HEIGHT;
let spinSpeed = 16; // 回転速度（数字を大きくすると速くなる。16程度が実機に近い）

// --- ゲームの準備 ---
const reels = [
    document.getElementById('reel1'), 
    document.getElementById('reel2'), 
    document.getElementById('reel3')
];
let isRunning = [true, true, true]; // 各リールが回転中か
let stopPositions = [0, 0, 0]; // 停止位置

// リールに画像をセット（ループするように2セット分並べる）
reels.forEach(reel => {
    // コンテナの高さを設定
    reel.style.height = `${REEL_HEIGHT * 2}px`;
    
    // 2セット分の画像を生成して追加
    [...REEL_SEQUENCE, ...REEL_SEQUENCE].forEach(key => {
        const img = document.createElement('img');
        img.src = `images/${FILES[key]}`;
        img.style.height = `${FRAME_HEIGHT}px`;
        reel.appendChild(img);
    });
    // 初期位置をランダムに設定
    stopPositions[reels.indexOf(reel)] = Math.floor(Math.random() * REEL_SEQUENCE.length) * FRAME_HEIGHT;
    reel.style.transform = `translateY(-${stopPositions[reels.indexOf(reel)]}px)`;
});

// --- 動きの心臓部 ---
let startTime = Date.now();
let animationFrameId;

function spin() {
    reels.forEach((reel, i) => {
        if (isRunning[i]) {
            // 回転中の処理：時間経過に基づいて位置を計算
            let elapsed = Date.now() - startTime;
            // 1周 = REEL_HEIGHT。速度を掛けて下にずらす
            let currentY = (elapsed * spinSpeed) % REEL_HEIGHT;
            reel.style.transform = `translateY(-${currentY}px)`;
            stopPositions[i] = currentY; // 停止用に現在位置を常に保存
        }
    });
    animationFrameId = requestAnimationFrame(spin);
}

// --- ボタン操作 ---
function stopReel(reelIndex) {
    isRunning[reelIndex] = false; // 指定されたリールだけ止める
    // 止めた瞬間の位置で固定
    reels[reelIndex].style.transform = `translateY(-${stopPositions[reelIndex]}px)`;
    
    // 全て止まったか判定
    if(!isRunning.some(r => r)) {
        cancelAnimationFrame(animationFrameId);
    }
}

function resetReels() {
    isRunning = [true, true, true];
    startTime = Date.now();
    reels.forEach((reel, i) => {
        stopPositions[i] = Math.floor(Math.random() * REEL_SEQUENCE.length) * FRAME_HEIGHT;
    });
    requestAnimationFrame(spin);
}

// 初期回転開始
spin();

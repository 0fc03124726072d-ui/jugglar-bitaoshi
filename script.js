// 【最終版】画像の順番（21番〜1番）を忠実に反映
const REELS_DATA = {
    // 左リール: 21(ベル), 20(7), 19(さい), 18(ぶどう), 17(さい), 16(ぶどう), 15(BAR), 14(チェリー), 13(ぶどう), 12(さい), 11(ぶどう), 10(7), 9(ぴえろ), 8(ぶどう), 7(さい), 6(ぶどう), 5(チェリー), 4(BAR), 3(ぶどう), 2(さい), 1(ぶどう)
    reel1: ['images/IMG_3471.jpg', 'images/IMG_3468.jpg', 'images/IMG_3473.jpg', 'images/IMG_3472.jpg', 'images/IMG_3473.jpg', 'images/IMG_3472.jpg', 'images/IMG_3470.jpg', 'images/IMG_3473.jpg', 'images/IMG_3472.jpg', 'images/IMG_3473.jpg', 'images/IMG_3472.jpg', 'images/IMG_3468.jpg', 'images/IMG_3474.jpg', 'images/IMG_3472.jpg', 'images/IMG_3473.jpg', 'images/IMG_3472.jpg', 'images/IMG_3473.jpg', 'images/IMG_3470.jpg', 'images/IMG_3472.jpg', 'images/IMG_3473.jpg', 'images/IMG_3472.jpg'],
    
    // 中リール: 21(さい), 20(7), 19(ぶどう), 18(チェリー), 17(さい), 16(ベル), 15(ぶどう), 14(チェリー), 13(さい), 12(BAR), 11(ぶどう), 10(チェリー), 9(さい), 8(ベル), 7(ぶどう), 6(チェリー), 5(さい), 4(BAR), 3(ぶどう), 2(チェリー), 1(ぴえろ)
    reel2: ['images/IMG_3473.jpg', 'images/IMG_3468.jpg', 'images/IMG_3472.jpg', 'images/IMG_3473.jpg', 'images/IMG_3473.jpg', 'images/IMG_3471.jpg', 'images/IMG_3472.jpg', 'images/IMG_3473.jpg', 'images/IMG_3473.jpg', 'images/IMG_3470.jpg', 'images/IMG_3472.jpg', 'images/IMG_3473.jpg', 'images/IMG_3473.jpg', 'images/IMG_3471.jpg', 'images/IMG_3472.jpg', 'images/IMG_3473.jpg', 'images/IMG_3473.jpg', 'images/IMG_3470.jpg', 'images/IMG_3472.jpg', 'images/IMG_3473.jpg', 'images/IMG_3474.jpg'],
    
    // 右リール: 21(ぶどう), 20(7), 19(BAR), 18(ベル), 17(さい), 16(ぶどう), 15(ぴえろ), 14(ベル), 13(さい), 12(ぶどう), 11(ぴえろ), 10(ベル), 9(さい), 8(ぶどう), 7(ぴえろ), 6(ベル), 5(さい), 4(ぶどう), 3(ぴえろ), 2(ベル), 1(さい)
    reel3: ['images/IMG_3472.jpg', 'images/IMG_3468.jpg', 'images/IMG_3470.jpg', 'images/IMG_3471.jpg', 'images/IMG_3473.jpg', 'images/IMG_3472.jpg', 'images/IMG_3474.jpg', 'images/IMG_3471.jpg', 'images/IMG_3473.jpg', 'images/IMG_3472.jpg', 'images/IMG_3474.jpg', 'images/IMG_3471.jpg', 'images/IMG_3473.jpg', 'images/IMG_3472.jpg', 'images/IMG_3474.jpg', 'images/IMG_3471.jpg', 'images/IMG_3473.jpg', 'images/IMG_3472.jpg', 'images/IMG_3474.jpg', 'images/IMG_3471.jpg', 'images/IMG_3473.jpg']
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
            // 下から上に流れる動き（加算して上に移動）
            positions[i] = (positions[i] + SPEED) % (21 * FRAME_HEIGHT);
            document.getElementById(id).style.transform = `translateY(-${positions[i]}px)`;
        }
    });
    requestAnimationFrame(update);
}

function stopReel(i) {
    isSpinning[i] = false;
    let remainder = positions[i] % FRAME_HEIGHT;
    if (remainder > FRAME_HEIGHT / 2) {
        positions[i] += (FRAME_HEIGHT - remainder);
    } else {
        positions[i] -= remainder;
    }
    document.getElementById(['reel1', 'reel2', 'reel3'][i]).style.transform = `translateY(-${positions[i]}px)`;
}

function restartAll() { isSpinning = [true, true, true]; }

setup();
update();

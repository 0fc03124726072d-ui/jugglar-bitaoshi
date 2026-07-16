const images = ['bar', 'budou', 'sai', '7', 'bell', 'pierrot'];
const reels = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];

// 画像を生成してリールにセット
reels.forEach(reel => {
    for(let i=0; i<30; i++) {
        const img = document.createElement('img');
        img.src = `images/IMG_34${68 + (i % 6)}.jpg`; // 画像番号の規則に合わせて調整してください
        reel.appendChild(img);
    }
});

// 回転させる関数
function spin() {
    reels.forEach(reel => {
        reel.style.transform = `translateY(-${(Date.now() / 10) % 1000}px)`;
    });
    requestAnimationFrame(spin);
}
spin();

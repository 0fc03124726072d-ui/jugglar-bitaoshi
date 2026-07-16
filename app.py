import streamlit as st
import time

# 1. 画像ファイル名定義
FILES = {
    "bar": "IMG_3468.jpg",
    "budou": "IMG_3470.jpg",
    "sai": "IMG_3471.jpg",
    "7": "IMG_3472.jpg",
    "bell": "IMG_3473.jpg",
    "pierrot": "IMG_3474.jpg"
}

# 2. 3リールそれぞれの配列 (実機配列)
REELS = {
    "left": ["bell", "7", "sai", "budou", "sai", "bar", "budou", "budou", "sai", "7", "pierrot", "budou", "sai", "budou", "bar", "budou", "sai", "budou", "sai", "7", "bell"],
    "center": ["budou", "sai", "budou", "7", "budou", "sai", "budou", "7", "pierrot", "bar", "budou", "sai", "budou", "sai", "budou", "bar", "sai", "budou", "7", "bell", "bell"],
    "right": ["bell", "7", "sai", "budou", "sai", "bar", "budou", "budou", "sai", "7", "pierrot", "budou", "sai", "budou", "bar", "budou", "sai", "budou", "sai", "7", "bell"]
}

st.set_page_config(page_title="ジャグラー練習機", layout="wide")

# --- スマホ対応・CSS設定（ここが重要！） ---
st.markdown("""
    <style>
    /* タイトルを少し小さく */
    h1 { font-size: 1.5rem; text-align: center; margin-bottom: 10px; }
    
    /* メインのコンテナの余白を詰める */
    .block-container { padding-top: 1rem; padding-bottom: 1rem; }
    
    /* 強制的に3リールを横並びにするフレックスボックス */
    .reel-container {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 5px; /* リール間の隙間 */
        width: 100%;
        max-width: 400px; /* スマホ画面の最大幅に合わせて調整 */
        margin: 0 auto;
    }
    
    /* 各リールのスタイル */
    .reel-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px; /* 絵柄間の隙間 */
    }
    
    /* 画像サイズを大きく指定（幅100%で可変） */
    .reel-image {
        width: 100%;
        height: auto;
        display: block;
    }
    
    /* 停止ボタンを大きく、押しやすく */
    .stButton > button {
        width: 100%;
        height: 40px;
        font-size: 1rem;
        margin-top: 5px;
    }
    
    /* Streamlitのデフォルトの縦並び設定を無効化 */
    [data-testid="column"] { width: auto !important; flex: 1 !important; }
    </style>
""", unsafe_allow_html=True)
# ---------------------------------------

st.title("🎰 ジャグラービタ押し練習機")

if 'running' not in st.session_state:
    st.session_state.running = [True, True, True]
    st.session_state.pos = [0, 0, 0]
    st.session_state.start_time = time.time()

# 経過時間の取得（動きの滑らかさの基準）
elapsed = time.time() - st.session_state.start_time

# --- HTML/CSSを使ったカスタムレイアウトの描画 ---
st.markdown('<div class="reel-container">', unsafe_allow_html=True)

reel_keys = ["left", "center", "right"]

for i in range(3):
    with st.container():
        st.markdown('<div class="reel-column">', unsafe_allow_html=True)
        
        # 回転処理（軽量化のため計算式を簡略化）
        if st.session_state.running[i]:
            st.session_state.pos[i] = int((elapsed / 0.78) * 21) % 21
        
        p = st.session_state.pos[i]
        reel_data = REELS[reel_keys[i]]
        
        # 画像を表示 (上・中・下)
        # カスタムCSSクラスを適用して大きく表示
        st.image(f"images/{FILES[reel_data[(p+1)%21]]}", output_format="JPG", css_class="reel-image")
        st.image(f"images/{FILES[reel_data[p]]}", output_format="JPG", css_class="reel-image")
        st.image(f"images/{FILES[reel_data[(p-1)%21]]}", output_format="JPG", css_class="reel-image")
        
        # 停止ボタン
        if st.session_state.running[i]:
            if st.button(f"{reel_keys[i].upper()} Stop", key=f"stop_{i}"):
                st.session_state.running[i] = False
                st.rerun()
                
        st.markdown('</div>', unsafe_allow_html=True) # reel-column

st.markdown('</div>', unsafe_allow_html=True) # reel-container

# 再始動ボタン
if not any(st.session_state.running):
    st.markdown("<br>", unsafe_allow_html=True)
    if st.button("全リール再始動"):
        st.session_state.running = [True, True, True]
        st.session_state.start_time = time.time()
        st.rerun()
else:
    # 回転ループ（処理を軽くしてカクつきを抑制）
    time.sleep(0.015)
    st.rerun()

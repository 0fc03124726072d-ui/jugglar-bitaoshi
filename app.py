import streamlit as st
import time
import base64

# 画像をあらかじめ読み込んでキャッシュする関数
@st.cache_data
def get_image_base64(path):
    with open(path, "rb") as f:
        data = f.read()
    return base64.b64encode(data).decode()

# 画像ファイル名定義
FILES = {
    "bar": "images/IMG_3468.jpg",
    "budou": "images/IMG_3470.jpg",
    "sai": "images/IMG_3471.jpg",
    "7": "images/IMG_3472.jpg",
    "bell": "images/IMG_3473.jpg",
    "pierrot": "IMG_3474.jpg"
}

REELS = {
    "left": ["bell", "7", "sai", "budou", "sai", "bar", "budou", "budou", "sai", "7", "pierrot", "budou", "sai", "budou", "bar", "budou", "sai", "budou", "sai", "7", "bell"],
    "center": ["budou", "sai", "budou", "7", "budou", "sai", "budou", "7", "pierrot", "bar", "budou", "sai", "budou", "sai", "budou", "bar", "sai", "budou", "7", "bell", "bell"],
    "right": ["bell", "7", "sai", "budou", "sai", "bar", "budou", "budou", "sai", "7", "pierrot", "budou", "sai", "budou", "bar", "budou", "sai", "budou", "sai", "7", "bell"]
}

st.set_page_config(layout="wide")

# CSSで強制的に横並び
st.markdown("""
    <style>
    .reel-wrapper { display: flex; justify-content: center; gap: 5px; }
    .reel-col { flex: 1; max-width: 100px; }
    img { width: 100%; height: auto; }
    </style>
""", unsafe_allow_html=True)

if 'running' not in st.session_state:
    st.session_state.running = [True, True, True]
    st.session_state.start_time = time.time()

elapsed = time.time() - st.session_state.start_time
st.markdown('<div class="reel-wrapper">', unsafe_allow_html=True)

cols = st.columns(3)
reel_keys = ["left", "center", "right"]

for i, col in enumerate(cols):
    with col:
        # 位置計算
        pos = int(((time.time() - st.session_state.start_time) / 0.78) * 21) % 21
        
        # 軽量化のため、画像パスを直接表示
        reel_data = REELS[reel_keys[i]]
        st.image(FILES[reel_data[(pos+1)%21]], width=80)
        st.image(FILES[reel_data[pos]], width=80)
        st.image(FILES[reel_data[(pos-1)%21]], width=80)
        
        if st.session_state.running[i]:
            if st.button("停止", key=f"stop_{i}"):
                st.session_state.running[i] = False

st.markdown('</div>', unsafe_allow_html=True)

# 0.01秒ごとに更新（スマホでも耐えられる最小限の更新）
time.sleep(0.01)
st.rerun()

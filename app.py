import streamlit as st
import time

# 1. GitHubのファイル名と完全に一致させる（ここが重要！）
FILES = {
    "bar": "IMG_3468.jpg",
    "budou": "IMG_3470.jpg",
    "sai": "IMG_3471.jpg",
    "7": "IMG_3472.jpg",
    "bell": "IMG_3473.jpg",
    "pierrot": "IMG_3474.jpg"
}

# 2. 配列（チェリーが含まれていなかったので一旦budouで代用しています）
REELS = {
    "left": ["bell", "7", "sai", "budou", "sai", "bar", "budou", "budou", "sai", "7", "pierrot", "budou", "sai", "budou", "bar", "budou", "sai", "budou", "sai", "7", "bell"],
    "center": ["budou", "sai", "budou", "7", "budou", "sai", "budou", "7", "pierrot", "bar", "budou", "sai", "budou", "sai", "budou", "bar", "sai", "budou", "7", "bell", "bell"],
    "right": ["bell", "7", "sai", "budou", "sai", "bar", "budou", "budou", "sai", "7", "pierrot", "budou", "sai", "budou", "bar", "budou", "sai", "budou", "sai", "7", "bell"]
}

st.set_page_config(layout="wide")
st.title("🎰 ジャグラービタ押し練習機")

if 'running' not in st.session_state:
    st.session_state.running = [True, True, True]
    st.session_state.pos = [0, 0, 0]
    st.session_state.start_time = time.time()

# 0.78秒で1周 (時間ベースの制御)
elapsed = time.time() - st.session_state.start_time

cols = st.columns(3)
reel_keys = ["left", "center", "right"]

for i, col in enumerate(cols):
    with col:
        if st.session_state.running[i]:
            st.session_state.pos[i] = int((elapsed / 0.78) * 21) % 21
        
        p = st.session_state.pos[i]
        reel_data = REELS[reel_keys[i]]
        
        # フォルダ名「画像」とファイル名で画像を読み込む
        st.image(f"画像/{FILES[reel_data[(p+1)%21]]}", width=100)
        st.image(f"画像/{FILES[reel_data[p]]}", width=100)
        st.image(f"画像/{FILES[reel_data[(p-1)%21]]}", width=100)
        
        if st.session_state.running[i]:
            if st.button(f"{reel_keys[i].upper()}停止", key=f"stop_{i}"):
                st.session_state.running[i] = False
                st.rerun()

if any(st.session_state.running):
    time.sleep(0.03)
    st.rerun()

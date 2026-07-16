import streamlit as st
import time

# 1. ここで「images/」を忘れずに含めます
FILES = {
    "bar": "images/IMG_3468.jpg",
    "budou": "images/IMG_3470.jpg",
    "sai": "images/IMG_3471.jpg",
    "7": "images/IMG_3472.jpg",
    "bell": "images/IMG_3473.jpg",
    "pierrot": "images/IMG_3474.jpg"
}

# 2. 配列（変更なし）
REELS = {
    "left": ["bell", "7", "sai", "budou", "sai", "bar", "budou", "budou", "sai", "7", "pierrot", "budou", "sai", "budou", "bar", "budou", "sai", "budou", "sai", "7", "bell"],
    "center": ["budou", "sai", "budou", "7", "budou", "sai", "budou", "7", "pierrot", "bar", "budou", "sai", "budou", "sai", "budou", "bar", "sai", "budou", "7", "bell", "bell"],
    "right": ["bell", "7", "sai", "budou", "sai", "bar", "budou", "budou", "sai", "7", "pierrot", "budou", "sai", "budou", "bar", "budou", "sai", "budou", "sai", "7", "bell"]
}

st.set_page_config(layout="wide")
st.title("🎰 ジャグラービタ押し練習機")

if 'running' not in st.session_state:
    st.session_state.running = [True, True, True]
    st.session_state.start_time = time.time()

# 3. カクつき対策：表示更新を減らして描画を安定させる
elapsed = time.time() - st.session_state.start_time
cols = st.columns(3)
reel_keys = ["left", "center", "right"]

for i, col in enumerate(cols):
    with col:
        # 回転計算
        pos = int((elapsed / 0.78) * 21) % 21
        reel_data = REELS[reel_keys[i]]
        
        # 3コマ表示
        st.image(FILES[reel_data[(pos+1)%21]], width=80)
        st.image(FILES[reel_data[pos]], width=80)
        st.image(FILES[reel_data[(pos-1)%21]], width=80)
        
        if st.session_state.running[i]:
            if st.button("停止", key=f"stop_{i}"):
                st.session_state.running[i] = False
                st.rerun()

# 更新タイミングを少しだけ緩やかに（これでカクつきを減らします）
time.sleep(0.05)
st.rerun()

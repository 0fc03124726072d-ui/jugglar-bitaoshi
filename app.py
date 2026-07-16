import streamlit as st
import time

# 1. 画像ファイル名とシンボルの紐付け
# GitHubにあるファイル名と一致させています
FILES = {
    "bar": "IMG_3468.jpg",
    "budou": "IMG_3470.jpg",
    "sai": "IMG_3471.jpg",
    "7": "IMG_3472.jpg",
    "bell": "IMG_3473.jpg",
    "pierrot": "IMG_3474.jpg"
}

# 2. 3リールそれぞれの配列 (左・中・右)
# 実機配列を忠実に再現します
REELS = {
    "left": ["bell", "7", "sai", "budou", "sai", "bar", "budou", "budou", "sai", "7", "pierrot", "budou", "sai", "budou", "bar", "budou", "sai", "budou", "sai", "7", "bell"],
    "center": ["budou", "sai", "budou", "7", "budou", "sai", "budou", "7", "pierrot", "bar", "budou", "sai", "budou", "sai", "budou", "bar", "sai", "budou", "7", "bell", "bell"],
    "right": ["bell", "7", "sai", "budou", "sai", "bar", "budou", "budou", "sai", "7", "pierrot", "budou", "sai", "budou", "bar", "budou", "sai", "budou", "sai", "7", "bell"]
}

st.set_page_config(layout="wide")
st.title("🎰 ジャグラービタ押し練習機")

# セッション状態の管理
if 'running' not in st.session_state:
    st.session_state.running = [True, True, True]
    st.session_state.pos = [0, 0, 0]
    st.session_state.start_time = time.time()

elapsed = time.time() - st.session_state.start_time
cols = st.columns(3)
reel_keys = ["left", "center", "right"]

for i, col in enumerate(cols):
    with col:
        # 回転速度：0.78秒で1周
        if st.session_state.running[i]:
            st.session_state.pos[i] = int((elapsed / 0.78) * 21) % 21
        
        p = st.session_state.pos[i]
        reel_data = REELS[reel_keys[i]]
        
        # imagesフォルダから画像を読み込む
        try:
            st.image(f"images/{FILES[reel_data[(p+1)%21]]}", width=100)
            st.image(f"images/{FILES[reel_data[p]]}", width=100)
            st.image(f"images/{FILES[reel_data[(p-1)%21]]}", width=100)
        except KeyError:
            st.error("画像ファイル名が一致しません")
        
        if st.session_state.running[i]:
            if st.button(f"{reel_keys[i].upper()} 停止", key=f"stop_{i}"):
                st.session_state.running[i] = False
                st.rerun()

# 再始動ボタン
if not any(st.session_state.running):
    if st.button("全リール再始動"):
        st.session_state.running = [True, True, True]
        st.session_state.start_time = time.time()
        st.rerun()
else:
    time.sleep(0.03)
    st.rerun()

import streamlit as st
import time

# 画像ファイル名定義
FILES = {
    "bar": "IMG_3468.jpg",
    "budou": "IMG_3470.jpg",
    "sai": "IMG_3471.jpg",
    "7": "IMG_3472.jpg",
    "bell": "IMG_3473.jpg",
    "pierrot": "IMG_3474.jpg"
}

# 3リールそれぞれの配列
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

# 経過時間の取得
elapsed = time.time() - st.session_state.start_time

# 横並びレイアウトを強制
cols = st.columns(3)
reel_keys = ["left", "center", "right"]

for i, col in enumerate(cols):
    with col:
        # 回転位置の計算（カクつき軽減のため直接計算）
        if st.session_state.running[i]:
            st.session_state.pos[i] = int((elapsed / 0.78) * 21) % 21
        
        p = st.session_state.pos[i]
        reel_data = REELS[reel_keys[i]]
        
        # 画像を表示
        st.image(f"images/{FILES[reel_data[(p+1)%21]]}", width=80)
        st.image(f"images/{FILES[reel_data[p]]}", width=80)
        st.image(f"images/{FILES[reel_data[(p-1)%21]]}", width=80)
        
        # 停止ボタン
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
    # 処理を軽くしてカクつきを抑える
    time.sleep(0.01)
    st.rerun()

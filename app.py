import streamlit as st
import time

# 1. ここでGitHubのファイル名とシンボルを正確に紐付けます
FILES = {
    "bar": "IMG_3468.jpg",
    "budou": "IMG_3470.jpg",
    "sai": "IMG_3471.jpg",
    "7": "IMG_3472.jpg",
    "bell": "IMG_3473.jpg",
    "pierrot": "IMG_3474.jpg",
    "cherry": "IMG_3468.jpg" # 必要に応じて修正
}

# 2. 3リールそれぞれの配列（お手元の画像に合わせて並び替えてください）
REELS = {
    "left": ["bell", "7", "sai", "budou", "sai", "bar", "cherry", "budou", "sai", "7", "pierrot", "budou", "sai", "cherry", "bar", "budou", "sai", "budou", "sai", "7", "bell"],
    "center": ["budou", "sai", "budou", "7", "cherry", "sai", "budou", "7", "pierrot", "bar", "budou", "sai", "cherry", "sai", "budou", "bar", "sai", "budou", "7", "bell", "bell"],
    "right": ["bell", "7", "sai", "budou", "sai", "bar", "cherry", "budou", "sai", "7", "pierrot", "budou", "sai", "cherry", "bar", "budou", "sai", "budou", "sai", "7", "bell"]
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
        # 回転中の位置更新
        if st.session_state.running[i]:
            st.session_state.pos[i] = int(((elapsed + (i * 0.2)) / 0.78) * 21) % 21
        
        # 3コマ表示
        p = st.session_state.pos[i]
        reel_data = REELS[reel_keys[i]]
        
        # ファイル名をFILES辞書から参照
        st.image(f"画像/{FILES[reel_data[(p+1)%21]]}", width=100)
        st.image(f"画像/{FILES[reel_data[p]]}", width=100)
        st.image(f"画像/{FILES[reel_data[(p-1)%21]]}", width=100)
        
        if st.session_state.running[i]:
            if st.button(f"{reel_keys[i].upper()}停止", key=f"stop_{i}"):
                st.session_state.running[i] = False
                st.rerun()
              
# 回転処理の部分を以下のように書き換えてください
        if st.session_state.running[i]:
            # 現在時刻から経過時間を算出して、位置を決定する
            # これにより処理の遅延が起きても、回転位置がずれないようになります
            elapsed_total = time.time() - st.session_state.start_time
            st.session_state.pos[i] = int((elapsed_total / 0.78) * 21) % 21

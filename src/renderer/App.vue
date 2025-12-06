<template>
  <div class="app">
    <h1>GlassBox Player</h1>
    <div class="controls">
      <input type="file" @change="handleFileSelect" accept=".gbx" />
      <button @click="playTestClip">播放测试片段</button>
    </div>
    <div class="video-container">
      <video ref="videoRef" class="transparent-video" autoplay loop muted playsinline></video>
    </div>
    <div class="status">
      <p>当前状态: {{ status }}</p>
      <p>当前片段: {{ currentClipId }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const videoRef = ref<HTMLVideoElement | null>(null)
const status = ref('未加载GBX文件')
const currentClipId = ref('')

// 处理文件选择
const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    loadGbxFile(file)
  }
}

// 加载GBX文件
const loadGbxFile = async (file: File) => {
  status.value = '正在加载GBX文件...'
  try {
    // 这里将在后续实现GBX文件加载逻辑
    status.value = 'GBX文件加载成功'
  } catch (error) {
    status.value = `加载失败: ${error}`
  }
}

// 播放测试片段
const playTestClip = () => {
  if (videoRef.value) {
    currentClipId.value = 'test-clip'
    status.value = '正在播放测试片段'
    // 这里将在后续实现实际的片段播放逻辑
  }
}

// 监听窗口事件
onMounted(() => {
  // 注册测试快捷键
  if (window.glassbox) {
    window.glassbox.registerShortcut('Ctrl+T', 'test-clip')
  }
})

onUnmounted(() => {
  // 清理资源
})
</script>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: white;
  font-family: Arial, sans-serif;
}

.controls {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.video-container {
  margin: 20px 0;
  position: relative;
}

.transparent-video {
  width: 640px;
  height: 360px;
  background-color: transparent;
}

.status {
  margin-top: 20px;
  text-align: center;
}
</style>
import { contextBridge, ipcRenderer } from 'electron'

// 暴露API给渲染进程
contextBridge.exposeInMainWorld('glassbox', {
  // 播放视频片段
  playClip: (clipId: string) => ipcRenderer.invoke('play-clip', clipId),
  
  // 监听片段播放完成事件
  onClipPlayed: (callback: (data: { clipId: string; status: string }) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, data: { clipId: string; status: string }) => callback(data)
    ipcRenderer.on('clip-played', listener)
    return () => ipcRenderer.removeListener('clip-played', listener)
  },
  
  // 加载GBX文件
  loadGbxFile: (filePath: string) => ipcRenderer.invoke('load-gbx-file', filePath),
  
  // 注册快捷键
  registerShortcut: (key: string, clipId: string) => ipcRenderer.invoke('register-shortcut', key, clipId),
})

// 导出类型定义
export type GlassBoxApi = typeof window.glassbox
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

// 创建窗口函数
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: true
    }
  })

  // 加载页面
  if (process.env.VITE_DEV_SERVER_URL) {
    // 开发环境：加载Vite开发服务器
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    // 生产环境：加载打包后的HTML文件
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

// 应用就绪后创建窗口
app.whenReady().then(() => {
  createWindow()

  // macOS：当所有窗口关闭后，点击Dock图标重新创建窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 所有窗口关闭后退出应用（除了macOS）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 监听渲染进程消息
ipcMain.on('play-clip', (event, clipId) => {
  console.log('播放片段:', clipId)
  // 这里将在后续实现播放逻辑
  event.reply('clip-played', { clipId, status: 'success' })
})

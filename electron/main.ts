import { app, BrowserWindow, ipcMain, net } from 'electron'
import path from 'path'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'



let mainWindow: BrowserWindow | null = null

async function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true
    },
    titleBarStyle: 'hidden'
  })

  // 开发模式配置
  if (process.env.NODE_ENV === 'development') {
    // 安装React开发者工具
    try {
      await installExtension(REACT_DEVELOPER_TOOLS)
      console.log('React Developer Tools installed')
    } catch (err) {
      console.error('DevTools extension install error:', err)
    }

    // 加载Vite开发服务器
    await mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    // 生产模式加载打包文件
    await mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // 窗口关闭事件处理
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// 注册IPC处理器
ipcMain.handle('fetch-weather', async (event, city: string) => {
  try {
    const API_KEY = process.env.WEATHER_API_KEY
    if (!API_KEY) throw new Error('Weather API key not configured')

    const response = await net.fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    return await response.json()
  } catch (error) {
    console.error('Weather API error:', error)
    return { error: (error as Error).message }
  }
})

// 应用生命周期管理
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 处理所有窗口关闭
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 热重载配置 (仅开发环境)
if (process.env.NODE_ENV === 'development') {
  require('electron-reloader')(module, {
    debug: true,
    watchRenderer: true
  })
}
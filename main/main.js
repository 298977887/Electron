const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    title: "我的第一个Electron应用",  // 设置应用的标题
    autoHideMenuBar: true, // 自动隐藏菜单栏
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')  // 确保 preload.js 路径正确
    }
  })

  // 修改加载页面的路径，指向 renderer 文件夹下的 index.html
  win.loadFile(path.join(__dirname, '../renderer/index.html'))
  //win.loadURL('http://www.baidu.com') // 加载页面

  // 移除菜单栏
  //win.removeMenu()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

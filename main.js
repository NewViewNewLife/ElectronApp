// 任何 Electron 应用程序的入口都是 main 文件。 这个文件控制了主进程，它运行在一个完整的Node.js环境中，负责控制您应用的生命周期，显示原生界面，执行特殊操作并管理渲染器进程(稍后详细介绍)。
// 执行期间，Electron 将依据应用中 package.json配置下main字段中配置的值查找此文件，您应该已在应用脚手架步骤中配置。
// 要初始化这个main文件，需要在您项目的根目录下创建一个名为main.js的空文件


// 现在您有了一个页面，将它加载进应用窗口中。 要做到这一点，你需要 两个Electron模块：
// · app 模块，它控制应用程序的事件生命周期。
// · BrowserWindow 模块，它创建和管理应用程序 窗口。
// 因为主进程运行了Node.js, 你能够在main.js使用 CommonJS 模块的 import 方式 导入这些模块
// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')

const path = require('node:path')

const createWindow = () => {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 加载 index.html
  mainWindow.loadFile('index.html')

  // 打开开发工具
  // mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
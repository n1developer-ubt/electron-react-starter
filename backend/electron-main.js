/*eslint global-require: */
// global process

const { ipcMain } = require("electron")
const electron = require("electron")
const app = electron.app
const menu = electron.Menu
const BrowserWindow = electron.BrowserWindow
const shell = electron.shell
const path = require("path")

let mainWindow

function createWindow() {
   // let iconPath = path.join(__dirname, "/../build/icon.png");

   mainWindow = new BrowserWindow({
      icon: path.join(__dirname, "../client/build/icon_512.ico"),
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         webSecurity: false,
         preload: path.join(__dirname, "preload.js"),
         enableRemoteModule: true,
      },
      show: false,
      paintWhenInitiallyHidden: true,
   })

   mainWindow.maximize()

   if (process.env.ELECTRON_START_URL) {
      mainWindow.loadURL(process.env.ELECTRON_START_URL)
   } else {
      mainWindow.loadFile(path.join(__dirname, "../client/dist/index.html"))
   }

   mainWindow.webContents.openDevTools()
   const isMac = process.platform === "darwin"
   mainWindow.on("closed", function () {
      mainWindow = null
   })

   const m = menu.buildFromTemplate([
      {
         label: "CSV Editor",
         submenu: [{ role: "quit" }],
      },
      {
         label: "Edit",
         submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
            ...(isMac
               ? [
                    { role: "pasteAndMatchStyle" },
                    { role: "delete" },
                    { role: "selectAll" },
                    { type: "separator" },
                    {
                       label: "Speech",
                       submenu: [
                          { role: "startSpeaking" },
                          { role: "stopSpeaking" },
                       ],
                    },
                 ]
               : [
                    { role: "delete" },
                    { type: "separator" },
                    { role: "selectAll" },
                 ]),
         ],
      },
   ])

   menu.setApplicationMenu(process.platform === "darwin" ? m : null)

   mainWindow.webContents.on("new-window", function (event, url) {
      event.preventDefault()
      shell.openExternal(url)
   })

   mainWindow.webContents.once("dom-ready", async () => {
      mainWindow.show()
   })
}

app.on("ready", () => {
   createWindow()
})

app.on("window-all-closed", function () {
   if (process.platform !== "darwin") {
      app.quit()
   }
})

app.on("activate", function () {
   if (mainWindow === null) {
      createWindow()
   }
})

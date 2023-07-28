const { BrowserWindow, app, ipcMain, Notification } = require("electron")
const path = require("path")

let window

const createWindow = () => {
	window = new BrowserWindow({
		width: 1000,
		height: 800,
		minHeight: 400,
		minWidth: 800,
		backgroundColor: "black",
		webPreferences: {
			nodeIntegration: false,
			worldSafeExecuteJavaScript: true,
			contextIsolation: true,

			preload: path.join(__dirname, "preload.js"),
		},
	})

	window.loadFile(path.join(__dirname, "../resources/index.html"))
}

ipcMain.on("notify", (_, message) => {
	new Notification({ title: "Test Notifiation", body: message }).show()
})

app.whenReady().then(() => {
	createWindow()
})

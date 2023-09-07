const { BrowserWindow, app, ipcMain, Notification } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let window;

const createWindow = () => {
	window = new BrowserWindow({
		width: 1000,
		height: 800,
		minHeight: 400,
		minWidth: 800,
		// backgroundColor: "#1E1E1E",
		webPreferences: {
			nodeIntegration: false,
			worldSafeExecuteJavaScript: true,
			contextIsolation: true,

			preload: path.join(__dirname, 'preload.js'),
		},
	});
	window.loadFile(path.join(__dirname, '../../dist/index.html'));
};

if (isDev) {
	let electron_path = path.join(__dirname, '../../node_modules', '.bin', 'electron');
	require('electron-reload')(__dirname, {
		electron: electron_path,
	});
}

ipcMain.on('notify', (_, message) => {
	new Notification({ title: 'Test Notifiation', body: message }).show();
});

const onActivityListener = () => {
	app.on('resume', () => {
		console.log('Activity');
	});
};

app.whenReady().then(() => {
	createWindow();
	onActivityListener();
});

const { BrowserWindow, app, ipcMain, Notification } = require('electron');
const screenshot = require('electron-screenshot-app');
const isDev = require('electron-is-dev');
const path = require('path');
const fs = require('fs');
const os = require('os');
const hostname = os.hostname;

let window;
let isTransparent = false;
let screnshotWindow;

const createWindow = () => {
	window = new BrowserWindow({
		width: 1000,
		height: 800,
		minHeight: 400,
		minWidth: 800,
		transparent: false,

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

ipcMain.on('notify', (_, { title, body }) => {
	new Notification({ title, body }).show();
});

ipcMain.on('title', (_, title) => {
	window.setTitle(title);
});

ipcMain.handle('hostname', async (_) => {
	return `${hostname}`;
});

ipcMain.on('capture-screenshot', async (_, bounds) => {
	screnshotWindow.setOpacity(0);

	try {
		const imageBuffer = await screenshot(bounds);
		fs.writeFile('captured-screenshot.png', imageBuffer, (err) => {
			if (err) {
				event.reply('capture-error', err.message);
			} else {
				event.reply('captured-screen', 'captured-screenshot.png');
			}
		});
	} catch (error) {}

	console.log('~> impactos');

	screnshotWindow.setOpacity(1);
});

ipcMain.on('capture-screenshot-mode', (_, mode) => {
	//isTransparent = mode;
	//window.setOpacity(isTransparent ? 0.3 : 1);
	//    window.webContents.executeJavaScript(`document.body.style.background = '${mode ? 'transparent' : 'white'}';`);
	//window.setVibrancy(mode ? 'ultra-dark' : ''); // Pode usar 'dark', 'medium-light', 'ultra-dark' ou '' para opaco

	//mainWindow.setIgnoreMouseEvents(!isTransparent);
	if (mode) {
		screnshotWindow = new BrowserWindow({
			width: 800,
			height: 600,
			transparent: true,
			frame: false,
			autoHideMenuBar: true,
			webPreferences: window.webPreferences,
		});
		screnshotWindow.maximize();
		screnshotWindow.loadFile(path.join(__dirname, '../../dist/screenshot.html'));
		window.hide();
	} else {
		screnshotWindow.hide();
		window.show();
	}
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

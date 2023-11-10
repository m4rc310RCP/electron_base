const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
	notificationApi: {
		sendNotification(message) {
			ipcRenderer.send('notify', message);
		},
	},
	deviceApi: {
		hostname() {
			return ipcRenderer.invoke('hostname');
		},
	},
	windowApi: {
		setTitle(title) {
			ipcRenderer.send('title', title);
		},
		setModeCaptureScreenshot(mode) {
			ipcRenderer.send('capture-screenshot-mode', mode);
		},
		capture(bounds) {
			ipcRenderer.send('capture-screenshot', bounds);
		},
	},
	batteryApi: {},
	filesApi: {},
});

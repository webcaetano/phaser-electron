// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

var electron = require('electron');
var devMenuTemplate = require('./helpers/dev_menu_template');
var editMenuTemplate = require('./helpers/edit_menu_template');
var createWindow = require('./helpers/window');

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
// import env from './env';

var mainWindow;

var setApplicationMenu = function () {
	var menus = [editMenuTemplate];
	// if (env.name !== 'production') {
		menus.push(devMenuTemplate);
	// }
	electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(menus));
};

electron.app.on('ready', function () {
	setApplicationMenu();

	var mainWindow = createWindow('main', {
		width: 700,
		height: 800
	});

	console.log('file://' + __dirname + '/index.html')
	mainWindow.loadURL('file://' + __dirname + '/index.html');

	// if (env.name !== 'production') {
		mainWindow.openDevTools();
	// }
});

electron.app.on('window-all-closed', function () {
	electron.app.quit();
});

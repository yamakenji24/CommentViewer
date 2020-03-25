'use strict';
const electron = require('electron');
const { app, BrowserWindow, screen } = electron
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  let size = screen.getPrimaryDisplay().size;
  
  mainWindow = new BrowserWindow({
    width: size.width,
    height: size.height,
    transparent: true,
    hasshadow: false,
    webPreferences: {
      nodeIntegration: true
    },
    resizable: false,
    frame: false,
    alwaysOnTop: true,
  });
  mainWindow.setIgnoreMouseEvents(true)
  
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  
    // 開発ツールを有効化
  //mainWindow.webContents.openDevTools();
  
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', function() {
  setTimeout(function() {
    createWindow()
  }, 300);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
    if (mainWindow === null) {
      //createWindow();
    }
});

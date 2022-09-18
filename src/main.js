const { BrowserWindow } = require('electron');
const { path } = require('electron');

function createWindows() {
  const windows = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, './src/layouts/app.js'),
    },
  });

  windows.loadFile('./src/layouts/index.html');
}
module.exports = {
  createWindows,
};

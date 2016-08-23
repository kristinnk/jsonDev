const {app, BrowserWindow, Menu, dialog} = require('electron')


let win 

const template = [
  {
    label: '&File',
    submenu: [
    /*
      {
        label: '&Open Json file',
        click: function() {
          selectDirectory();
        }
      },
      {
        label: 'Import Json string'
      },
      {
        type: 'separator'
      },
      */
      {
        label: 'Exit',
        click: function() {
          app.quit();
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function createWindow () {
  win = new BrowserWindow({
    width: 1920,
    height: 1080
  });
  win.openDevTools();
  win.loadURL(`file://${__dirname}/index.html`)
  win.on('closed', () => {
    win = null
  });

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

function selectDirectory() {
}
/*
exports.selectDirectory = function() {
  dialog.showOpenDialog(win, {properties: ['openFile']});
}
*/
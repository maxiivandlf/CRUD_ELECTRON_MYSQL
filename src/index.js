const { app, BrowserWindow, ipcMain: ipc, Notification } = require('electron');

const { getConetion } = require('./dbconection');

require('electron-reload')(__dirname);

async function newProduct(prod) {
  const conx = await getConetion();
  prod.precio = parseFloat(prod.precio);
  const resultado = await conx.query('INSERT INTO products SET ?', prod);

  new Notification({
    title: 'Producto agregado',
    body: 'El producto fue agragado correctamente',
  }).show();

  prod.id = resultado.insertId;
  return prod;
}

async function getProducts() {
  const conx = await getConetion();
  const resultadop = await conx.query('SELECT * FROM products');
  return resultadop;
}

app.whenReady().then(() => {
  const win = new BrowserWindow({
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile('./src/layouts/index.html');
  win.maximize();

  //obtiene datos del proceso render escuchando el evento usuario

  ipc.on('usuario', async (env, product) => {
    const prodag = await newProduct(product);
    win.webContents.send('productodb', prodag);
  });

  ipc.on('getprod', async () => {
    //regresa los datos de la base
    const dbdatos = await getProducts();
    win.webContents.send('datosdb', dbdatos);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

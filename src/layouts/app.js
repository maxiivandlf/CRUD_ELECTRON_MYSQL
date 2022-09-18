const { ipcRenderer } = require('electron');

const productoForm = document.getElementById('productForm');
const nombreProd = document.getElementById('nombre');
const precioProd = document.getElementById('precio');
const descripcionProd = document.getElementById('descripcion');

const infoname = document.getElementById('nameproduct');
const infodescr = document.getElementById('descriptionprodc');
const infoprec = document.getElementById('precioproduc');
const products = document.getElementById('products');

productoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nuevoProducto = {
    nombre: nombreProd.value,
    precio: precioProd.value,
    descripcion: descripcionProd.value,
  };
  ipcRenderer.send('usuario', nuevoProducto);

  ipcRenderer.on('productodb', (event, msj) => {
    console.log(msj);

    infoname.innerText = `Nombre ${msj.nombre}`;
    infodescr.innerText = `Descripcion ${msj.descripcion}`;
    infoprec.innerText = `Precio: ${msj.precio}`;
  });
});

ipcRenderer.send('getprod');
ipcRenderer.on('datosdb', (event, datosdb) => {
  datosdb.forEach((dato) => {
    console.log(`producto: ${dato.nombre}}`);
  });
});

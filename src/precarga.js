const { contextBridge } = require('electron');

contextBridge.xposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // también podemos exponer variables, no sólo funciones
});

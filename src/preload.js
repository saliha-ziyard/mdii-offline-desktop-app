const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    generateExcel: (toolId) => ipcRenderer.invoke('generateExcel', toolId),
    openFile: (filePath) => ipcRenderer.invoke('openFile', filePath)
});
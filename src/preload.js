const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    generateExcel: (toolId) => ipcRenderer.invoke('generateExcel', toolId),
    generateInnovatorExcel: (toolId) => ipcRenderer.invoke('generateInnovatorExcel', toolId), // NEW
    generateFullExcel: (toolId) => ipcRenderer.invoke('generateFullExcel', toolId), // NEW
    openFile: (filePath) => ipcRenderer.invoke('openFile', filePath)
});
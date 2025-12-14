const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function getTemplatesPath() {
    const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
    
    if (isDev) {
        return path.join(__dirname, '..', 'backend', 'templates');
    } else {
        // In production, templates are in extraResources
        return path.join(process.resourcesPath, 'templates');
    }
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1500,
        height: 1000,
        resizable: true,
        icon: path.join(__dirname, 'public', 'images', 'MDII_Logo.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false
        }
    });
    
    win.loadFile('public/index.html');

    ipcMain.handle('generateInnovatorExcel', async (event, toolId) => {
        console.log('*** STEP 1: generateInnovatorExcel called ***');
        return executePythonScript(toolId, '--innovator-only');
    });

    ipcMain.handle('generateFullExcel', async (event, toolId) => {
        console.log('*** STEP 2: generateFullExcel called ***');
        return executePythonScript(toolId);
    });

    ipcMain.handle('generateExcel', async (event, toolId) => {
        return executePythonScript(toolId);
    });

    function verifyTemplates() {
        const templatesPath = getTemplatesPath();
        console.log('Verifying templates at:', templatesPath);
        
        if (!fs.existsSync(templatesPath)) {
            console.error('Templates directory does not exist!');
            return false;
        }
        
        const expectedFiles = [
            'MDII_OfflineToolKIT_EAV.xlsm',
            'MDII_OfflineToolKIT_RV.xlsm'
        ];
        
        for (const file of expectedFiles) {
            const filePath = path.join(templatesPath, file);
            if (!fs.existsSync(filePath)) {
                console.error(`Template missing: ${file}`);
                return false;
            }
            
            const stats = fs.statSync(filePath);
            console.log(`Template found: ${file} (${stats.size} bytes)`);
            
            // Verify it's a valid Excel file by checking magic number
            const buffer = Buffer.alloc(4);
            const fd = fs.openSync(filePath, 'r');
            fs.readSync(fd, buffer, 0, 4, 0);
            fs.closeSync(fd);
            
            // Excel files start with PK (0x50 0x4B) - they're ZIP archives
            if (buffer[0] !== 0x50 || buffer[1] !== 0x4B) {
                console.error(`Template corrupted: ${file}`);
                return false;
            }
        }
        
        console.log('All templates verified successfully');
        return true;
    }

    function executePythonScript(toolId, mode = null) {
        return new Promise((resolve, reject) => {
            const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
            
            // Verify templates before execution
            if (!verifyTemplates()) {
                reject('Template files are missing or corrupted');
                return;
            }
            
            let command, args;
            const templatesPath = getTemplatesPath();
            
            if (isDev) {
                command = 'python';
                args = [path.join(__dirname, '..', 'backend', 'main.py'), toolId];
            } else {
                command = path.join(process.resourcesPath, 'scripts', 'main.exe');
                args = [toolId];
            }
            
            if (mode) {
                args.push(mode);
            }

            console.log('=== EXECUTION DEBUG INFO ===');
            console.log('isDev:', isDev);
            console.log('Templates path:', templatesPath);
            console.log('Command:', command);
            console.log('Args:', args);
            
            if (!isDev && !fs.existsSync(command)) {
                console.error('Executable not found at:', command);
                reject(`Executable not found at: ${command}`);
                return;
            }

            const child = spawn(command, args, {
                stdio: ['pipe', 'pipe', 'pipe'],
                cwd: isDev ? path.join(__dirname, '..', 'backend') : path.dirname(command),
                env: { 
                    ...process.env,
                    TEMPLATES_PATH: templatesPath,
                    // Ensure xlwings can find Excel
                    PYTHONPATH: isDev ? undefined : path.join(process.resourcesPath, 'scripts')
                },
                shell: false
            });

            let stdout = '';
            let stderr = '';

            child.stdout.on('data', (data) => {
                const output = data.toString();
                stdout += output;
                console.log('Process stdout:', output);
            });

            child.stderr.on('data', (data) => {
                const output = data.toString();
                stderr += output;
                console.error('Process stderr:', output);
            });

            child.on('error', (error) => {
                console.error('Failed to start process:', error.message);
                reject(`Failed to start process: ${error.message}`);
            });

            child.on('close', (code) => {
                console.log(`Process exited with code: ${code}`);
                
                if (code === 0) {
                    const lines = stdout.trim().split('\n');
                    const lastLine = lines[lines.length - 1];
                    
                    if (lastLine.includes('Excel file created:') || lastLine.includes('Success!')) {
                        const pathMatch = stdout.match(/([A-Z]:\\[^\\/:*?"<>|]+\\[^\\/:*?"<>|]*\.xlsm)/i) || 
                                        stdout.match(/(\/[^\\/:*?"<>|]+\/[^\\/:*?"<>|]*\.xlsm)/i);
                        if (pathMatch) {
                            resolve(pathMatch[1]);
                        } else {
                            resolve('File created successfully (path not found in output)');
                        }
                    } else {
                        resolve(stdout.trim() || 'Excel file generated successfully');
                    }
                } else {
                    const errorMsg = stderr || stdout || `Process failed with code ${code}`;
                    console.error('Process execution failed:', errorMsg);
                    reject(errorMsg);
                }
            });
        });
    }

    ipcMain.handle('openFile', async (event, filePath) => {
        const { shell } = require('electron');
        console.log('Received filePath:', filePath);
        
        let actualFilePath = filePath;
        
        if (filePath.includes('Excel file created:')) {
            actualFilePath = filePath.replace('Excel file created:', '').trim();
        }
        
        console.log('Cleaned filePath:', actualFilePath);
        
        const folderPath = path.dirname(actualFilePath);
        console.log('Opening folder:', folderPath);
        
        if (!fs.existsSync(folderPath)) {
            throw new Error(`Folder not found: ${folderPath}`);
        }
        
        return shell.openPath(folderPath);
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
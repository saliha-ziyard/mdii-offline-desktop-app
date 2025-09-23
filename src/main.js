const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false
        }
    });
    
    win.loadFile('public/index.html');
    win.webContents.openDevTools(); // Keep this for debugging

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

    function ensureTemplatesExist() {
        const templatesSource = path.join(__dirname, '..', 'backend', 'templates');
        const templatesDestination = path.join(process.resourcesPath, 'templates');
        
        try {
            if (!fs.existsSync(templatesDestination) && fs.existsSync(templatesSource)) {
                console.log('Copying templates to resources...');
                fs.mkdirSync(templatesDestination, { recursive: true });
                
                const files = fs.readdirSync(templatesSource);
                files.forEach(file => {
                    const srcFile = path.join(templatesSource, file);
                    const destFile = path.join(templatesDestination, file);
                    if (fs.statSync(srcFile).isFile()) {
                        fs.copyFileSync(srcFile, destFile);
                        console.log(`Copied: ${file}`);
                    }
                });
            }
        } catch (error) {
            console.error('Error ensuring templates exist:', error);
        }
    }

    function executePythonScript(toolId, mode = null) {
        return new Promise((resolve, reject) => {
            const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
            
            if (!isDev) {
                ensureTemplatesExist();
            }
            
            let command, args;
            
            if (isDev) {
                // Development: use Python script directly
                command = 'python';
                args = [path.join(__dirname, '..', 'backend', 'main.py'), toolId];
            } else {
                // Production: use PyInstaller executable
                command = path.join(process.resourcesPath, 'scripts', 'main.exe');
                args = [toolId];
            }
            
            if (mode) {
                args.push(mode);
            }

            // Debug logging
            console.log('=== EXECUTION DEBUG INFO ===');
            console.log('isDev:', isDev);
            console.log('app.isPackaged:', app.isPackaged);
            console.log('process.resourcesPath:', process.resourcesPath);
            console.log('Command to execute:', command);
            console.log('Args:', args);
            
            // Check if command exists
            if (!isDev && !fs.existsSync(command)) {
                console.error('Executable not found at:', command);
                
                // List what files ARE in the scripts directory
                const scriptsDir = path.dirname(command);
                console.log('Scripts directory path:', scriptsDir);
                
                if (fs.existsSync(scriptsDir)) {
                    const files = fs.readdirSync(scriptsDir);
                    console.log('Files in scripts directory:', files);
                } else {
                    console.log('Scripts directory does not exist');
                    
                    // Check what's in resources
                    if (fs.existsSync(process.resourcesPath)) {
                        const resourceFiles = fs.readdirSync(process.resourcesPath);
                        console.log('Files in resources directory:', resourceFiles);
                    }
                }
                
                reject(`Executable not found at: ${command}`);
                return;
            }

            console.log(`Executing: ${command} ${args.join(' ')}`);

            const child = spawn(command, args, {
                stdio: ['pipe', 'pipe', 'pipe'],
                cwd: isDev ? path.join(__dirname, '..', 'backend') : path.dirname(command),
                env: { 
                    ...process.env,
                    // Set environment variable to help Python find templates
                    TEMPLATES_PATH: isDev ? 
                        path.join(__dirname, '..', 'backend', 'templates') : 
                        path.join(process.resourcesPath, 'templates')
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

            setTimeout(() => {
                if (!child.killed) {
                    child.kill();
                    reject('Process timed out after 5 minutes');
                }
            }, 300000);
        });
    }

    ipcMain.handle('openFile', async (event, filePath) => {
        const { shell } = require('electron');
        const path = require('path');
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
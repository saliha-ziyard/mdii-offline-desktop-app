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

    // In your main.js, add logging to see which function is called:

    ipcMain.handle('generateInnovatorExcel', async (event, toolId) => {
        console.log('*** STEP 1: generateInnovatorExcel called ***');
        return executePythonScript(toolId, '--innovator-only');
    });

    ipcMain.handle('generateFullExcel', async (event, toolId) => {
        console.log('*** STEP 2: generateFullExcel called ***');
        return executePythonScript(toolId); // Full mode (default)
    });

    // Keep the old function for backward compatibility
    ipcMain.handle('generateExcel', async (event, toolId) => {
        return executePythonScript(toolId);
    });

    function executePythonScript(toolId, mode = null) {
        return new Promise((resolve, reject) => {
            const scriptPath = path.join(__dirname, '..', 'backend', 'main.py');
            
            // Check if Python script exists
            if (!fs.existsSync(scriptPath)) {
                console.error('Python script not found at:', scriptPath);
                reject(`Python script not found at: ${scriptPath}`);
                return;
            }

            console.log('Executing Python script:', scriptPath);
            console.log('Tool ID:', toolId);
            console.log('Mode:', mode || 'full');

            // Prepare arguments
            const args = [scriptPath, toolId];
            if (mode) {
                args.push(mode);
            }

            // Try different Python commands in order of preference
            const pythonCommands = ['python', 'python3', 'py'];
            let currentCommandIndex = 0;

            function tryNextPythonCommand() {
                if (currentCommandIndex >= pythonCommands.length) {
                    reject('No working Python interpreter found. Please ensure Python is installed and in PATH.');
                    return;
                }

                const pythonCmd = pythonCommands[currentCommandIndex];
                console.log(`Trying Python command: ${pythonCmd}`);

                const child = spawn(pythonCmd, args, {
                    cwd: path.join(__dirname, '..', 'backend'),
                    env: { ...process.env },
                    shell: true
                });

                let stdout = '';
                let stderr = '';

                child.stdout.on('data', (data) => {
                    const output = data.toString();
                    stdout += output;
                    console.log('Python stdout:', output);
                });

                child.stderr.on('data', (data) => {
                    const output = data.toString();
                    stderr += output;
                    console.error('Python stderr:', output);
                });

                child.on('error', (error) => {
                    console.error(`Failed to start Python with ${pythonCmd}:`, error.message);
                    currentCommandIndex++;
                    tryNextPythonCommand();
                });

                child.on('close', (code) => {
                    console.log(`Python process exited with code: ${code}`);
                    
                    if (code === 0) {
                        // Success
                        const lines = stdout.trim().split('\n');
                        const lastLine = lines[lines.length - 1];
                        
                        // Look for the success message with file path
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
                        // Error
                        const errorMsg = stderr || stdout || `Python script failed with code ${code}`;
                        reject(errorMsg);
                    }
                });
            }

            tryNextPythonCommand();
        });
    }

    ipcMain.handle('openFile', async (event, filePath) => {
        const { shell } = require('electron');
        console.log('Opening file:', filePath);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        
        return shell.openPath(filePath);
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
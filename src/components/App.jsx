// import React, { useState } from 'react';

// const App = () => {
//     const [toolId, setToolId] = useState('');
//     const [status, setStatus] = useState('');
//     const [filePath, setFilePath] = useState('');

//     const handleGenerateExcel = async () => {
//         if (!toolId) {
//             setStatus('Please enter a Tool ID');
//             return;
//         }
//         try {
//             const result = await window.electronAPI.generateExcel(toolId);
//             setStatus('Excel generated successfully!');
//             setFilePath(result);
//         } catch (error) {
//             setStatus(`Error: ${error}`);
//         }
//     };

//     return (
//         <div>
//             <h1>CGIAR MDII Inclusiveness Index</h1>
//             <input
//                 type="text"
//                 value={toolId}
//                 onChange={(e) => setToolId(e.target.value)}
//                 placeholder="Enter Tool ID"
//             />
//             <button onClick={handleGenerateExcel}>Generate Excel</button>
//             <p className="status">{status}</p>
//             {filePath && (
//                 <a 
//                     href="#" 
//                     onClick={(e) => {
//                         e.preventDefault();
//                         window.electronAPI.openFile(filePath);
//                     }}
//                 >
//                     Download Excel
//                 </a>
//             )}
//         </div>
//     );
// };

// export default App;
import React, { useState, useEffect } from 'react';

const App = () => {
    const [toolId, setToolId] = useState('');
    const [status, setStatus] = useState('');
    const [filePath, setFilePath] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Check if electronAPI is available
    useEffect(() => {
        if (!window.electronAPI) {
            setStatus('Error: Electron API not available. Please check preload script.');
            console.error('window.electronAPI is not defined');
        }
    }, []);

    const handleGenerateExcel = async () => {
        if (!toolId) {
            setStatus('Please enter a Tool ID');
            return;
        }

        if (!window.electronAPI || !window.electronAPI.generateExcel) {
            setStatus('Error: Electron API not available');
            return;
        }

        setIsLoading(true);
        setStatus('Generating Excel file...');
        
        try {
            const result = await window.electronAPI.generateExcel(toolId);
            setStatus('Excel generated successfully!');
            setFilePath(result);
        } catch (error) {
            console.error('Excel generation error:', error);
            setStatus(`Error: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenFile = () => {
        if (filePath && window.electronAPI && window.electronAPI.openFile) {
            window.electronAPI.openFile(filePath);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>CGIAR MDII Inclusiveness Index</h1>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={toolId}
                    onChange={(e) => setToolId(e.target.value)}
                    placeholder="Enter Tool ID"
                    style={{ 
                        padding: '10px', 
                        fontSize: '16px',
                        width: '200px',
                        marginRight: '10px'
                    }}
                />
                <button 
                    onClick={handleGenerateExcel}
                    disabled={isLoading}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: isLoading ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isLoading ? 'Generating...' : 'Generate Excel'}
                </button>
            </div>
            
            <p className="status" style={{ 
                color: status.includes('Error') ? 'red' : 'green',
                fontWeight: 'bold'
            }}>
                {status}
            </p>
            
            {filePath && (
                <div style={{ marginTop: '20px' }}>
                    <button
                        onClick={handleOpenFile}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Open Generated File
                    </button>
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                        File saved to: {filePath}
                    </p>
                </div>
            )}
        </div>
    );
};

export default App;
# -*- mode: python ; coding: utf-8 -*-

a = Analysis(
    ['backend\\main.py'],
    pathex=[],
    binaries=[],
    datas=[
        ('backend\\templates', 'templates'),  # Include templates folder
    ],
    hiddenimports=[
        'openpyxl', 
        'requests', 
        'xlwings', 
        'pathlib', 
        'json', 
        'collections', 
        're',
        # ADD THESE - they're needed for xlwings to work with Excel:
        'win32com',
        'win32com.client',
        'pythoncom',
        'pywintypes',
        'win32api',
        'win32con'
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='main',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,  # Keep this True so you can see debug output
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
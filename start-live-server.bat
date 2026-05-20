@echo off
REM Start a local HTTP server for this project so homepageKaamatan.html is served live in your browser.
cd /d "%~dp0"

set PORT=8000

REM Try Python first
where python >nul 2>&1
if %errorlevel%==0 (
    echo Starting HTTP server with Python on port %PORT%...
    python -m http.server %PORT%
    goto end
)

REM Try Node.js with http-server
where http-server >nul 2>&1
if %errorlevel%==0 (
    echo Starting HTTP server with http-server on port %PORT%...
    http-server -p %PORT%
    goto end
)

echo No suitable web server tool found.
echo Install Python or Node.js, then run this script again.
echo If you have Node.js, install http-server globally with: npm install -g http-server

:end
pause

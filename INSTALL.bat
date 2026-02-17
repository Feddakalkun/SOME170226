@echo off
set "ROOT=%~dp0"
cd /d "%ROOT%"

echo.
echo ============================================================================
echo   FANVUE CREATOR STUDIO PRO - INSTALLER
echo ============================================================================
echo.

if not exist node_modules (
    echo Installing dependencies...
    call npm install
) else (
    echo Dependencies already installed.
)

if not exist .env (
    echo Creating .env from template...
    copy .env.template .env
    echo Please edit .env with your Fanvue credentials!
)

echo.
echo ============================================================================
echo   INSTALLATION COMPLETE!
echo ============================================================================
pause

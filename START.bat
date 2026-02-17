@echo off
set "ROOT=%~dp0"
cd /d "%ROOT%"

echo Starting Fanvue Creator Studio Pro...
npm run dev
pause

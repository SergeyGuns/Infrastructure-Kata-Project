@echo off
setlocal enabledelayedexpansion

echo Running lint in all projects...

REM Array of services that have lint scripts
set "services=backend-service auth-service migration-service swagger-service"

REM Run lint for services that have lint scripts
for %%s in (!services!) do (
    echo.
    echo ===========================================
    echo Linting %%s...
    echo ===========================================
    
    cd /d "%~dp0..\%%s"
    npm run lint
)

REM Special handling for frontend which doesn't have a lint script but has ESLint configured
echo.
echo ===========================================
echo Linting frontend...
echo ===========================================

cd /d "%~dp0..\frontend"
npx eslint "src/**/*.{js,jsx,ts,tsx}" --max-warnings 0

echo.
echo ===========================================
echo Lint completed for all projects!
echo ===========================================

pause
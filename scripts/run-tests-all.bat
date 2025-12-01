@echo off
setlocal enabledelayedexpansion

echo Running tests in all projects...

REM Array of services that have test scripts
set services_with_tests=backend-service auth-service migration-service frontend

REM Root directory of the project
set ROOT_DIR=%~dp0..
pushd %ROOT_DIR%

REM Run tests for services that have test scripts
for %%s in (%services_with_tests%) do (
    echo.
    echo ===========================================
    echo Testing %%s...
    echo ===========================================

    cd /d "%ROOT_DIR%\%%s"
    
    REM Check if package.json exists and has test script
    if exist "package.json" (
        findstr /C:"test" package.json >nul
        if !errorlevel! equ 0 (
            npm run test
        ) else (
            echo No test script found in %%s
        )
    ) else (
        echo No package.json found in %%s
    )
)

popd

echo.
echo ===========================================
echo Tests completed for all projects!
echo ===========================================

endlocal
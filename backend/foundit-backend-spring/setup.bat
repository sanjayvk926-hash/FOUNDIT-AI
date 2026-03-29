@echo off
REM FoundIt AI Backend - Windows Setup Script
REM This script automates the setup process for Windows users

COLOR 0A
echo ================================================================
echo.
echo          FoundIt AI Backend Setup Script (Windows)
echo          Automated Installation and Setup
echo.
echo ================================================================
echo.

REM Check Java
echo Step 1: Checking prerequisites...
echo ----------------------------------------------------------------

java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Java not found. Please install Java 17 or higher.
    pause
    exit /b 1
) else (
    echo [OK] Java found
)

REM Check Maven
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Maven not found. Please install Maven 3.6 or higher.
    pause
    exit /b 1
) else (
    echo [OK] Maven found
)

REM Check MySQL
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] MySQL not found. Please install MySQL 8.0 or higher.
    pause
    exit /b 1
) else (
    echo [OK] MySQL found
)

echo.
echo Step 2: Database Setup
echo ----------------------------------------------------------------

set /p MYSQL_USER="Enter MySQL username (default: root): "
if "%MYSQL_USER%"=="" set MYSQL_USER=root

set /p MYSQL_PASSWORD="Enter MySQL password: "

REM Create database
echo Creating database 'foundit_db'...
mysql -u %MYSQL_USER% -p%MYSQL_PASSWORD% -e "CREATE DATABASE IF NOT EXISTS foundit_db;" 2>nul

if %errorlevel% neq 0 (
    echo [X] Failed to create database. Please check your credentials.
    pause
    exit /b 1
) else (
    echo [OK] Database created successfully
)

echo.
echo Step 3: Configure Application
echo ----------------------------------------------------------------

REM Update application.properties
set CONFIG_FILE=src\main\resources\application.properties

if exist %CONFIG_FILE% (
    echo Backing up configuration file...
    copy %CONFIG_FILE% %CONFIG_FILE%.backup >nul
    
    echo Updating configuration...
    powershell -Command "(gc %CONFIG_FILE%) -replace 'spring.datasource.username=.*', 'spring.datasource.username=%MYSQL_USER%' | Out-File -encoding ASCII %CONFIG_FILE%"
    powershell -Command "(gc %CONFIG_FILE%) -replace 'spring.datasource.password=.*', 'spring.datasource.password=%MYSQL_PASSWORD%' | Out-File -encoding ASCII %CONFIG_FILE%"
    
    echo [OK] Configuration updated
) else (
    echo [X] Configuration file not found: %CONFIG_FILE%
    pause
    exit /b 1
)

echo.
echo Step 4: Build Project
echo ----------------------------------------------------------------
echo Building project with Maven (this may take a few minutes)...

call mvn clean install -DskipTests

if %errorlevel% neq 0 (
    echo [X] Build failed. Please check the error messages above.
    pause
    exit /b 1
) else (
    echo [OK] Build successful
)

echo.
echo ================================================================
echo.
echo          Setup Complete!
echo.
echo ================================================================
echo.
echo FoundIt AI Backend is ready to run!
echo.
echo To start the server, run:
echo   mvn spring-boot:run
echo.
echo Server will be available at: http://localhost:8080/api
echo.
echo Default admin credentials:
echo   Username: admin
echo   Password: admin123
echo.
echo IMPORTANT: Change the admin password after first login!
echo.
echo ================================================================

set /p START_SERVER="Do you want to start the server now? (Y/N): "
if /i "%START_SERVER%"=="Y" (
    echo.
    echo Starting FoundIt AI Backend...
    echo ----------------------------------------------------------------
    call mvn spring-boot:run
)

pause

@echo off
echo ========================================
echo    NIE/IA - Compilar e Instalar App
echo ========================================
echo.

set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set PATH=%PATH%;%LOCALAPPDATA%\Android\Sdk\platform-tools

echo [1/5] Construyendo frontend...
cd /d C:\dev\nie-ia-new-residents
call npm run build
if %errorlevel% neq 0 (
    echo ERROR en npm run build. Abortando.
    pause
    exit /b 1
)

echo.
echo [2/5] Sincronizando con Capacitor...
call npx cap sync android
if %errorlevel% neq 0 (
    echo ERROR en cap sync. Abortando.
    pause
    exit /b 1
)

echo.
echo [3/5] Limpiando proyecto Android...
cd /d C:\dev\nie-ia-new-residents\android
call gradlew clean
if %errorlevel% neq 0 (
    echo ERROR en la limpieza. Abortando.
    pause
    exit /b 1
)

echo.
echo [4/5] Desinstalando app del movil...
adb uninstall com.tuapp.nieia
echo (Si falla, desinstala manualmente del movil)

echo.
echo [5/5] Compilando e instalando...
call gradlew installDebug
if %errorlevel% neq 0 (
    echo ERROR al instalar. Revisa que el movil este conectado y autorizado.
    pause
    exit /b 1
)

echo.
echo ========================================
echo    App instalada correctamente!
echo ========================================
pause

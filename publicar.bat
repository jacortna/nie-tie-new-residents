@echo off
setlocal

:: ============================================================
::  CONFIGURACION
:: ============================================================
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set PATH=%JAVA_HOME%\bin;%PATH%

set KEYSTORE=nietie-release.keystore
set ALIAS=nietie
set AAB_INPUT=android\app\build\outputs\bundle\release\app-release.aab
set AAB_OUTPUT=app-release-signed.aab

:: ============================================================
::  PEDIR CONTRASENA
:: ============================================================
set /p KS_PASS=Contrasena del keystore: 

:: ============================================================
::  INCREMENTAR versionCode en build.gradle
:: ============================================================
echo.
echo [1/4] Incrementando versionCode...
powershell -Command ^
  "$f = 'android\app\build.gradle'; $c = Get-Content $f -Raw; ^
   $match = [regex]::Match($c, 'versionCode\s+(\d+)'); ^
   $old = [int]$match.Groups[1].Value; $new = $old + 1; ^
   $c = $c -replace ('versionCode\s+' + $old), ('versionCode ' + $new); ^
   [System.IO.File]::WriteAllText($f, $c, [System.Text.Encoding]::UTF8); ^
   Write-Host ('  versionCode: ' + $old + ' -> ' + $new)"

:: ============================================================
::  BUILD AAB RELEASE
:: ============================================================
echo.
echo [2/4] Compilando AAB release...
cd android
call gradlew bundleRelease
if errorlevel 1 (
    echo ERROR: Fallo en la compilacion.
    cd ..
    pause
    exit /b 1
)
cd ..
echo     OK

:: ============================================================
::  FIRMAR AAB
:: ============================================================
echo.
echo [3/4] Firmando AAB...
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 ^
  -keystore %KEYSTORE% ^
  -storepass %KS_PASS% ^
  -keypass %KS_PASS% ^
  %AAB_INPUT% %ALIAS%
if errorlevel 1 (
    echo ERROR: Fallo en la firma.
    pause
    exit /b 1
)

:: Copiar AAB firmado a raiz del proyecto con nombre claro
copy /Y %AAB_INPUT% %AAB_OUTPUT%
echo     OK -> %AAB_OUTPUT%

:: ============================================================
::  VERIFICAR FIRMA
:: ============================================================
echo.
echo [4/4] Verificando firma...
jarsigner -verify -verbose -certs %AAB_OUTPUT% | findstr "jar verified"
if errorlevel 1 (
    echo AVISO: No se pudo verificar la firma automaticamente.
) else (
    echo     Firma verificada correctamente.
)

:: ============================================================
::  LISTO
:: ============================================================
echo.
echo ============================================================
echo  LISTO: %AAB_OUTPUT%
echo  Sube este archivo a Google Play Console
echo  (Produccion > Nueva version > Subir)
echo ============================================================
echo.
pause
endlocal

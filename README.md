# Framework de Testing Mobile Automatizado

Framework de testing automatizado para aplicaciones móviles utilizando **Appium + Jest** y **Appium + Cucumber** con reporte de **Allure** para pruebas E2E en dispositivos Android.

##  Tecnologías Utilizadas

- **[Appium](https://appium.io/)** - Plataforma de automatización móvil multiplataforma
- **[Jest](https://jestjs.io/)** - Framework de testing con assertions y mocking integrados
- **[Cucumber.js](https://cucumber.io/docs/cucumber/)** - Framework BDD para pruebas en lenguaje natural (Gherkin)
- **[Allure Report](https://docs.qameta.io/allure/)** - Framework de reporting avanzado con métricas detalladas
- **JavaScript/Node.js** - Lenguaje de programación y runtime
- **Android Studio** - Emulador y herramientas de desarrollo Android

## Prerrequisitos

### 1. Instalar Android Studio
- Descargar e instalar [Android Studio](https://developer.android.com/studio)
- Configurar Android SDK y AVD Manager
- Crear y configurar un emulador Android

### 2. Instalar Appium
```
# Instalar Appium globalmente
npm install -g appium

# Instalar driver de Android
appium driver install uiautomator2

# Verificar instalación
appium doctor --android
```

### 3. Variables de Entorno
Configurar las siguientes variables en tu sistema:
```bash
export ANDROID_HOME=/path/to/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export JAVA_HOME=/path/to/java
```

##  Instalación del Proyecto

```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]

# Instalar dependencias
npm install
```

## Preparación del Entorno

### 1. Iniciar Servidor Appium
```bash
# En una terminal separada
appium
```

### 2. Iniciar Emulador Android
```bash
# Listar emuladores disponibles
emulator -list-avds

# Iniciar emulador específico
emulator -avd [NOMBRE_DEL_AVD]

# O desde Android Studio: AVD Manager > Play button
```

### 3. Verificar Dispositivos Conectados
```bash
adb devices
```

## Ejecución de Pruebas

### Framework Jest
```bash
# Ejecutar todas las pruebas con Jest
npm run test:jest

### Framework Cucumber
```bash
# Ejecutar todas las pruebas con Cucumber
npm run test:cucumber


## Reportes y Resultados

### Generar y visualizar reporte de Allure
```bash
# Servir reporte en vivo (recomendado)
allure serve allure-results

# Generar reporte estático
allure generate allure-results --clean -o allure-report
allure open allure-report


## ⚙️ Configuración

### Capabilities Básicas (Android)
```javascript
const capabilities = {
  platformName: 'Android',
  platformVersion: '11.0',
  deviceName: 'Android Emulator',
  app: path.resolve('./apps/app-debug.apk'),
  automationName: 'UiAutomator2',
  newCommandTimeout: 300,
  noReset: false,
  fullReset: false
};
```

### Variables de Entorno (.env)
```bash
APPIUM_HOST=localhost
APPIUM_PORT=4723
DEVICE_NAME=Android Emulator
PLATFORM_VERSION=11.0
APP_PATH=./apps/app-debug.apk
IMPLICIT_WAIT=10000
```

##Escribiendo Pruebas

### Ejemplo con Jest
```javascript
describe('Login Functionality', () => {
  test('should login successfully with valid credentials', async () => {
    await loginPage.enterEmail('user@test.com');
    await loginPage.enterPassword('password123');
    await loginPage.tapLoginButton();
    
    await expect(homePage.welcomeMessage).toBeDisplayed();
  });
});
```

### Ejemplo con Cucumber
```gherkin
@mobile @login
Feature: Mobile Login
  Como usuario de la aplicación móvil
  Quiero poder iniciar sesión
  Para acceder a mis datos

  Scenario: Login exitoso en dispositivo móvil
    Given que la aplicación está abierta
    When ingreso el email "user@test.com"
    And ingreso la contraseña "password123"
    And toco el botón de login
    Then debería ver la pantalla principal
```

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

**Desarrollado con 📱 para testing mobile automatizado de calidad**

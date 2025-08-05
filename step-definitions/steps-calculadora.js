

const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { remote } = require('webdriverio');

const capabilities = {
    "platformName": "Android",
    "appium:automationName": "UiAutomator2",
    "appium:deviceName": "emulator-5554",
    "appium:app": "E:/CURSOS/Desafio_Latam/Desafio_Latam_Test_Automation_Engineer/Trabajo_Final/mobile_test/apk/CalculadoraIMC.apk"
};

const wdOpts = {
    hostname: '127.0.0.1',
    port: 4723,
    logLevel: 'info',
    capabilities
};

// World object simplificado
function CustomWorld() {
    this.driver = null;
    this.btnCalcular = null;
    this.inputPeso = null;
    this.inputEstatura = null;
}

const { setWorldConstructor } = require('@cucumber/cucumber');
setWorldConstructor(CustomWorld);

// Hook: Iniciar sesión antes de cada escenario
Before(async function () {
    this.driver = await remote(wdOpts);
    
    // Definir elementos una vez
    this.btnCalcular = this.driver.$('android=new UiSelector().resourceId("calculate_button")');
    this.inputPeso = this.driver.$('//android.widget.EditText[@content-desc="Entrada de Peso en kilogramos"]');
    this.inputEstatura = this.driver.$('~Entrada de Altura en centímetros');
    this.tituloApp = this.driver.$('~Título: Calculadora de IMC');
    this.alertMessage = this.driver.$('//android.widget.TextView[@resource-id="android:id/message"]');
});

// Hook: Cerrar sesión después de cada escenario
After(async function () {
    if (this.driver) {
        await this.driver.deleteSession();
    }
});

// STEPS

Given('que tengo la aplicación de calculadora IMC abierta', async function () {
    
    expect(await this.tituloApp.isDisplayed()).to.be.true;
    await this.inputPeso.clearValue();
    await this.inputEstatura.clearValue();

    console.log('Aplicación cargada y campos limpiados');
});

When('ingreso peso {string} kilogramos', async function (peso) {
    console.log(`Ingresando peso: ${peso}`);
    
    await this.inputPeso.waitForDisplayed({ timeout: 5000 });
    await this.inputPeso.clearValue();
    await this.inputPeso.setValue(peso);
    
    console.log('Peso ingresado');
});

When('ingreso estatura {string} centímetros', async function (estatura) {
    console.log(`Ingresando estatura: ${estatura}`);
    
    await this.inputEstatura.waitForDisplayed({ timeout: 5000 });
    await this.inputEstatura.clearValue();
    await this.inputEstatura.setValue(estatura);
    
    console.log('Estatura ingresada');
});

When('presiono el botón calcular', async function () {
    console.log('Presionando botón calcular');
    
    await this.btnCalcular.waitForDisplayed({ timeout: 5000 });
    await this.btnCalcular.click();

    console.log('Botón calcular presionado');
});

Then('debería ver el resultado del IMC', async function () {
    console.log('Verificando resultado del IMC');
    const btnResultado = this.driver.$('android=new UiSelector().resourceId("bmi_result_value")');
    expect(await btnResultado.getText()).to.equal('23.57');
    console.log('Resultado del IMC verificado correctamente');
});
Then ('debería ver un mensaje de error que dice {string}', async function (mensajeError) {
    console.log(`Verificando mensaje de error: ${mensajeError}`);
    expect(await this.alertMessage.getText()).to.contain('Por favor, introduce un peso y altura válidos.');
    console.log(`Mensaje de error: ${mensajeError} verificado correctamente `);
})
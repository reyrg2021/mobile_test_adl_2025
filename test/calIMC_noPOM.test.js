const { remote } = require('webdriverio');


const capabilities = {
    "platformName": "Android",
    "appium:automationName": "UiAutomator2",
    "appium:deviceName": "emulator-5554",
    "appium:app": "E:/CURSOS/Desafio_Latam/Desafio_Latam_Test_Automation_Engineer/Trabajo_Final/mobile_test/apk/CalculadoraIMC.apk"
    
}

const wdOpts = {
    hostname: '127.0.0.1',
    port: 4723,
    logLevel: 'info',
    capabilities
}
let driver;
let btnCalcular;
let inputPeso;
let inputEstatura;
let tituloApp;
beforeAll(async () => {
    driver = await remote(wdOpts);
    btnCalcular = driver.$('android=new UiSelector().resourceId("calculate_button")');
    inputPeso = driver.$('//android.widget.EditText[@content-desc="Entrada de Peso en kilogramos"]');
    inputEstatura = driver.$('~Entrada de Altura en centímetros');
    tituloApp = driver.$('~Título: Calculadora de IMC');
});

afterAll(async () => {
    await driver.deleteSession();
});

beforeEach(async () => {
    inputEstatura.clearValue();
    inputPeso.clearValue();
});



describe('Validando elementos de la aplicación', () => {


    it('Validar que la appp está ejecutándose', async () => {
        
        expect(await tituloApp.isDisplayed()).toBe(true);
    
    });
    it('Validar calculo correcto', async () => {
        await inputPeso.setValue('73');
        await inputEstatura.setValue('176');
        await btnCalcular.click();
        const btnResultado = driver.$('android=new UiSelector().resourceId("bmi_result_value")');
        expect(await btnResultado.getText()).toBe('23.57');

    });


    it('Validar proceso con al menos un valor negativo en los campos', async () => {
        await inputPeso.setValue('-73');
        await inputEstatura.setValue('176');
        await btnCalcular.click();
        const alertMessage = driver.$('//android.widget.TextView[@resource-id="android:id/message"]');
        expect(await alertMessage.getText()).toBe('Por favor, introduce un peso y altura válidos.');
        const okButton = driver.$('android=new UiSelector().resourceId("android:id/button1")');
        await okButton.click();
    });

    it('Validar proceso con al menos un valor vacío en los campos', async () => {
        await inputPeso.setValue('-73');
        await inputEstatura.setValue('');
        await btnCalcular.click();
        const alertMessage = driver.$('//android.widget.TextView[@resource-id="android:id/message"]');
        expect(await alertMessage.getText()).toBe('Por favor, introduce un peso y altura válidos.');
        const okButton = driver.$('android=new UiSelector().resourceId("android:id/button1")');
        await okButton.click();
    });

    it('Validar proceso con al menos un valor texto en los campos', async () => {
        await inputPeso.setValue('-73');
        await inputEstatura.setValue('peso');
        await btnCalcular.click();
        const alertMessage = driver.$('//android.widget.TextView[@resource-id="android:id/message"]');
        expect(await alertMessage.getText()).toBe('Por favor, introduce un peso y altura válidos.');
        const okButton = driver.$('android=new UiSelector().resourceId("android:id/button1")');
        await okButton.click();
    });
});
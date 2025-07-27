// jest.config.js
module.exports = {
    // Configurar el test environment de Allure
    testEnvironment: "allure-jest/node", // o "allure-jest/jsdom" si usas DOM
    
    // Mantener tu timeout actual
    testTimeout: 60000, // 60 segundos le da tiempo a Appium a que inicie la sasión
    
    // Agregar allure a los reporters junto con tu HTML reporter existente
    reporters: [
        "default",
        ["jest-html-reporter", { pageTitle: "Reporte de Pruebas Appium" }]
        // No necesitas agregar allure aquí, se maneja automáticamente por el testEnvironment
    ],
    
    // Opcional: configuración adicional de Allure
    testEnvironmentOptions: {
        environmentInfo: {
            node_version: process.version,
            // Puedes agregar más info del ambiente aquí
        },
    }
};
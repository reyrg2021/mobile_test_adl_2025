// cucumber.js
module.exports = {
  default: {
    // Archivos de features
    paths: ['features/**/*.feature'],
    
    // Step definitions y support files
    require: [
      'step-definitions/**/*.js'
    ],
    
    // Formatters para reportes
    format: [
      'progress-bar',
      'json:reports/cucumber_report.json',
      'html:reports/cucumber_report.html',
      'allure-cucumberjs/reporter'
    ],
    
    // Configuración de formato
    formatOptions: {
      snippetInterface: 'async-await'
    },
    
    // Variables de entorno para Allure
    env: {
      'allure.results.directory': './allure-results'
    },
    
    // Sin paralelización para evitar problemas con Appium
    parallel: 0,
    

    // Salir en primera falla (útil para desarrollo)
    failFast: false,
    
    // Mostrar snippets para pasos no implementados
    dryRun: false,
    
    publishQuiet: true
  }
};
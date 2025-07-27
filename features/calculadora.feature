# features/calculator.feature
Feature: Calculadora IMC
  Como usuario
  Quiero calcular mi IMC
  Para conocer mi estado de salud

  Background:
    Given que tengo la aplicación de calculadora IMC abierta

  Scenario: Calcular IMC con valores válidos en los campos de peso y estatura
    When ingreso peso "73" kilogramos
    And ingreso estatura "176" centímetros  
    And presiono el botón calcular
    Then debería ver el resultado del IMC

  Scenario: Calcular IMC con al menos un valor negativo en los campos
    When ingreso peso "-73" kilogramos
    And ingreso estatura "176" centímetros  
    And presiono el botón calcular
    Then debería ver un mensaje de error que dice "Por favor, introduce un peso y altura válidos."

  Scenario: Calcular IMC con al menos un valor vacío en los campos
    When ingreso peso "73" kilogramos
    And ingreso estatura "" centímetros  
    And presiono el botón calcular
    Then debería ver un mensaje de error que dice "Por favor, introduce un peso y altura válidos."

  Scenario: Calcular IMC con al menos un valor texto en los campos
    When ingreso peso "73" kilogramos
    And ingreso estatura "peso" centímetros  
    And presiono el botón calcular
    Then debería ver un mensaje de error que dice "Por favor, introduce un peso y altura válidos."
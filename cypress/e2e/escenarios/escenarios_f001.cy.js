//import {Entrenamiento} from "page/deportista/entrenamiento"
import {Entrenamiento} from "../page/deportista/entrenamiento"
const {faker} = require ('@faker-js/faker')

const entrenamiento = new Entrenamiento();
/**
 * Escenario por funcionalidad
 * F001: Creación entrenamiento
 */
describe('Funcionalidad F001: Ingresa funcionalidad entrenamiento', () => {
  it('Home SportApp', () => {
    entrenamiento.navegarEntrenamiento();
  })
/*
describe('Nuevo Entrenamiento - Escenario Positivo', () => {
  beforeEach(() => {
    entrenamiento.navegarEntrenamiento();
  })

  it('Ingresa datos al entrenamiento', () => {
    // GIVEN Ingresa a la pagina principal
      // that Ingresa a la pagina entrenamiento en el perfil del usuario deportista
      // to ingresa los datos para crear un entrenamiento
      let nombreEntrenamiento = faker.lorem.words();
          entrenamiento.ingresarNombre(nombreEntrenamiento);

      // Obtener la fecha actual
      let fechaActual = new Date();
      // Generar una fecha aleatoria utilizando faker
      //let fechaAleatoria = faker.date.recent();
      let fechaAleatoria = faker.date.future({ min: fechaActual });
      // Formatear la fecha en el formato deseado (YYYY-MM-DD HH:mm:ss)
      let fechaFormateada = fechaAleatoria.toISOString().split('T')[0]
      entrenamiento.ingresarFecha(fechaFormateada);

      // Seleccionar un ejercicio
      entrenamiento.seleccionEjercicio();

      //let numeroRepeciones =faker.number;
      let numeroRepeciones = faker.datatype.number({ min: 0, max: 20 });
      entrenamiento.ingresarRepeticiones (numeroRepeciones);

      // Habilitar el botón 'agregar_ejercicio'
      entrenamiento.agregarEjercicio();

      // Guardar el entrenamiento
      entrenamiento.guardarEntrenamiento();

    // Verificar que se guardó correctamente
    entrenamiento.validarMsjExitoso;
  })
})*/

/// <reference types="cypress" />

describe('Nuevo Entrenamiento - Escenarios Negativos', () => {
  beforeEach(() => {
    entrenamiento.navegarEntrenamiento();
  })

  it('No debe permitir nombres vacíos', () => {
    // Seleccionar un ejercicio
    entrenamiento.seleccionEjercicio();
    // Obtener la fecha actual
    let fechaActual = new Date();
    // Llenar otros campos
    //let fechaAleatoria = faker.date.recent();
    let fechaAleatoria = faker.date.future({ min: fechaActual });
    // Formatear la fecha en el formato deseado (YYYY-MM-DD HH:mm:ss)
    let fechaFormateada = fechaAleatoria.toISOString().split('T')[0]
    entrenamiento.ingresarFecha(fechaFormateada);


    let numeroRepeciones = faker.datatype.number({ min: 0, max: 20 });
      entrenamiento.ingresarRepeticiones (numeroRepeciones);

    entrenamiento.agregarEjercicio();

    cy.get('#nombre').click();
    cy.get('#numero_repeticiones').click();

    // Intentar guardar sin llenar el nombre
    /*cy.get('#guardar').click()

    // Verificar que se muestre un mensaje de error
    cy.on('window:alert', (str) => {
      expect(str).to.contain('Por favor, ingrese un nombre')
    })*/
  })
//debe iniciar el comentario
/* it('should not allow past date for training', () => {
    // Llenar el campo 'nombre'
    cy.get('#nombre').type('John Doe')

    // Seleccionar un ejercicio
    cy.get('#ejercicios').select('3d05ea31-aa8a-4e1d-84a1-ce5277a6ddcb')

    // Llenar el campo 'fecha_entrenamiento' con una fecha pasada
    const pastDate = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0]
    cy.get('#fecha_entrenamiento').type(pastDate)

    // Llenar el campo 'numero_repeticiones'
    cy.get('#numero_repeticiones').type('20')

    // Intentar guardar con una fecha pasada
    cy.get('#guardar').click()

    // Verificar que se muestre un mensaje de error
    cy.on('window:alert', (str) => {
      expect(str).to.contain('La fecha de entrenamiento no puede ser anterior a la fecha actual')
    })
  })

  it('should not allow negative repetitions', () => {
    // Llenar el campo 'nombre'
    cy.get('#nombre').type('John Doe')

    // Seleccionar un ejercicio
    cy.get('#ejercicios').select('3d05ea31-aa8a-4e1d-84a1-ce5277a6ddcb')

    // Llenar el campo 'fecha_entrenamiento'
    const currentDate = new Date().toISOString().split('T')[0]
    cy.get('#fecha_entrenamiento').type(currentDate)

    // Llenar el campo 'numero_repeticiones' con un valor negativo
    cy.get('#numero_repeticiones').type('-10')

    // Intentar guardar con un valor negativo de repeticiones
    cy.get('#guardar').click()

    // Verificar que se muestre un mensaje de error
    cy.on('window:alert', (str) => {
      expect(str).to.contain('El número de repeticiones debe ser positivo')
    })
  })

  it('should not allow submitting without selecting an exercise', () => {
    // Llenar el campo 'nombre'
    cy.get('#nombre').type('John Doe')

    // Llenar el campo 'fecha_entrenamiento'
    const currentDate = new Date().toISOString().split('T')[0]
    cy.get('#fecha_entrenamiento').type(currentDate)

    // Llenar el campo 'numero_repeticiones'
    cy.get('#numero_repeticiones').type('20')

    // Intentar guardar sin seleccionar un ejercicio
    cy.get('#guardar').click()

    // Verificar que se muestre un mensaje de error
    cy.on('window:alert', (str) => {
      expect(str).to.contain('Por favor, seleccione al menos un ejercicio')
    })
  })*/
})


})


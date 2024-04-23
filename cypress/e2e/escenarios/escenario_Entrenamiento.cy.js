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
      cy.screenshot('Nuevo-entrenamiento-numeroRepeciones')

      // Habilitar el botón 'agregar_ejercicio'
      entrenamiento.agregarEjercicio();

      // Guardar el entrenamiento
      entrenamiento.guardarEntrenamiento();
      cy.screenshot('Nuevo-entrenamiento-guardarEntrenamiento')
    // Verificar que se guardó correctamente
    entrenamiento.validarMsjExitoso;
    cy.screenshot('Nuevo-entrenamiento-validarMsjExitoso')

  })
})

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
    //cy.get('#guardar').click()

    // Verificar que se muestre un mensaje de error
    //cy.on('window:alert', (str) => {
    //  expect(str).to.contain('Por favor, ingrese un nombre')
    //})
  })

it('No debe permitirse una fecha anterior a la fecha actual', () => {

    // Llenar el campo 'fecha_entrenamiento' con una fecha pasada
  const pastDate = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0]
    entrenamiento.ingresarFecha(pastDate);

    entrenamiento.clicEnNombre();

    // Verificar que se muestre un mensaje de error
    cy.on('window:alert', (str) => {
      expect(str).to.contain('La fecha de entrenamiento no puede ser anterior a la fecha actual')
    })
  })

  it('No debe permitir repeticiones negativa', () => {

    // Llenar el campo 'fecha_entrenamiento'
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

      // Llenar el campo 'numero_repeticiones' con un valor negativo
      let numeroRepeciones = faker.datatype.number({ min: -20, max: 0 });
      entrenamiento.ingresarRepeticiones (numeroRepeciones);

      entrenamiento.clicEnNombre();
      cy.screenshot('repeticiones-negativas')

  })

  it('No debe permitir ingresar texto en repeticiones', () => {
     // Llenar el campo 'fecha_entrenamiento'
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

       // Llenar el campo 'numero_repeticiones' con un valor negativo
    let numeroRepeciones = faker.lorem.words();
      entrenamiento.ingresarRepeticiones (numeroRepeciones);

      entrenamiento.clicEnNombre();
      cy.screenshot('repeticiones-con-texto')

  })

  it('No debe permitir agregar ejercicio sin seleccionar un ejercicio', () => {

    let nombreEntrenamiento = faker.lorem.words();
          entrenamiento.ingresarNombre(nombreEntrenamiento);

    // Llenar el campo 'fecha_entrenamiento'
    // Obtener la fecha actual
    let fechaActual = new Date();
    // Generar una fecha aleatoria utilizando faker
    //let fechaAleatoria = faker.date.recent();
    let fechaAleatoria = faker.date.future({ min: fechaActual });
    // Formatear la fecha en el formato deseado (YYYY-MM-DD HH:mm:ss)
    let fechaFormateada = fechaAleatoria.toISOString().split('T')[0]
    entrenamiento.ingresarFecha(fechaFormateada);

    // Llenar el campo 'numero_repeticiones'
    let numeroRepeciones = faker.datatype.number({ min: 1, max: 20 });
      entrenamiento.ingresarRepeticiones (numeroRepeciones);

    // Intentar guardar sin seleccionar un ejercicio
    entrenamiento.guardarEntrenamiento();

    // Verificar que se muestre un mensaje de error
    cy.on('window:alert', (str) => {
      expect(str).to.contain('Por favor, seleccione almenos un ejercicio')
    })
    cy.screenshot('Guardar-sin-ejericio-seleccionado')
  })
})

})


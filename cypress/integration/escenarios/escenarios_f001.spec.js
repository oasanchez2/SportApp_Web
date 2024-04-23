//import { entrenamiento } from "../../page/deportista/entrenamiento"
import {Entrenamiento} from "../../page/deportista/entrenamiento"
const {faker} = require ('@faker-js/faker')

const entrenamiento = new Entrenamiento();
/**
 * Escenario por funcionalidad
 * F001: Creación entrenamiento
 */
describe('Funcionalidad F001: Creación de entrenamiento', () => {
  it('Home SportApp', () => {
    cy.visit('http://sportapp-miso.s3-website-us-east-1.amazonaws.com/')
  })
  describe('Escenarios Positivos', () => {
    it('F001E01.DE: ', () => {
      // GIVEN Ingresa a la pagina principal
      // that Ingresa a la pagina entrenamiento en el perfil del usuario deportista
      entrenamiento.navegarEntrenamiento();

      // to ingresa los datos para crear un entrenamiento
      let nombreEntrenamiento = faker.lorem.words();
          entrenamiento.ingresarNombre(nombreEntrenamiento);

      let fechaEntrenamiento = faker.date;
          entrenamiento.fechaEntrenamiento(fechaEntrenamiento);

      let numeroRepeciones =faker.number;
          entrenamiento.numeroRepeciones (numeroRepeciones);

          entrenamiento.seleccionEjercicio();

          entrenamiento.agregarEjercicio();

  });

  });

})


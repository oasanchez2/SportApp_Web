//import { adminUrls } from "../../../fixtures/urls";
import { adminUrls} from "../../../fixtures/urls";

export class Entrenamiento {

  navegarEntrenamiento() {
    cy.visit(adminUrls.entrenamientoUrl);
      cy.wait(400)
  }

  ingresarNombre (nombreEntrenamiento){
    //cy.get('input[name="nombre"]').type('Entrenamiento de prueba')
    cy.get('#nombre').type(nombreEntrenamiento)
    cy.wait(400)

  }

  clicEnNombre(){
    cy.get('#nombre').click();
    cy.wait(400)
  }

  ingresarFecha(fechaEntrenamiento){
    cy.get('#fecha_entrenamiento').type(fechaEntrenamiento)
    cy.wait(400)
  }

  ingresaNombreEjercicio(nombreEjercicio){

      cy.get('#ejercicios').select('f1c027e5-c810-4f63-a662-d208c1c3d8ab')
      cy.wait(400)

  }
  seleccionEjercicio() {
    // Seleccionar 2 o 3 ejercicios
    const ejerciciosIds = [
      'f1c027e5-c810-4f63-a662-d208c1c3d8ab'
    ]

    ejerciciosIds.forEach(ejercicioId => {
      cy.get('#ejercicios').select(ejercicioId)
      cy.wait(400)
    })
  }

  ingresarRepeticiones(numeroRepeciones){
    cy.get('#numero_repeticiones').type(numeroRepeciones)
    cy.wait(400)
  }


  agregarEjercicio(){
    cy.get('#agregar_ejercicio').click()
    cy.wait(400)
  }

  guardarEntrenamiento(){
    cy.get('#guardar').click()
    cy.wait(400)
  }

  validarMsjExitoso(){
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Entrenamiento guardado correctamente')
      cy.wait(900)
    })

  }

}

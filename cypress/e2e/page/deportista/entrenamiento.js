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

  }

  ingresarFecha(fechaEntrenamiento){
    cy.get('#fecha_entrenamiento').type(fechaEntrenamiento)
  }

  ingresaNombreEjercicio(nombreEjercicio){

      //cy.get('select[name="ejercicios"]').select(nombreEjercicio);
      cy.get('#ejercicios').select('3d05ea31-aa8a-4e1d-84a1-ce5277a6ddcb')

  }
  seleccionEjercicio() {
    // Seleccionar 2 o 3 ejercicios
    const ejerciciosIds = [
      '3d05ea31-aa8a-4e1d-84a1-ce5277a6ddcb',
      '65ac15c9-0072-4f6c-92de-f5bee26f90bf',
      '1f8b4936-0a63-42dc-ae59-2eb347780038'
    ]

    ejerciciosIds.forEach(ejercicioId => {
      cy.get('#ejercicios').select(ejercicioId)
    })
  }

  ingresarRepeticiones(numeroRepeciones){
    cy.get('#numero_repeticiones').type(numeroRepeciones)
  }


  agregarEjercicio(){
    cy.get('#agregar_ejercicio').click()
    cy.wait(300)
  }

  guardarEntrenamiento(){
    cy.get('#guardar').click()
    cy.wait(300)
  }

  validarMsjExitoso(){
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Entrenamiento guardado correctamente')
    })
  }

}

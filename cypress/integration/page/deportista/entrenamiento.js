import { adminUrls } from "../../../fixtures/urls";

export class Entrenamiento {

  navegarEntrenamiento() {
    cy.visit(adminUrls.entrenamientoUrl);
      cy.wait(400)
  }

  ingresarNombre (nombreEntrenamiento){
    cy.get('.form-control[name="nombre"]').type(nombreEntrenamiento);
  }

  ingresarFecha(){
    cy.get('input#fecha_entrenamiento').type(fechaEntrenamiento);
  }

  seleccionEjercicio(fechaEntrenamiento){
    cy.get('select[name="ejercicios"]').find('option').contains(ejercicio).then(option => {
      cy.get('select[name="ejercicios"]').select(option.val());
    });
  }

  ingresarRepeticiones(numeroRepeciones){
    cy.get('input#numero_repeticiones')
  }


    agregarEjercicio(){
      cy.get('#agregar_ejercicio').click();
      cy.wait(300);

}

}

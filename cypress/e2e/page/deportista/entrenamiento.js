import { adminUrls} from "../../../fixtures/urls"
const {faker} = require ('@faker-js/faker')

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
  seleccionEjercicio() {
    // Obtener el contenido HTML de la página
    cy.get('app-nuevo-entrenamiento').then(($appNuevoEntrenamiento) => {
      const htmlContent = $appNuevoEntrenamiento.get(0).outerHTML;
      // Analizar el HTML y extraer las opciones del select
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      const selectElement = doc.querySelector('select[id="ejercicios"]');
      if (!selectElement) {
        throw new Error('No se encontró el elemento select');
      }
      const options = Array.from(selectElement.options).map((option) => option.value);
      // Verificar que el select tenga al menos una opción
      if (options.length === 0) {
        throw new Error('El select no tiene opciones');
      }
      // Obtener el número total de opciones
      const totalOptions = options.length;
      cy.log(`totalOptions: ${totalOptions}`);
      // Generar un número entero aleatorio entre 0 y el total de opciones menos 1
      const numeroAleatorio = faker.datatype.number({ min: 1, max: totalOptions -1 });
      cy.log(`numeroAleatorio: ${numeroAleatorio}`);
      // Seleccionar un ejercicio por índice
      const indiceEjercicio = options[numeroAleatorio];
      cy.get('select[id="ejercicios"]').select(indiceEjercicio);
      cy.get('select[id="ejercicios"]').should('have.value', indiceEjercicio);
      cy.wait(400)
    });
  }

  ingresarRepeticiones(numeroRepeciones){
    cy.get('#numero_repeticiones').type(numeroRepeciones)
    cy.wait(400)
  }
  agregarEjercicio(){
    cy.wait(400)
    cy.get('#agregar_ejercicio').click()
    cy.wait(400)
  }

  guardarEntrenamiento(){

    cy.get('#guardar').click({ force: true });
    cy.wait(400);
  }

  validarMsjExitoso(){
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Entrenamiento guardado correctamente')
      cy.wait(900)
    })

  }

}

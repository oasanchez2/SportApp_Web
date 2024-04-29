import {Entrenamiento} from "../../page/deportista/entrenamiento"
const {faker} = require ('@faker-js/faker')

const entrenamiento = new Entrenamiento();

describe('Funcionalidad F004: Ingresa funcionalidad entrenamiento', () => {
  it('Home SportApp', () => {
    entrenamiento.navegarEntrenamiento();
  })


  describe('Nuevo Entrenamiento - Escenarios Negativos', () => {
    beforeEach(() => {
      entrenamiento.navegarEntrenamiento();
    })

    it('F004.1.EA  No debe permitir nombres vacíos', () => {
      /**
      GIVE que el deportista navega al enlace Crear plan de entrenamiento, y selecciona la opción nombre de entrenamiento, y escribe un nombre
      WHEN el deportista intenta almacenar el dato
      THEN el botón Agregar ejercicio se encontrara inactivo al igual que el botón Guardar
      */

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

      entrenamiento.seleccionEjercicio();

      cy.get('#nombre').click();
      cy.get('#numero_repeticiones').click();
      cy.screenshot('No debe permitir nombres vacíos')
    })

  it('F004.2.EA No debe permitirse una fecha anterior a la fecha actual', () => {
    /**
    * GIVE que el deportista navega al enlace Crear plan de entrenamiento, y selecciona la opción fecha  de entrenamiento, y selecciona una fecha del calendario
    * WHEN el deportista seleccionar una fecha anterior a la actual
    * THEN  el calendario no mostrara habilitadas las fechas anteriores a la actual para ser seleccionadas, el botón Agregar entrenamiento se encontrara inactivo al igual que el botón Guardar.
    */
      // Llenar el campo 'fecha_entrenamiento' con una fecha pasada
    const pastDate = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0]
      entrenamiento.ingresarFecha(pastDate);

      entrenamiento.clicEnNombre();

      // Verificar que se muestre un mensaje de error
      cy.on('window:alert', (str) => {
        expect(str).to.contain('La fecha de entrenamiento no puede ser anterior a la fecha actual')
      })
    })

    it('F004.3.EA No debe permitir repeticiones negativa', () => {
/**
 * GIVE que el deportista navega al enlace Crear plan de entrenamiento, y selecciona el campo repeticiones e ingresa un número negativo
 * WHEN el deportista intenta almacenar las repeticiones ingresadas
 * THEN se mostrara un mensaje "El numero de repetición debe ser numérico" adicional, el botón Agregar entrenamiento se encontrara inactivo al igual que el botón Guardar.
 */
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
        //cy.screenshot('repeticiones-negativas')

    })

    it('F004.4.EA No debe permitir ingresar texto en repeticiones', () => {
      /**
       * GIVE que el deportista navega al enlace Crear plan de entrenamiento, y selecciona el campo repeticiones e ingresa caracteres alfanuméricos
      * WHEN el deportista intenta almacenar las repeticiones ingresadas
      * THEN se mostrara un mensaje "El numero de repetición debe ser numérico" adicional, el botón Agregar entrenamiento se encontrara inactivo al igual que el botón Guardar.
       */
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

    it('F004.5.EA No debe permitir agregar ejercicio sin seleccionar un ejercicio', () => {
/**
 * GIVE que el deportista navega al enlace Crear plan de entrenamiento, y registras todos los datos menos un ejercicio del listado de ejercicios
 * WHEN el deportista intenta almacenar el entrenamiento al dar clic en Guardar
* THEN se mostrara un mensaje "Debe seleccionar almenos un ejercicio" adicional.
 */
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

  describe('Nuevo Entrenamiento - Escenario Positivo', () => {
    beforeEach(() => {
      entrenamiento.navegarEntrenamiento();
    })

    it('F004.6.EA Debe seleccionar un ejercicio de la lista por índice', () => {
      /* GIVE que el deportista navega al enlace Crear plan de entrenamiento, y registra nombre, fecha número de repeticiones un ejercicio y selecciona un ejercicio del listado de ejercicios
     * WHEN el deportista da clic sobre el botón Agregar ejercicio
     * THEN se agrega el ejercicio al listado de ejercicios que son registrados para un entrenamiento y se almacena correctamente, mostrando el mensaje
    **/
      // Seleccionar un ejercicio
      entrenamiento.seleccionEjercicio();

      let nombreEntrenamiento = ' Cypress F004 6 EA'+faker.lorem.words();
      entrenamiento.ingresarNombre(nombreEntrenamiento);

      // Obtener la fecha actual
      let fechaActual = new Date();
      // Generar una fecha aleatoria utilizando faker
      //let fechaAleatoria = faker.date.recent();
      let fechaAleatoria = faker.date.future({ min: fechaActual });
      // Formatear la fecha en el formato deseado (YYYY-MM-DD HH:mm:ss)
      let fechaFormateada = fechaAleatoria.toISOString().split('T')[0]
      entrenamiento.ingresarFecha(fechaFormateada);


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

    it('F004.7.EA  Debe permitir nombres con longitud igual a 255 caracteres', () => {
      /**
      * GIVE que el deportista navega al enlace Crear plan de entrenamiento, y selecciona la opción nombre de entrenamiento, y escribe un nombre con 255 caracteres
      * WHEN el deportista intenta almacenar el dato
      * THEN el botón Agregar entrenamiento se encontrara activo al igual que el botón Guardar permitira el almacenado del registro.
      */
        let nombreEntrenamiento = 'GIVE que el deportista navega al enlace Crear plan de entrenamiento y selecciona la opción nombre de entrenamiento y escribe un nombre WHEN el deportista intenta almacenar el dato THEN el botón Agregar entrenamiento se encontrara inactivo al igual que e';
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
        //entrenamiento.guardarEntrenamiento();
        cy.screenshot('Nuevo-entrenamiento-guardarEntrenamiento')
      // Verificar que se guardó correctamente
     // entrenamiento.validarMsjExitoso;
      cy.screenshot('Nuevo-entrenamiento-validarMsjExitoso')
    });

    it('F004.8.EA Debe permitir ingreso de números positivos en Número repeticiones ', () => {
  /**
   * GIVE que el deportista navega al enlace Crear plan de entrenamiento, y selecciona el campo repeticiones e ingresa un número positivo
   * WHEN el deportista da clic sobre el botón Agregar ejercicio
   * THEN se mostrara el ejercicio en listado con el número de entrenamiento ingresado y el botón Guardar estará activo para almacenar el registro.
   */
        let nombreEntrenamiento = 'Cypress F004 8 EA'+faker.lorem.words();
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

        let numeroRepeciones = faker.datatype.number({ min: 1, max: 100 });
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

    it('F004.9.EA Debe permitirse seleccionar fecha  a la fecha actual o en el futuro ', () => {
      /**
      * GIVE que el deportista navega al enlace Crear plan de entrenamiento, y selecciona la opción fecha  de entrenamiento
      * WHEN el deportista seleccionar la fecha actual
      * THEN  el botón Agregar ejercicio se encontrara inactivo al igual que el botón Guardar.
      */
            let nombreEntrenamiento = 'Cypress F004 9 EA'+faker.lorem.words();
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

            let numeroRepeciones = faker.datatype.number({ min: 1, max: 100 });
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

})


# SportAppWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Cypress E2E

# CypressTest


## Estructura de Archivos

```
📦cypress
 ┣---📂 e2e
 ┃   ┣---📂 escenarios
 ┃   ┃   ┗---📂 aleatorio
 ┃   ┃       ┗---📜 escenarios_f001.spec.js
 ┃   ┗---📂 pages
 ┃   ┃   ┗---📂 deportista
 ┃   ┃       ┣---📜 calendario.js
 ┃   ┃       ┗---📜 entrenamiento.js
 ┣---📂 fixtures
 ┃   ┗---📜 urls.json
 ┣---📂 plugins
 ┃   ┗---📜 index.js
 ┣---📂 screenshots
 ┃    ┗---📜escenario_Entrenamiento.cy.js
 ┣---📂 support
 ┃   ┣---📜 commands.js
 ┣   ┗---📜 e2e.js
 ┗---📂videos
     ┗---📜escenario_Entrenamiento.cy.js.mp4

```

## Dependecias y Versionamiento

A continuación, se presentan las dependencias principales para la ejecución de las pruebas Cypress.

| Dependencia | Versión  |
| ----------- | -------- |
| NodeJs      | v20.9.0  |
| Npm         | 10.5.1   |
| Cypress     | ^13.8.0  |
| SportApp    | 1.0.0    |
| faker       | ^8.4.1   |

## Instalación y Configuraciones

`Importante!` Todos los comandos que se muestran a continuación deben ser ejecutados utilizando la carpeta `SportApp_Web` como la raíz (root) del proyecto.

Para poder hacer uso de los escenarios de prueba establecidos, es necesario ejecutar los siguientes comandos en la terminal (en caso de utilizar Windos SO, se recomienda hacer uso de powershell)

```shell
npm install
```

Este proyecto hace uso, principalmente, de 2 dependencias: `cypress`, `@faker-js/faker` (generación de datos para pruebas). Los siguientes comandos muestran cómo hacer la instalación de estas dependencias

```shell
npm install cypress --save-dev
npm install @faker-js/faker --save-dev
```

### Credenciales SportApp 
Adicionalmente a la instalación de dependencias, los scripts de pruebas requieren de las credenciales del usuario creado previamente, sin embargo para la primera versión creada esto no será necesario.Posterior a esta versión, se tendra el archivo `user.json` en donde se debe colocar tanto el correo como la contraseña del usuario.

~~~
    Aviso: Dado que se necesitan las credenciales del usuario, se espera
    que la aplicación SportApp cuente con un usuario deportista creado previamente. En
    caso de no tener dicho usuario, dirigirse a la página de Login para la
    creación del usuario.
    
    Setup: http://<url>:<port>/SportApp/#/user -->>Enlace en construcción.
~~~


## Despliegue

### Despliegue Aplicación Ghost

Antes de poder ejecutar las pruebas de Cypress, es necesario el despliegue de la aplicación SportApp en la versión que se desea probar. para ello, se debe ejecutar el siguiente comando dentro de la carpeta raíz de la aplicación Ghost

```shell
ng serve
```

### Ejecución de Pruebas Cypress
Para desplegar el proyecto, se debe ejecutar alguno de los siguientes comandos

```shell
# Utilizando el comando definido en pagake.json permite que cypress abra el navegador y permita que el usuario visualice la ejecución de pruebas
npx cypress open

#Al ejecutar el siguiente comando en la raíz del proyecto permite ejecutar las pruebas en consola y generar el reporte del estado de las pruebas.
npx cypress run

# Directamente desde node_modules
./node_modules/.bin/cypress open
```

Una vez la aplicación de Cypress haya sido desplegada, es posible ejecutar las pruebas al seleccionar alguno de los archivos de la carpeta 📂  `escenarios`.

## Further help 

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

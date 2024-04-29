import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  screenshotsFolder: 'cypress/screenshots', // Carpeta donde se guardarán las capturas de pantalla
  //screenshotOnRunFailure: true,
  videosFolder: 'cypress/videos', // Carpeta donde se guardarán los videos
  video: true, // Habilitar la grabación de video
});
/*
import { defineConfig } from "cypress";

export default defineConfig({
  // Carpeta donde se guardarán las capturas de pantalla
  screenshotsFolder: "cypress/screenshots",

  //screenshotOnRunFailure: true,
  // Carpeta donde se guardarán los videos
  videosFolder: "cypress/videos",

  // Habilitar la grabación de video
  video: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});*/

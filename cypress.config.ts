/*import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});*/
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  //screenshotsFolder: 'cypress/screenshots', // Carpeta donde se guardarán las capturas de pantalla
  //screenshotOnRunFailure: true,
  //videosFolder: 'cypress/videos', // Carpeta donde se guardarán los videos
  //video: true, // Habilitar la grabación de video
});


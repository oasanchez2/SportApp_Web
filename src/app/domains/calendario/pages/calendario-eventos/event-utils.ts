/*import { EventInput } from '@fullcalendar/core';
import faker from 'faker';

const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
export const INITIAL_EVENTS: EventInput[] = generateRandomEvents(3); // Genera 3 eventos aleatorios

export function createEventId() {
  return faker.random.uuid(); // Utiliza Faker para generar un ID único para cada evento
}

// Función para generar eventos aleatorios utilizando Faker
export function generateRandomEvents(numEvents: number): EventInput[] {
  const events: EventInput[] = [];

  for (let i = 0; i < numEvents; i++) {
    const title = faker.lorem.words(); // Genera un título aleatorio utilizando Faker
    const start = faker.date.between(TODAY_STR, '2024-12-31').toISOString(); // Genera una fecha aleatoria entre hoy y el 31 de diciembre de 2025

    // Crea un evento con el título y la fecha aleatorios
    const event: EventInput = {
      id: createEventId(),
      title: title,
      start: start
    };

    events.push(event);
  }

  return events;
}
import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00'
  }
];

export function createEventId() {
  return String(eventGuid++);
}
*/
import { EventInput } from '@fullcalendar/core';

// Función para generar un ID único para cada evento
let eventGuid = 0;
export function createEventId() {
  return String(eventGuid++);
}

// Función para generar eventos aleatorios en diferentes días y horas
export function generateRandomEvents(numEvents: number): EventInput[] {
  const events: EventInput[] = [];
  const TODAY = new Date(); // Fecha actual
  const MS_IN_DAY = 24 * 60 * 60 * 1000; // Milisegundos en un día

  for (let i = 0; i < numEvents; i++) {
    // Genera un título aleatorio para el evento
    const title = `Entrenamiento ${i + 1}`;

    // Calcula una fecha aleatoria para el evento dentro de los próximos 30 días
    const randomDate = new Date(TODAY.getTime() + Math.floor(Math.random() * 30) * MS_IN_DAY);

    // Genera una hora aleatoria para el evento
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    randomDate.setHours(randomHours, randomMinutes, 0, 0);

    // Crea el evento con los datos generados aleatoriamente
    const event: EventInput = {
      id: createEventId(),
      title: title,
      start: randomDate
    };

    // Agrega el evento al array de eventos
    events.push(event);
  }

  return events;
}

// Genera eventos aleatorios y los asigna a la constante INITIAL_EVENTS
export const INITIAL_EVENTS: EventInput[] = generateRandomEvents(30); // Genera 30 eventos aleatorios



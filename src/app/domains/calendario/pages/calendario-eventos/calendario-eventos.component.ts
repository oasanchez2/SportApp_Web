import { Component,signal, inject,ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi,EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { INITIAL_EVENTS, createEventId } from './event-utils';


import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr'
import { Entrenamientos, EntrenamientoJson } from '../../../shared/models/entrenamientos.model';
import { EntrenamientosService } from './../../../shared/services/entrenamiento/entrenamientos.service';
import { EventosService } from '../../../shared/services/eventos/eventos.service';
import { co } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-calendario-eventos',
  standalone: true,
  imports: [CommonModule
            , FullCalendarModule
            ,TranslateModule
            ,CommonModule
            ,ReactiveFormsModule],
  templateUrl: './calendario-eventos.component.html',
  styleUrl: './calendario-eventos.component.css'
})
export class CalendarioEventosComponent implements OnInit{

  private entrenamientoService = inject(EntrenamientosService);
  private eventosService = inject(EventosService);
  entrenamientos = signal<Entrenamientos[]>([]);
  eventosCalendario = signal<EventInput[]>([])

  localeEsSelected: boolean = true;
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    locales:[esLocale],
    locale: 'en',
    initialView: 'dayGridMonth',
    initialEvents: [],//INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private translate: TranslateService
  ){
  }

  ngOnInit() {
    this.getEventosDeportista('07adc016-82eb-4c92-b722-0e80ebfdcfe5');
    this.cambiarIdioma(this.translate.currentLang)
    
    this.translate.onLangChange.subscribe(langChangeEvent => {
      // When the language changes, update the calendar's locale
      this.cambiarIdioma(langChangeEvent.lang);
    });
  }

  cambiarIdioma(locale: string = 'ingles'){
    if(locale == "español"){
      locale = "es";
    }else if(locale == "ingles"){
      locale = "en";
    };
    this.calendarOptions.update((options) => ({
      ...options,
      locale: locale
    }))
  }
  getEventosDeportista(idDeportista: string){
    const events: EventInput[] = [];

    this.eventosService.getEventosDeportista(idDeportista)
      .subscribe({
        next: (evento) => {
          evento.forEach((e) => {
            const event: EventInput = {
              id: e.id_evento,
              title: e.evento.nombre,
              start: e.evento.fecha_evento
            };
            events.push(event);
          });
        },
        error: (err) => {
          console.error(err);
        }
      });

    this.entrenamientoService.getEntrenamientoDeportista(idDeportista)
    .subscribe({
      next: (entrenamientos) => {          
        entrenamientos.forEach((e) => {
          const event: EventInput = {
            id: e.id_entrenamiento,
            title: e.nombre,
            start: e.fecha_entrenamiento
          };
          events.push(event);
        });      
      },
      error: (err) => {
        console.error(err);
      }
    }); 

    this.calendarOptions.update((options) => ({
      ...options,
      initialEvents: events
    }));

  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleLocaleEs(event: any){
    const locale = event.target.checked ? 'es' : 'en';
    this.calendarOptions.update((options) => ({
      ...options,
      locale: locale
    }))
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

}

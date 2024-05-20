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
import { AuthService } from '../../../shared/services/auth/auth.service';
import { co } from '@fullcalendar/core/internal-common';
import { forkJoin } from 'rxjs';

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
  private authService = inject(AuthService);
  entrenamientos = signal<Entrenamientos[]>([]);
  eventosCalendario = signal<EventInput[]>([])

  events: any[] = [];

  localeEsSelected: boolean = true;
  calendarVisible = signal(true);
  calendarOptions2: CalendarOptions = {};

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
    this.getEventosDeportista(this.authService.getIdUsuario());
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
    if(idDeportista){

      forkJoin([
        this.eventosService.getEventosDeportista(idDeportista),
        this.entrenamientoService.getEntrenamientoDeportista(idDeportista)
      ]).subscribe({
        next: ([eventos, entrenamientos]) => {
          eventos.forEach((e) => {
            const event = { title: e.evento.nombre, date: e.evento.fecha_evento };
            this.events.push(event);
          });

          entrenamientos.forEach((e) => {
            const event = { title: e.nombre, date: e.fecha_entrenamiento };
            this.events.push(event);
          });

          this.updateCalendarOptions();
        },
        error: (err) => {
          console.error(err);
        }
      });


    }
  }

  updateCalendarOptions(): void {
    this.calendarOptions2 = {
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
      initialEvents: this.events,//INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
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
    };
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

import { Component,signal, inject,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { options } from '@fullcalendar/core/preact';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr'
import { HeaderComponent } from './../../../shared/components/header/header.component'
import { Entrenamientos, EntrenamientoJson } from '../../../shared/models/entrenamientos.model';
import { EntrenamientosService } from './../../../shared/services/entrenamiento/entrenamientos.service';





@Component({
  selector: 'app-calendario-eventos',
  standalone: true,
  imports: [CommonModule
            , FullCalendarModule
            ,TranslateModule
            ,CommonModule
            ,ReactiveFormsModule
            ,HeaderComponent],
  templateUrl: './calendario-eventos.component.html',
  styleUrl: './calendario-eventos.component.css'
})
export class CalendarioEventosComponent {

  private entrenamientoService = inject(EntrenamientosService);
  entrenamientos = signal<Entrenamientos[]>([]);

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
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
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
    private toastr:ToastrService
  ){
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
/*
  getEntrenamientosLista(){
    this.entrenamientoService.getEntrenamientos()
    .subscribe({
      next: (entrenamientos) => {
        this.ejercicios.set(ejercicios);
      },
      error: () => {

      }
    })
  }*/

}

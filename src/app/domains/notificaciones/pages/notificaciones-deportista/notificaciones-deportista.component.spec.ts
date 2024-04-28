import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesDeportistaComponent } from './notificaciones-deportista.component';

describe('NotificacionesDeportistaComponent', () => {
  let component: NotificacionesDeportistaComponent;
  let fixture: ComponentFixture<NotificacionesDeportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionesDeportistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificacionesDeportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

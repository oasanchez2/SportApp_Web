import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEntrenamientoComponent } from './nuevo-entrenamiento.component';

describe('NuevoEntrenamientoComponent', () => {
  let component: NuevoEntrenamientoComponent;
  let fixture: ComponentFixture<NuevoEntrenamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoEntrenamientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevoEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

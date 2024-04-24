import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProductoServicioComponent } from './nuevo-producto-servicio.component';

describe('NuevoProductoServicioComponent', () => {
  let component: NuevoProductoServicioComponent;
  let fixture: ComponentFixture<NuevoProductoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoProductoServicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevoProductoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

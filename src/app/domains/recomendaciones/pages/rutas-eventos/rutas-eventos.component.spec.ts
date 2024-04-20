import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasEventosComponent } from './rutas-eventos.component';

describe('RutasEventosComponent', () => {
  let component: RutasEventosComponent;
  let fixture: ComponentFixture<RutasEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutasEventosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RutasEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

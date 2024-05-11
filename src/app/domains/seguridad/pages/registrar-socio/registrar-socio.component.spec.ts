import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSocioComponent } from './registrar-socio.component';

describe('RegistrarSocioComponent', () => {
  let component: RegistrarSocioComponent;
  let fixture: ComponentFixture<RegistrarSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarSocioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

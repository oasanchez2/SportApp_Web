import { ComponentFixture, TestBed } from '@angular/core/testing';

import { verificarMfaComponent } from './verificar-mfa.component';

describe('ActivarMfaComponent', () => {
  let component: verificarMfaComponent;
  let fixture: ComponentFixture<verificarMfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [verificarMfaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(verificarMfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

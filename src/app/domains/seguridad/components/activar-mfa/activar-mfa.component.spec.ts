import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarMfaComponent } from './activar-mfa.component';

describe('ActivarMfaComponent', () => {
  let component: ActivarMfaComponent;
  let fixture: ComponentFixture<ActivarMfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivarMfaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivarMfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

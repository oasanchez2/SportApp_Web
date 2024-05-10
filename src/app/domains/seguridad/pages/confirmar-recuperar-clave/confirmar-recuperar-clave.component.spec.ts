import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarRecuperarClaveComponent } from './confirmar-recuperar-clave.component';

describe('ConfirmarRecuperarClaveComponent', () => {
  let component: ConfirmarRecuperarClaveComponent;
  let fixture: ComponentFixture<ConfirmarRecuperarClaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarRecuperarClaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmarRecuperarClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

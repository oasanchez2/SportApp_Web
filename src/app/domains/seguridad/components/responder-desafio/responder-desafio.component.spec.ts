import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderDesafioComponent } from './responder-desafio.component';

describe('ResponderDesafioComponent', () => {
  let component: ResponderDesafioComponent;
  let fixture: ComponentFixture<ResponderDesafioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponderDesafioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponderDesafioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

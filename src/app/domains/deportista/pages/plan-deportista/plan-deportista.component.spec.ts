import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDeportistaComponent } from './plan-deportista.component';

describe('PlanDeportistaComponent', () => {
  let component: PlanDeportistaComponent;
  let fixture: ComponentFixture<PlanDeportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanDeportistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanDeportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

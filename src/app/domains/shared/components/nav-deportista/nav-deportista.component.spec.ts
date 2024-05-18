import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDeportistaComponent } from './nav-deportista.component';

describe('NavDeportistaComponent', () => {
  let component: NavDeportistaComponent;
  let fixture: ComponentFixture<NavDeportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavDeportistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavDeportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

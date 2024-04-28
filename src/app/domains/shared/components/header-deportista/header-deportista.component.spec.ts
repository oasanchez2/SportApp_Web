import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDeportistaComponent } from './header-deportista.component';

describe('HeaderDeportistaComponent', () => {
  let component: HeaderDeportistaComponent;
  let fixture: ComponentFixture<HeaderDeportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDeportistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderDeportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

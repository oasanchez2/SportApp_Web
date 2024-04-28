import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDeportistaComponent } from './layout-deportista.component';

describe('LayoutDeportistaComponent', () => {
  let component: LayoutDeportistaComponent;
  let fixture: ComponentFixture<LayoutDeportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutDeportistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutDeportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

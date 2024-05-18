import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSocioComponent } from './nav-socio.component';

describe('NavSocioComponent', () => {
  let component: NavSocioComponent;
  let fixture: ComponentFixture<NavSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavSocioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

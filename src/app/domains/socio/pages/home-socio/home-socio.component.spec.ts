import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSocioComponent } from './home-socio.component';

describe('HomeSocioComponent', () => {
  let component: HomeSocioComponent;
  let fixture: ComponentFixture<HomeSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSocioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

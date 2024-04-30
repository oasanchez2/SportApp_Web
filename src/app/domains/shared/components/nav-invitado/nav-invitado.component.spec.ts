import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavInvitadoComponent } from './nav-invitado.component';

describe('NavInvitadoComponent', () => {
  let component: NavInvitadoComponent;
  let fixture: ComponentFixture<NavInvitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavInvitadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

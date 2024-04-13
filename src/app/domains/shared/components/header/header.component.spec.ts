import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({      
      imports: [HeaderComponent, TranslateModule.forRoot(), CommonModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService); // Obtener instancia del servicio TranslateService
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
  it('should initialize langs array with available languages', () => {
    expect(component.langs.length).toBeGreaterThan(0);
  });
  */
  it('should change language', () => {
    spyOn(translateService, 'use');
    const lang = 'es';
    component.changeLang(lang);
    expect(translateService.use).toHaveBeenCalledWith(lang);
  });
/*
  it('should display language labels correctly', () => {
    const compiled = fixture.nativeElement;
    const langLabels = compiled.querySelectorAll('option');
    expect(langLabels.length).toBeGreaterThan(0); // Verifica que haya al menos una etiqueta de idioma
    expect(langLabels[0].textContent.trim()).toBe('English'); // Verifica que la primera etiqueta sea 'English'
    // Puedes agregar más expectativas para verificar el texto de otras etiquetas de idioma si es necesario
  });
*/
  it('should contain required HTML elements', () => {
    const compiled = fixture.nativeElement;
    const navElement = compiled.querySelector('nav');
    const h1Element = compiled.querySelector('h1');
    const imgElement = compiled.querySelector('img');
    const selectElement = compiled.querySelector('select');
    expect(navElement).toBeTruthy(); // Verifica la presencia del elemento <nav>
    expect(h1Element).toBeTruthy(); // Verifica la presencia del elemento <h1>
    expect(imgElement).toBeTruthy(); // Verifica la presencia del elemento <img>
    expect(selectElement).toBeTruthy(); // Verifica la presencia del elemento <select>
  });

  /*
  it('should handle language change event', () => {
    spyOn(translateService, 'use');
    const langSelect = fixture.nativeElement.querySelector('select');
    langSelect.value = 'es'; // Simula la selección de un idioma en el select
    langSelect.dispatchEvent(new Event('change')); // Dispara el evento change
    expect(translateService.use).toHaveBeenCalledWith('es'); // Verifica que se haya llamado al método use con el idioma seleccionado
  });

  it('should display translated text correctly', () => {
    const compiled = fixture.nativeElement;
    const h1Text = compiled.querySelector('h1').textContent.trim();
    const expectedH1Text = translateService.instant('SPORT_APP');
    expect(h1Text).toBe(expectedH1Text); // Verifica que el texto del h1 se haya traducido correctamente
    // Puedes agregar más expectativas para verificar la traducción de otros elementos si es necesario
  });
  */

});

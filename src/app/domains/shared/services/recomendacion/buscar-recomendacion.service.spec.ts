import { TestBed } from '@angular/core/testing';

import { BuscarRecomendacionService } from './buscar-recomendacion.service';

describe('BuscarRecomendacionService', () => {
  let service: BuscarRecomendacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarRecomendacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

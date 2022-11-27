import { TestBed } from '@angular/core/testing';

import { ItemVendaServiceService } from './item-venda.service.service';

describe('ItemVendaServiceService', () => {
  let service: ItemVendaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemVendaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

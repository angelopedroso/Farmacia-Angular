import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemVendaComponent } from './item-venda.component';

describe('ItemVendaComponent', () => {
  let component: ItemVendaComponent;
  let fixture: ComponentFixture<ItemVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemVendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

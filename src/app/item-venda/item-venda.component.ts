import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemVendaServiceService } from './item-venda.service.service';

declare var window: any;
@Component({
  selector: 'app-item-venda',
  templateUrl: './item-venda.component.html',
  styleUrls: ['./item-venda.component.css']
})
export class ItemVendaComponent implements OnInit {
  itemVendaForm : FormGroup = this.formBuilder.group({})

  
  constructor(
    private itemVendaService: ItemVendaServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
  }

}

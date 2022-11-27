import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemVendaService } from './item-venda.service';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
declare var window: any;

@Component({
  selector: 'app-item-venda',
  templateUrl: './item-venda.component.html',
  styleUrls: ['./item-venda.component.css']
})
export class ItemVendaComponent implements OnInit {
  editLabelPri:boolean = false;
  editLabelSec:boolean = false;
  
  itemVendaFormPri: FormGroup = this.formBuilder.group({
    id:0,
    cliente:0,
    farmaceutico:0,
  })
  itemVendaFormSec: FormGroup = this.formBuilder.group({
    medicamento:0,
    qtd:0,
  })
  
  editLabel: boolean = false;
  formModalPri: any;
  formModalSec: any;
  faEdit = faEdit;
  faTrash = faTrashAlt;

  constructor(
    private itemVendaService: ItemVendaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formModalPri = new window.bootstrap.Modal(
      document.getElementById('modalCliente')
    );
    this.formModalSec = new window.bootstrap.Modal(
      document.getElementById('modalCliente')
    );
  }

  openModalPri(){
    this.editLabelPri = true;
    this.itemVendaFormPri.reset();
    this.formModalPri.show();
  }

  openModelSec(){
    this.editLabelSec = true;
    this.itemVendaFormSec.reset();
    this.formModalSec.show();
  }

}

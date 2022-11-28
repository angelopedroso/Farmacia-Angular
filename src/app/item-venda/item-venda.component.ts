import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemVendaService } from './item-venda.service';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Cliente } from '../cliente/cliente.interface';
import { Farmaceutico } from '../farmaceutico/farmaceutico.interface';
import { Medicamento } from '../medicamento/medicamento.interface';
import { FarmaceuticoService } from '../farmaceutico/farmaceutico.service';
import { ClienteService } from '../cliente/cliente.service';
import { MedicamentoService } from '../medicamento/medicamento.service';
import { ItemVenda } from './item-venda.interface';
declare var window: any;

@Component({
  selector: 'item-venda',
  templateUrl: './item-venda.component.html',
  styleUrls: ['./item-venda.component.css']
})
export class ItemVendaComponent implements OnInit {
  
  itemVendaFormPri: FormGroup = this.formBuilder.group({
    id:0,
    cliente:0,
    farmaceutico:0,
  })
  itemVendaFormSec: FormGroup = this.formBuilder.group({
    medicamento:0,
    qtd:0,
  })

  nmCliente: string = '';
  formModalPri: any;
  formModalSec: any;
  enableAdd:boolean = false;
  faEdit = faEdit;
  faTrash = faTrashAlt;

  clientes: Cliente[] = [];
  farmaceuticos: Farmaceutico[] = [];
  medicamentos: Medicamento[] = [];

  constructor(
    private itemVendaService: ItemVendaService,
    private farmaceuticoService: FarmaceuticoService,
    private clienteService: ClienteService,
    private medicamentoService: MedicamentoService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.formModalPri = new window.bootstrap.Modal(
      document.getElementById('modalCliente')
    );
    this.formModalSec = new window.bootstrap.Modal(
      document.getElementById('modalCliente')
    );

    this.list();
  }

  openModalPri(){
    this.itemVendaFormPri.reset();
    this.formModalPri.show();
  }

  openModelSec(){
    //this.medicamentos = this.medicamentoService.getMedicamentos();
    
    this.itemVendaFormSec.reset();
    this.formModalSec.show();
  }

  list(){
    this.clienteService.getClientes().subscribe(
      (clientes) => {
        this.clientes = clientes;
      },
      erro => {
        console.log('Erro: ', erro);
      }
    )

    this.farmaceuticoService.getFarmaceuticos().subscribe(
      (farmaceuticos) => {
        this.farmaceuticos = farmaceuticos;
      },
      erro => {
        console.log('Erro: ', erro);
      }
    )

    this.medicamentoService.getMedicamentos().subscribe(
      (medicamento) => {
        this.medicamentos = medicamento;
      },
      erro => {
        console.log('Erro: ', erro);
      }
    )
  }

  createList(){
    this.enableAdd = true;
    this.formModalPri.hide();

    const frmPri: ItemVenda = this.itemVendaFormPri.value;
    console.log(frmPri.idCliente);

    this.clienteService.getCliente(frmPri.idCliente).subscribe(
      (cliente) => {
        this.nmCliente = cliente.nome;
        console.log(this.nmCliente);
      },
      erro => {
        console.log('Erro: ', erro);
      }
    )
  }
}

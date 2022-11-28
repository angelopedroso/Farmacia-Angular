import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Cliente } from '../cliente/cliente.interface';
import { ClienteService } from '../cliente/cliente.service';
import { Medicamento } from '../medicamento/medicamento.interface';
import { MedicamentoService } from '../medicamento/medicamento.service';
import { ItemVenda } from './item-venda.interface';
import { ItemVendaService } from './item-venda.service';
declare var window: any;

@Component({
  selector: 'app-item-venda',
  templateUrl: './item-venda.component.html',
  styleUrls: ['./item-venda.component.css'],
})
export class ItemVendaComponent implements OnInit {
  itemVendaForm: FormGroup = this.formBuilder.group({
    id: 0,
    medicamentoId: 0,
    clienteId: 0,
    data: '2022-01-01',
    quant: 0,
  });

  editLabel: boolean = false;
  formModal: any;
  faEdit = faEdit;
  faTrash = faTrashAlt;
  itemVendas: ItemVenda[] = [];

  clientes: Cliente[] = [];
  medicamentos: Medicamento[] = [];

  constructor(
    private itemVendaService: ItemVendaService,
    private clienteService: ClienteService,
    private medicamentoService: MedicamentoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.list();

    this.clienteService.getClientes().subscribe(
      (clientes) => {
        this.clientes = clientes;
      },
      (erro) => {
        console.log('Erro: ', erro);
      }
    );

    this.medicamentoService.getMedicamentos().subscribe(
      (medicamentos) => {
        this.medicamentos = medicamentos;
      },
      (erro) => {
        console.log('Erro: ', erro);
      },
      () => {
        console.log('*');
      }
    );

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalItemVenda')
    );
  }

  openModal() {
    this.editLabel = true;

    this.itemVendaForm.reset(this.itemVendaForm);
    this.formModal.show();
    console.log(this.clientes.find((x) => x.id === 2));
  }

  list() {
    this.itemVendaService.getItemVendas().subscribe(
      (itemVendas) => {
        this.itemVendas = itemVendas;
      },
      (erro) => {
        console.log('Erro: ', erro);
      },
      () => {
        console.log('*');
      }
    );
  }

  remove(itemVenda: ItemVenda) {
    this.itemVendaService.remove(itemVenda).subscribe(
      () => this.list(),
      (erro) => {
        console.log('Erro: ', erro);
      },
      () => {
        console.log('*');
      }
    );
  }

  onEditHandler(id: any) {
    this.editLabel = false;
    this.itemVendaForm.reset(this.itemVendaForm);
    if (id) {
      this.itemVendaService.getItemVenda(id).subscribe(
        (itemVenda) => {
          this.itemVendaForm.patchValue(itemVenda);
          this.formModal.show();
        },
        (erro) => {
          console.log('Erro: ', erro);
        }
      );
    }
  }

  onSubmit() {
    const itemVenda: ItemVenda = this.itemVendaForm.value;

    if (itemVenda.id) {
      this.itemVendaService.update(itemVenda).subscribe(() => this.list());
    } else {
      this.itemVendaService.save(itemVenda).subscribe(() => this.list());
    }

    this.formModal.hide();
    // this.itemVendaForm.reset(this.itemVendaForm);
  }

  getName(id: any, cliente: boolean = false) {
    if (cliente) return this.clientes.find((x) => x.id === +id)?.nome;
    return this.medicamentos.find((x) => x.id === +id)?.nome;
  }

  calcTotal(quantity: number = 0, id: any) {
    const preco = this.medicamentos.find((x) => x.id === +id)?.preco;
    return quantity * (preco || 0);
  }
}

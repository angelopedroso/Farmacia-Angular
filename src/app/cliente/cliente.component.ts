import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Cliente } from './cliente.interface';
import { ClienteService } from './cliente.service';
declare var window: any;

@Component({
  selector: 'cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  clienteForm: FormGroup = this.formBuilder.group({
    id: 0,
    nome: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
    ],
    email: [null, Validators.email],
    fone: ['', [Validators.minLength(11), Validators.required]],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    nasc: '2000-01-01',
  });

  editLabel: boolean = false;
  formModal: any;
  faEdit = faEdit;
  faTrash = faTrashAlt;
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.list();

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalCliente')
    );
  }

  openModal() {
    this.editLabel = true;
    this.clienteForm.reset();
    this.formModal.show();
  }

  list() {
    this.clienteService.getClientes().subscribe(
      (clientes) => {
        this.clientes = clientes;
      },
      (erro) => {
        console.log('Erro: ', erro);
      },
      () => {
        console.log('*');
      }
    );
  }

  remove(cliente: Cliente) {
    this.clienteService.remove(cliente).subscribe(
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
    this.clienteForm.reset();
    if (id) {
      this.clienteService.getCliente(id).subscribe(
        (cliente) => {
          this.clienteForm.patchValue(cliente);
          this.formModal.show();
        },
        (erro) => {
          console.log('Erro: ', erro);
        }
      );
    }
  }

  onSubmit() {
    const cliente: Cliente = this.clienteForm.value;

    if (cliente.id) {
      this.clienteService.update(cliente).subscribe(() => this.list());
    } else {
      this.clienteService.save(cliente).subscribe(() => this.list());
    }

    this.formModal.hide();
    // this.clienteForm.reset();
  }
}

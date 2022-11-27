import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  formModal: any;
  faEdit = faEdit;
  faTrash = faTrashAlt;
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.list();
    const id = +this.activatedRoute.snapshot.params['id'];
    console.log(id);

    if (id) {
      this.clienteService.getCliente(id).subscribe(
        (cliente) => {
          this.clienteForm.patchValue(cliente);
        },
        (erro) => {
          console.log('Erro: ', erro);
        }
      );
    }
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalCliente')
    );
  }

  openModal() {
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

  onSubmit() {
    const cliente: Cliente = this.clienteForm.value;

    if (cliente.id) {
      this.clienteService.update(cliente).subscribe(() => this.redirect());
    } else {
      this.clienteService.save(cliente).subscribe(() => this.redirect());
    }

    this.formModal.hide();
    console.log(this.clientes);
    this.list();
  }

  redirect() {
    this.router.navigate(['/listagem']);
  }
}

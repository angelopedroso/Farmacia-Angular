import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Medicamento } from './medicamento.interface';
import { MedicamentoService } from './medicamento.service';
declare var window: any;

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.css'],
})
export class MedicamentoComponent implements OnInit {
  medicamentoForm: FormGroup = this.formBuilder.group({
    id: 0,
    nome: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
    ],
    preco: [0, Validators.required],
    dosagem: [null, Validators.required],
    desc: '',
    receita: [false, Validators.required],
  });

  editLabel: boolean = false;
  formModal: any;
  faEdit = faEdit;
  faTrash = faTrashAlt;
  medicamentos: Medicamento[] = [];

  constructor(
    private medicamentoService: MedicamentoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.list();

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalMedicamento')
    );
  }

  openModal() {
    this.editLabel = true;
    this.medicamentoForm.reset();
    this.formModal.show();
    // this.medicamentos.forEach((m) => console.log(m.receita));
  }

  list() {
    this.medicamentoService.getMedicamentos().subscribe(
      (medicamentos) => {
        this.medicamentos = medicamentos;
      },
      (erro) => {
        console.log('Erro: ', erro);
      }
    );
  }

  remove(medicamento: Medicamento) {
    this.medicamentoService.remove(medicamento).subscribe(
      () => this.list(),
      (erro) => {
        console.log('Erro: ', erro);
      }
    );
  }

  onEditHandler(id: any) {
    this.editLabel = false;
    this.medicamentoForm.reset();
    if (id) {
      this.medicamentoService.getMedicamento(id).subscribe(
        (medicamento) => {
          this.medicamentoForm.patchValue(medicamento);
        },
        (erro) => {
          console.log('Erro: ', erro);
        },
        () => {
          this.formModal.show();
        }
      );
    }
  }

  onSubmit() {
    const medicamento: Medicamento = this.medicamentoForm.value;

    if (medicamento.id) {
      this.medicamentoService.update(medicamento).subscribe(() => this.list());
    } else {
      this.medicamentoService.save(medicamento).subscribe(() => this.list());
    }

    this.formModal.hide();
    // this.medicamentoForm.reset();
  }
}

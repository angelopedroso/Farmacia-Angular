import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Farmaceutico } from './farmaceutico.interface';
import { FarmaceuticoService } from './farmaceutico.service';
declare var window: any;

@Component({
  selector: 'app-farmaceutico',
  templateUrl: './farmaceutico.component.html',
  styleUrls: ['./farmaceutico.component.css'],
})
export class FarmaceuticoComponent implements OnInit {
  farmaceuticoForm: FormGroup = this.formBuilder.group({
    id: 0,
    nome: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
    ],
    emailAdmin: [null, Validators.email],
    sexo: ['', Validators.required],
    crf: ['', [Validators.required, Validators.minLength(4)]],
    nasc: '2000-01-01',
  });

  editLabel: boolean = false;
  formModal: any;
  faEdit = faEdit;
  faTrash = faTrashAlt;
  farmaceuticos: Farmaceutico[] = [];

  constructor(
    private farmaceuticoService: FarmaceuticoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.list();

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalFarmaceutico')
    );
  }

  openModal() {
    this.editLabel = true;
    this.farmaceuticoForm.reset(this.farmaceuticoForm);
    this.formModal.show();
    this.farmaceuticos.forEach((f) => console.log(f.nasc));
  }

  list() {
    this.farmaceuticoService.getFarmaceuticos().subscribe(
      (farmaceuticos) => {
        this.farmaceuticos = farmaceuticos;
      },
      (erro) => {
        console.log('Erro: ', erro);
      },
      () => {
        console.log('*');
      }
    );
  }

  remove(farmaceutico: Farmaceutico) {
    this.farmaceuticoService.remove(farmaceutico).subscribe(
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
    this.farmaceuticoForm.reset(this.farmaceuticoForm);
    if (id) {
      this.farmaceuticoService.getFarmaceutico(id).subscribe(
        (farmaceutico) => {
          console.log(farmaceutico);
          this.farmaceuticoForm.patchValue(farmaceutico);
          this.formModal.show();
        },
        (erro) => {
          console.log('Erro: ', erro);
        }
      );
    }
  }

  onSubmit() {
    const farmaceutico: Farmaceutico = this.farmaceuticoForm.value;

    if (farmaceutico.id) {
      this.farmaceuticoService
        .update(farmaceutico)
        .subscribe(() => this.list());
    } else {
      this.farmaceuticoService.save(farmaceutico).subscribe(() => this.list());
    }

    this.formModal.hide();
    // this.farmaceuticoForm.reset(this.farmaceuticoForm);
  }
}

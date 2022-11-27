import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medicamento } from './medicamento.interface';

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  constructor(private http: HttpClient) {}

  getMedicamento(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(
      `${environment.apiUrl}/medicamentos/${id}`
    );
  }

  getMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(`${environment.apiUrl}/medicamentos`);
  }

  save(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(
      `${environment.apiUrl}/medicamentos`,
      medicamento
    );
  }

  update(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.put<Medicamento>(
      `${environment.apiUrl}/medicamentos/${medicamento.id}`,
      medicamento
    );
  }

  remove({ id }: Medicamento): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/medicamentos/${id}`);
  }
}

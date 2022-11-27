import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Farmaceutico } from './farmaceutico.interface';

@Injectable({
  providedIn: 'root',
})
export class FarmaceuticoService {
  constructor(private http: HttpClient) {}

  getFarmaceutico(id: number): Observable<Farmaceutico> {
    return this.http.get<Farmaceutico>(
      `${environment.apiUrl}/farmaceuticos/${id}`
    );
  }

  getFarmaceuticos(): Observable<Farmaceutico[]> {
    return this.http.get<Farmaceutico[]>(`${environment.apiUrl}/farmaceuticos`);
  }

  save(farmaceutico: Farmaceutico): Observable<Farmaceutico> {
    return this.http.post<Farmaceutico>(
      `${environment.apiUrl}/farmaceuticos`,
      farmaceutico
    );
  }

  update(farmaceutico: Farmaceutico): Observable<Farmaceutico> {
    return this.http.put<Farmaceutico>(
      `${environment.apiUrl}/farmaceuticos/${farmaceutico.id}`,
      farmaceutico
    );
  }

  remove({ id }: Farmaceutico): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/farmaceuticos/${id}`);
  }
}

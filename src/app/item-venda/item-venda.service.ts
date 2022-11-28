import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemVenda } from './item-venda.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemVendaService {
  constructor(private http: HttpClient) {}

  getItemVenda(id: number): Observable<ItemVenda> {
    return this.http.get<ItemVenda>(`${environment.apiUrl}/itemvendas/${id}`);
  }

  getItemVendas(): Observable<ItemVenda[]> {
    return this.http.get<ItemVenda[]>(`${environment.apiUrl}/itemvendas`);
  }

  save(itemVenda: ItemVenda): Observable<ItemVenda> {
    return this.http.post<ItemVenda>(
      `${environment.apiUrl}/itemvendas`,
      itemVenda
    );
  }

  update(itemVenda: ItemVenda): Observable<ItemVenda> {
    return this.http.put<ItemVenda>(
      `${environment.apiUrl}/itemvendas/${itemVenda.id}`,
      itemVenda
    );
  }

  remove({ id }: ItemVenda): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/itemvendas/${id}`);
  }
}

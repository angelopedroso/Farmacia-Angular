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

  //nao vejo necessidade de editar ou excluir uma compra depois de registrada. Quando for utilizado o recurso save é pq a compra ta dentro dos conformes
  getCompra(idCompra:number):Observable<ItemVenda>{
      return this.http.get<ItemVenda>(
        `${environment.apiUrl}/item-venda${idCompra}`
      );
    }
  getCompras(idCliente:number):Observable<ItemVenda[]>{
    return this.http.get<ItemVenda[]>(
      `${environment.apiUrl}/item-vendas${idCliente}`
    );
  }
  save(itemVenda:ItemVenda):Observable<ItemVenda>{
    return this.http.put<ItemVenda>(
      `${environment.apiUrl}/item-venda`, itemVenda
    );
  }
}


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

  
}

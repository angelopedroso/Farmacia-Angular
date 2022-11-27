import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClienteComponent } from './cliente/cliente.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FarmaceuticoComponent } from './farmaceutico/farmaceutico.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { MedicamentoComponent } from './medicamento/medicamento.component';
import { ItemVendaComponent } from './item-venda/item-venda.component';

registerLocaleData(localePt, 'pt');

const routes: Route[] = [
  {
    path: 'cliente',
    component: ClienteComponent,
  },
  {
    path: 'farmaceutico',
    component: FarmaceuticoComponent,
  },
  {
    path: 'medicamento',
    component: MedicamentoComponent,
  },
  {
    path: 'item-venda',
    component: ItemVendaComponent,
  },
  {
    path: '**',
    redirectTo: '/cliente',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    FarmaceuticoComponent,
    MedicamentoComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxMaskModule.forRoot({ dropSpecialCharacters: false }),
    FontAwesomeModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent],
})
export class AppModule {}

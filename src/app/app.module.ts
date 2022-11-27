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

const routes: Route[] = [
  {
    path: 'listagem',
    component: ClienteComponent,
  },
  // {
  //   path: 'cadastro',
  //   component: LivrosCadastroComponent,
  // },
  // {
  //   path: 'edicao/:id',
  //   component: LivrosCadastroComponent,
  // },
  {
    path: '**',
    redirectTo: '/listagem',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [AppComponent, ClienteComponent],
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

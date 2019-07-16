import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DbOperacoesSharedModule } from 'app/shared';
import {
  Tabela1Component,
  Tabela1DetailComponent,
  Tabela1UpdateComponent,
  Tabela1DeletePopupComponent,
  Tabela1DeleteDialogComponent,
  tabela1Route,
  tabela1PopupRoute
} from './';

const ENTITY_STATES = [...tabela1Route, ...tabela1PopupRoute];

@NgModule({
  imports: [DbOperacoesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    Tabela1Component,
    Tabela1DetailComponent,
    Tabela1UpdateComponent,
    Tabela1DeleteDialogComponent,
    Tabela1DeletePopupComponent
  ],
  entryComponents: [Tabela1Component, Tabela1UpdateComponent, Tabela1DeleteDialogComponent, Tabela1DeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DbOperacoesTabela1Module {}

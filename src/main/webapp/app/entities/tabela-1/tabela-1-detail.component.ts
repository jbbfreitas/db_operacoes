import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITabela1 } from 'app/shared/model/tabela-1.model';

@Component({
  selector: 'jhi-tabela-1-detail',
  templateUrl: './tabela-1-detail.component.html'
})
export class Tabela1DetailComponent implements OnInit {
  tabela1: ITabela1;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tabela1 }) => {
      this.tabela1 = tabela1;
    });
  }

  previousState() {
    window.history.back();
  }
}

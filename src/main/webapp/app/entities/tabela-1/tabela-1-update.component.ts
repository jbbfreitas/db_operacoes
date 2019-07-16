import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { ITabela1, Tabela1 } from 'app/shared/model/tabela-1.model';
import { Tabela1Service } from './tabela-1.service';

@Component({
  selector: 'jhi-tabela-1-update',
  templateUrl: './tabela-1-update.component.html'
})
export class Tabela1UpdateComponent implements OnInit {
  tabela1: ITabela1;
  isSaving: boolean;
  date_visitDp: any;

  editForm = this.fb.group({
    id: [],
    point_id: [],
    date_visit: [],
    max_pdop: []
  });

  constructor(protected tabela1Service: Tabela1Service, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tabela1 }) => {
      this.updateForm(tabela1);
      this.tabela1 = tabela1;
    });
  }

  updateForm(tabela1: ITabela1) {
    this.editForm.patchValue({
      id: tabela1.id,
      point_id: tabela1.point_id,
      date_visit: tabela1.date_visit,
      max_pdop: tabela1.max_pdop
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tabela1 = this.createFromForm();
    if (tabela1.id !== undefined) {
      this.subscribeToSaveResponse(this.tabela1Service.update(tabela1));
    } else {
      this.subscribeToSaveResponse(this.tabela1Service.create(tabela1));
    }
  }

  private createFromForm(): ITabela1 {
    const entity = {
      ...new Tabela1(),
      id: this.editForm.get(['id']).value,
      point_id: this.editForm.get(['point_id']).value,
      date_visit: this.editForm.get(['date_visit']).value,
      max_pdop: this.editForm.get(['max_pdop']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITabela1>>) {
    result.subscribe((res: HttpResponse<ITabela1>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}

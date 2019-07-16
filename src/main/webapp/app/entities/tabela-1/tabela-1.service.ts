import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITabela1 } from 'app/shared/model/tabela-1.model';

type EntityResponseType = HttpResponse<ITabela1>;
type EntityArrayResponseType = HttpResponse<ITabela1[]>;

@Injectable({ providedIn: 'root' })
export class Tabela1Service {
  public resourceUrl = SERVER_API_URL + 'api/tabela-1-s';

  constructor(protected http: HttpClient) {}

  create(tabela1: ITabela1): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tabela1);
    return this.http
      .post<ITabela1>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tabela1: ITabela1): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tabela1);
    return this.http
      .put<ITabela1>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITabela1>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITabela1[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(tabela1: ITabela1): ITabela1 {
    const copy: ITabela1 = Object.assign({}, tabela1, {
      date_visit: tabela1.date_visit != null && tabela1.date_visit.isValid() ? tabela1.date_visit.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date_visit = res.body.date_visit != null ? moment(res.body.date_visit) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((tabela1: ITabela1) => {
        tabela1.date_visit = tabela1.date_visit != null ? moment(tabela1.date_visit) : null;
      });
    }
    return res;
  }
}

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Tabela1 } from 'app/shared/model/tabela-1.model';
import { Tabela1Service } from './tabela-1.service';
import { Tabela1Component } from './tabela-1.component';
import { Tabela1DetailComponent } from './tabela-1-detail.component';
import { Tabela1UpdateComponent } from './tabela-1-update.component';
import { Tabela1DeletePopupComponent } from './tabela-1-delete-dialog.component';
import { ITabela1 } from 'app/shared/model/tabela-1.model';

@Injectable({ providedIn: 'root' })
export class Tabela1Resolve implements Resolve<ITabela1> {
  constructor(private service: Tabela1Service) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITabela1> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Tabela1>) => response.ok),
        map((tabela1: HttpResponse<Tabela1>) => tabela1.body)
      );
    }
    return of(new Tabela1());
  }
}

export const tabela1Route: Routes = [
  {
    path: '',
    component: Tabela1Component,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Tabela1S'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: Tabela1DetailComponent,
    resolve: {
      tabela1: Tabela1Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tabela1S'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: Tabela1UpdateComponent,
    resolve: {
      tabela1: Tabela1Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tabela1S'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: Tabela1UpdateComponent,
    resolve: {
      tabela1: Tabela1Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tabela1S'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tabela1PopupRoute: Routes = [
  {
    path: ':id/delete',
    component: Tabela1DeletePopupComponent,
    resolve: {
      tabela1: Tabela1Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tabela1S'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

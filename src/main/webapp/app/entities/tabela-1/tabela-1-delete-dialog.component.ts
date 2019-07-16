import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITabela1 } from 'app/shared/model/tabela-1.model';
import { Tabela1Service } from './tabela-1.service';

@Component({
  selector: 'jhi-tabela-1-delete-dialog',
  templateUrl: './tabela-1-delete-dialog.component.html'
})
export class Tabela1DeleteDialogComponent {
  tabela1: ITabela1;

  constructor(protected tabela1Service: Tabela1Service, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tabela1Service.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tabela1ListModification',
        content: 'Deleted an tabela1'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tabela-1-delete-popup',
  template: ''
})
export class Tabela1DeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tabela1 }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(Tabela1DeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tabela1 = tabela1;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tabela-1', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tabela-1', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}

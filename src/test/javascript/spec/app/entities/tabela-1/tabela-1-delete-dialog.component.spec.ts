/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DbOperacoesTestModule } from '../../../test.module';
import { Tabela1DeleteDialogComponent } from 'app/entities/tabela-1/tabela-1-delete-dialog.component';
import { Tabela1Service } from 'app/entities/tabela-1/tabela-1.service';

describe('Component Tests', () => {
  describe('Tabela1 Management Delete Component', () => {
    let comp: Tabela1DeleteDialogComponent;
    let fixture: ComponentFixture<Tabela1DeleteDialogComponent>;
    let service: Tabela1Service;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DbOperacoesTestModule],
        declarations: [Tabela1DeleteDialogComponent]
      })
        .overrideTemplate(Tabela1DeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Tabela1DeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Tabela1Service);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});

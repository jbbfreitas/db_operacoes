/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DbOperacoesTestModule } from '../../../test.module';
import { Tabela1UpdateComponent } from 'app/entities/tabela-1/tabela-1-update.component';
import { Tabela1Service } from 'app/entities/tabela-1/tabela-1.service';
import { Tabela1 } from 'app/shared/model/tabela-1.model';

describe('Component Tests', () => {
  describe('Tabela1 Management Update Component', () => {
    let comp: Tabela1UpdateComponent;
    let fixture: ComponentFixture<Tabela1UpdateComponent>;
    let service: Tabela1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DbOperacoesTestModule],
        declarations: [Tabela1UpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(Tabela1UpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Tabela1UpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Tabela1Service);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tabela1(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tabela1();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DbOperacoesTestModule } from '../../../test.module';
import { Tabela1DetailComponent } from 'app/entities/tabela-1/tabela-1-detail.component';
import { Tabela1 } from 'app/shared/model/tabela-1.model';

describe('Component Tests', () => {
  describe('Tabela1 Management Detail Component', () => {
    let comp: Tabela1DetailComponent;
    let fixture: ComponentFixture<Tabela1DetailComponent>;
    const route = ({ data: of({ tabela1: new Tabela1(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DbOperacoesTestModule],
        declarations: [Tabela1DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(Tabela1DetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Tabela1DetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tabela1).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

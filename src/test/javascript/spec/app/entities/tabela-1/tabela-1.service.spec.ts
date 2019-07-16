/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { Tabela1Service } from 'app/entities/tabela-1/tabela-1.service';
import { ITabela1, Tabela1 } from 'app/shared/model/tabela-1.model';

describe('Service Tests', () => {
  describe('Tabela1 Service', () => {
    let injector: TestBed;
    let service: Tabela1Service;
    let httpMock: HttpTestingController;
    let elemDefault: ITabela1;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(Tabela1Service);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Tabela1(0, 'AAAAAAA', currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            date_visit: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Tabela1', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date_visit: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date_visit: currentDate
          },
          returnedFromService
        );
        service
          .create(new Tabela1(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Tabela1', async () => {
        const returnedFromService = Object.assign(
          {
            point_id: 'BBBBBB',
            date_visit: currentDate.format(DATE_FORMAT),
            max_pdop: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date_visit: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Tabela1', async () => {
        const returnedFromService = Object.assign(
          {
            point_id: 'BBBBBB',
            date_visit: currentDate.format(DATE_FORMAT),
            max_pdop: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date_visit: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Tabela1', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

import { Moment } from 'moment';

export interface ITabela1 {
  id?: number;
  point_id?: string;
  date_visit?: Moment;
  max_pdop?: number;
}

export class Tabela1 implements ITabela1 {
  constructor(public id?: number, public point_id?: string, public date_visit?: Moment, public max_pdop?: number) {}
}

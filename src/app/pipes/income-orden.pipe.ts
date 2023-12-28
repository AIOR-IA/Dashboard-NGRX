import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpense } from '../models/income-expenses.model';

@Pipe({
  name: 'incomeOrden'
})
export class IncomeOrdenPipe implements PipeTransform {

  transform( items: IncomeExpense[] ): IncomeExpense[] {
    const sortItems = [...items];

    return sortItems.sort((a, b) => {
      if (a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}

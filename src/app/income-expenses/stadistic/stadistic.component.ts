import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpense } from 'src/app/models/income-expenses.model';
import { setItems } from '../income-expende.actions';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-stadistic',
  templateUrl: './stadistic.component.html',
  styleUrls: ['./stadistic.component.css']
})
export class StadisticComponent implements OnInit {

  private store = inject( Store<AppState> );

  incomes : number = 0;
  expenses: number = 0;

  totalIncomes :number = 0;
  totalExpenses:number = 0;

  // Doughnut
  public doughnutChartLabels: string[] = [ 'Expose Sales', 'Income Sales' ];
  public doughnutChartData!: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';


  ngOnInit(): void {
    this.store.select('incomeExpense')
      .subscribe( ({ items }) => this.generateStadistic( items ));
  }

  generateStadistic( items: IncomeExpense[] ) {
    this.resetIncomeExpenseValues();
    for (const item of items) {
      if( item.type === 'income'){
        this.totalIncomes += parseFloat(item.amount);
        this.incomes++;
      } else {
        this.totalExpenses += parseFloat(item.amount);
        this.expenses++;
      }
    }
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [ this.totalExpenses, this.totalIncomes, ] },
      ],
    };
  }

  resetIncomeExpenseValues() {
    this.totalExpenses = 0;
    this.totalIncomes = 0;
    this.incomes = 0;
    this.expenses = 0;
  }
}

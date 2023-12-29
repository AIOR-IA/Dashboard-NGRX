import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IncomeExpensesComponent } from './income-expenses.component';
import { StadisticComponent } from './stadistic/stadistic.component';
import { DetailComponent } from './detail/detail.component';
import { IncomeOrdenPipe } from '../pipes/income-orden.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { _incomeExpenseReducer } from './income-expense.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IncomeExpensesComponent,
    StadisticComponent,
    DetailComponent,
    IncomeOrdenPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomeExpense', _incomeExpenseReducer),
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutesModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class IncomeExpensesModule { }

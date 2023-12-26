import { Routes } from "@angular/router";
import { StadisticComponent } from "../income-expenses/stadistic/stadistic.component";
import { IncomeExpensesComponent } from "../income-expenses/income-expenses.component";
import { DetailComponent } from "../income-expenses/detail/detail.component";

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard', component: StadisticComponent
  },
  {
    path: 'income-expenses', component: IncomeExpensesComponent
  },
  {
    path: 'detail', component: DetailComponent
  }
]

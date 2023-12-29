import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription, filter } from 'rxjs';
import { IncomeExpenseService } from '../services/income-expense.service';
import * as actionsIncomeExpense from '../income-expenses/income-expende.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private store = inject( Store<AppState> );
  private incomeExpenseService = inject( IncomeExpenseService );
  private $userSubscription!: Subscription;
  private $incomesSubs!: Subscription;

  constructor() { }

  ngOnInit(): void {
   this.$userSubscription = this.store.select('user')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( ({user}) => {
        this.$incomesSubs = this.incomeExpenseService.initIncomesExpensesListener( user.uid )
          .subscribe( data => {
            this.store.dispatch( actionsIncomeExpense.setItems({ items: data }) );
          });
      });
  }
  ngOnDestroy(): void {
    this.$incomesSubs?.unsubscribe();
    this.$userSubscription?.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IncomeExpenseService } from '../services/income-expense.service';
import { IncomeExpense } from '../models/income-expenses.model';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as actionsUi from '../shared/ui.actions';
import { AppStateWithIncomes } from './income-expense.reducer';

type incomeExpense = 'income' | 'expense';

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styleUrls: ['./income-expenses.component.css']
})

export class IncomeExpensesComponent implements OnInit, OnDestroy {

  private incomeExpenseService = inject( IncomeExpenseService );
  private store = inject( Store<AppStateWithIncomes>);
  private $loadingSubs!: Subscription;

  public fb = inject( FormBuilder );
  public isLoading: boolean = false
  public type: incomeExpense = 'income';


  myForm:FormGroup = this.fb.group({
    description: [ '', [Validators.required, Validators.minLength(3) ]],
    amount:  [ 0, [ Validators.required, Validators.min(1)]],
    type: [ 'tre', ]
  })

  constructor() { }

  ngOnInit(): void {
    this.$loadingSubs = this.store.select('ui').subscribe( ui => {
       this.isLoading = ui.isLoading
    })
  }

  ngOnDestroy(): void {
    this.$loadingSubs.unsubscribe();
  }
  saveForm() {

    if(this.myForm.invalid) return;

    this.store.dispatch( actionsUi.isLoading() );

    const { description, amount } = this.myForm.value;
    const incomeExpense = new IncomeExpense( description, amount, this.type );

    this.incomeExpenseService.createIncomeExpense( incomeExpense )
      .then( () => {
        this.myForm.reset();
        this.store.dispatch( actionsUi.stopLoading() );
        Swal.fire('Register created', description, 'success');
      })
      .catch( error => {
        this.myForm.reset();
        this.store.dispatch( actionsUi.stopLoading() );
        Swal.fire('Error', error.message, 'error');
      })
  }

  reset() {
    this.myForm.reset();
  }
}

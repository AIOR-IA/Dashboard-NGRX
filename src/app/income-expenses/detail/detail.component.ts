import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpense } from 'src/app/models/income-expenses.model';
import { IncomeExpenseService } from '../../services/income-expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  private store = inject( Store<AppState> );
  public items: IncomeExpense[] = [];
  private $incomeSubs!: Subscription;
  private incomeExpenseService = inject( IncomeExpenseService );
  constructor() { }

  ngOnInit(): void {
    this.$incomeSubs = this.store.select('incomeExpense')
                                 .subscribe( ({items}) => this.items = items);
  }

  ngOnDestroy(): void {
    this.$incomeSubs.unsubscribe();
  }

  deleteItem( uidItem: string, description: string) {
    Swal.fire({
      title: "Are you sure?",
      text: `delete ${ description } ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.incomeExpenseService.deleteItemIncomeExpense(uidItem)
          .then( () => Swal.fire('Delete', 'Item deleted', 'success' ))
          .catch( error =>  Swal.fire('Error', error.message , 'error' ) )
      }
    });

  }
}

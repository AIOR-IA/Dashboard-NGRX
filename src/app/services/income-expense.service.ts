import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IncomeExpense } from '../models/income-expenses.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  private firestore    = inject( AngularFirestore );
  private authService = inject( AuthService );

  constructor() {
    const uid = this.authService.user;
    console.log(uid)
  }

  createIncomeExpense( incomeExpense : IncomeExpense) {
    delete incomeExpense.uid;
    const uid = this.authService.user;
    return this.firestore.doc(`${ uid?.uid }/income-expense`)
      .collection('items')
      .add({ ...incomeExpense })
      .then( (ref) => console.log('succesfull', ref) )
      .catch( error => console.log(error))
  }

  initIncomesExpensesListener( uid: string) {
    return this.firestore.collection(`${ uid }/income-expense/items`)
      .snapshotChanges()
      .pipe(
        map( snap => {
          return snap.map( doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as any
            };
          });
        })
      )
  }

  deleteItemIncomeExpense( uidItem: string ){
    const uidUser = this.authService.user?.uid;
    return this.firestore.doc(`${uidUser}/income-expense/items/${uidItem}`).delete();
  }
}

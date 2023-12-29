import { createReducer, on } from '@ngrx/store';
import { setItems, unsetItems } from './income-expende.actions';
import { IncomeExpense } from '../models/income-expenses.model';
import { AppState } from '../app.reducer';

export interface AppStateWithIncomes extends AppState {
  incomeExpense: State
}
export interface State {
    items: IncomeExpense[] ;
}

export const initialState: State = {
  items: [],
}

export const _incomeExpenseReducer = createReducer(initialState,

    on( setItems, ( state, { items } ) => ({ ...state, items: [...items] })),
    on( unsetItems, ( state ) => ({...state, items: [] }) )
);


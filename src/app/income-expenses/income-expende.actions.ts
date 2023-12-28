import { createAction, props } from '@ngrx/store';
import { IncomeExpense } from '../models/income-expenses.model';

export const setItems = createAction(
  '[IncomeExpense Component] setItems',
  props<{ items: IncomeExpense[] }>()
);

export const unsetItems = createAction('[IncomeExpense Component] unsetItems');

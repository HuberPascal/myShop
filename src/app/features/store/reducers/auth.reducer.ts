import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
  success: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  success: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.registerUserSuccess, (state) => ({
    ...state,
    success: true,
    error: null,
  })),
  on(AuthActions.registerUserFailure, (state, { error }) => ({
    ...state,
    success: false,
    error: error?.message || 'Unbekannter Fehler',
  }))
);

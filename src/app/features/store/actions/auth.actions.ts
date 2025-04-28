import { createAction, props } from '@ngrx/store';
import { IRegisterDto, RegisterDto } from '../../../api/api-client';

export const registerUser = createAction(
  '[Auth] Register User',
  props<{ user: RegisterDto }>()
);

export const registerUserSuccess = createAction('[Auth] Register User Success');

export const registerUserFailure = createAction(
  '[Auth] Register User Failure',
  props<{ error: any }>()
);

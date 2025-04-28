import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { RegisterDto } from '../../../api/api-client';
import { AuthActions } from '../../store/actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType } from '@ngrx/effects';

interface FormProfile {
  userName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  store = inject(Store);
  private _snackBar = inject(MatSnackBar);
  private actions$ = inject(Actions);

  ngOnInit() {
    this.actions$
      .pipe(ofType(AuthActions.registerUserSuccess))
      .subscribe(() => {
        this.openSnackBar('Registrierung erfolgreich!', 'OK');
      });

    this.actions$
      .pipe(ofType(AuthActions.registerUserFailure))
      .subscribe(({ error }) => {
        this.openSnackBar(
          'Registrierung fehlgeschlagen: ' +
            (error?.message || 'Unbekannter Fehler'),
          'OK'
        );
      });
  }

  registerForm = new FormGroup<FormProfile>({
    userName: new FormControl<string | null>('', [Validators.required]),
    email: new FormControl<string | null>('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$'),
    ]),
  });

  onSubmit() {
    console.warn(this.registerForm.value);

    const formData = this.registerForm.value;

    const registerDto = new RegisterDto({
      username: formData.userName ?? null,
      email: formData.email ?? null,
      password: formData.password ?? null,
    });

    this.store.dispatch(AuthActions.registerUser({ user: registerDto }));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}

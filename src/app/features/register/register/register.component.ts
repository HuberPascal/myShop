import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  registerForm = new FormGroup({
    gender: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
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
  });

  onSubmit() {
    console.warn(this.registerForm.value);
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}

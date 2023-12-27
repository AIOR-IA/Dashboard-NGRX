import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as actionsUi from '../../shared/ui.actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private fb          = inject(FormBuilder);
  private authService = inject(AuthService);
  private router      = inject(Router);
  private store       = inject(Store<AppState>);

  public isLoading: boolean = false;
  uiSubscription!: Subscription;
  constructor() { }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe( ui => {
                              this.isLoading = ui.isLoading;
                            });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  myForm:FormGroup = this.fb.group({
    email:    [ '' , [ Validators.required, Validators.email ]],
    password: [ '' , [ Validators.required, Validators.minLength(6) ]],
  });

  public saveUser() {

    if ( this.myForm.invalid ) return;

    this.store.dispatch( actionsUi.isLoading() )

    // Swal.fire({
    //   title: "Waiting Please.",
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // })

    const { email, password } = this.myForm.value;
    this.authService.loginUser(email, password)
      .then( credential => {
        // Swal.close();
        this.store.dispatch( actionsUi.stopLoading() )
        this.router.navigateByUrl('/dashboard');
      })
      .catch( error => {
        this.store.dispatch( actionsUi.stopLoading() )
        Swal.fire({
          title: "error",
          text: error.message,
          icon: "question"
        });
      });

  }
}

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as actionUi from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );
  private store       = inject( Store<AppState> );

  public isLoading: Boolean = false;
  private uiSubscription!: Subscription;
  constructor() { }

  myForm:FormGroup = this.fb.group({
    username: [ '' , [ Validators.required, Validators.minLength(4) ]],
    email:    [ '' , [ Validators.required, Validators.email ]],
    password: [ '' , [ Validators.required, Validators.minLength(6) ]],
  })

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui')
                                    .subscribe( ui => this.isLoading = ui.isLoading );
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  public saveUser() {
    if ( this.myForm.invalid ) return;

    this.store.dispatch( actionUi.isLoading() );

    const { username, email, password } = this.myForm.value;
    this.authService.createUser(username, email, password)
      .then( credentials => {
        this.store.dispatch( actionUi.stopLoading() );
        this.router.navigateByUrl('/login')
      })
      .catch( error => {
        this.store.dispatch( actionUi.stopLoading() );
        Swal.fire({
          title: "error",
          text: error.message,
          icon: "error"
        });
      })
  }

}

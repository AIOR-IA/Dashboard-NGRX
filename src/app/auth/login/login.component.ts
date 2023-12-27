import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private fb          = inject(FormBuilder);
  private authService = inject(AuthService);
  private router      = inject(Router);
  constructor() { }

  ngOnInit(): void {
  }

  myForm:FormGroup = this.fb.group({
    email:    [ '' , [ Validators.required, Validators.email ]],
    password: [ '' , [ Validators.required, Validators.minLength(6) ]],
  });

  public saveUser() {

    if ( this.myForm.invalid ) return;

    const { email, password } = this.myForm.value;
    this.authService.loginUser(email, password)
      .then( credential => {
        this.router.navigateByUrl('/dashboard');
      })
      .catch( error => {
        Swal.fire({
          title: "error",
          text: error.message,
          icon: "question"
        });
      });

  }
}

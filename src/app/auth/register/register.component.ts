import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private fb = inject(FormBuilder);
  private authService = inject( AuthService );
  private router = inject( Router )
  constructor() { }

  myForm:FormGroup = this.fb.group({
    username: [ '' , [ Validators.required, Validators.minLength(4) ]],
    email:    [ '' , [ Validators.required, Validators.email ]],
    password: [ '' , [ Validators.required, Validators.minLength(6) ]],

  })

  ngOnInit(): void {
  }

  public saveUser() {
    if ( this.myForm.invalid ) return;

    const { username, email, password } = this.myForm.value;
    this.authService.createUser(username, email, password)
      .then( credentials => {
        this.router.navigateByUrl('/dashboard')
      })
      .catch( error => {
        Swal.fire({
          title: "error",
          text: error.message,
          icon: "error"
        });
      })

  }

}

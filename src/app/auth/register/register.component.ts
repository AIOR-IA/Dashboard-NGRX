import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private fb = inject(FormBuilder)
  constructor() { }

  myForm:FormGroup = this.fb.group({
    username: [ '' , [ Validators.required, Validators.minLength(4) ]],
    email:    [ '' , [ Validators.required, Validators.email ]],
    password: [ '' , [ Validators.required, Validators.minLength(6) ]],

  })

  ngOnInit(): void {
  }

  public saveUser() {
    // if( this.myForm.valid ) {
    //     this.trimValues();
    //     this.shortenBlankSpaces();
    //     return;
    // }
    // else {
    //   this.myForm.markAllAsTouched();
    //   return;
    // }
    console.log(this.myForm.valid)
    console.log(this.myForm.value)

  }

}

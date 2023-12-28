import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private store = inject(Store<AppState>);
  public email: string = '';

  constructor() { }

  ngOnInit(): void {
    this.store.select('user')
      .pipe(
        filter( auth => auth.user !== null )
      )
      .subscribe( ({ user }) => this.email = user.email)
  }

}

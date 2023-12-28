import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { Observable, Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  private authService = inject( AuthService );
  private router      = inject( Router );
  private store       = inject( Store<AppState> );
  users: User = { uid: '', username: '', email: '' };
  private $userSubs!:Subscription;

  constructor() {}

  ngOnInit(): void {
    this.$userSubs = this.store.select('user')
      .pipe(
        filter( auth => auth.user != null)
      )
      .subscribe( ({ user }) => this.users = user );
  }


  ngOnDestroy(): void {
    this.$userSubs.unsubscribe();
  }

  logout() {
    this.authService.logout()
      .then( () => this.router.navigateByUrl('/login'));
  }
}

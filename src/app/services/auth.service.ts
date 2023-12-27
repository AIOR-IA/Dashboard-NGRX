import { Injectable, inject } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { Subscription, map } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth     = inject( AngularFireAuth );
  public firestore = inject( AngularFirestore );
  private store    = inject( Store<AppState> );

  private userSubscription!: Subscription;
  constructor( ) { }

  initAuthListener() {
    this.auth.authState.subscribe( fireUser => {
      console.log(fireUser)
      if( fireUser ) {
        console.log(`${ fireUser.uid}/user`);
        this.userSubscription =  this.firestore.doc(`${fireUser.uid}/user`).valueChanges()
          .subscribe(  userFirestore => {
            const user = User.fromFirebase( userFirestore );
            this.store.dispatch( authActions.setUser({ user }) );
          });
      } else {
        this.userSubscription.unsubscribe();
        this.store.dispatch( authActions.unsetUser() );
      }
    })
  }

  createUser(username: string, email: string, password : string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then( ({ user }) => {
        const newUser = new User( user!.uid, username, email);
        return this.firestore.doc(`${ user?.uid}/user`)
          .set( {...newUser} )
      })
  }

  loginUser(email: string, password : string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( user => user != null)
    )
  }
}

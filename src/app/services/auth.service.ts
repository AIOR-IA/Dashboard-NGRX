import { Injectable, inject } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject( AngularFireAuth );
  public firestore = inject( AngularFirestore );
  constructor( ) { }

  initAuthListener() {
    this.auth.authState.subscribe( fireUser => {
      console.log({fireUser});
      console.log(fireUser?.uid);
      console.log(fireUser?.email);
    })
  }

  createUser(username: string, email: string, password : string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then( ({ user }) => {
        const newUser = new User( user!.uid, username, email);
        return this.firestore.doc(`${ user?.uid}/user `)
          .set( newUser )
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

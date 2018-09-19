import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseServiceProvider {
  user: Observable<firebase.User>;

  constructor(private angularFireAuth :AngularFireAuth) {
    this.user = angularFireAuth.authState;
  }

   criarConta(user: User) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

   entrarConta(user: User) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }
  
  public sairConta() {
    console.log("é deu ");
     return this.angularFireAuth.auth.signOut(); 
    
  }
  resetarSenha(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }
}

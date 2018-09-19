import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/firebase-service/user';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { MainmenuPage } from '../mainmenu/mainmenu';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: User = new User();
  @ViewChild('form') form: NgForm;
  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private firebaseServiceProvider: FirebaseServiceProvider) {
      this.signOut();
  }
  public signOut() {
    this.firebaseServiceProvider.sairConta()
      .catch((error) => {
        console.error(error);
      });
  }
  signIn() {
    if (this.form.valid) {
      this.firebaseServiceProvider.entrarConta(this.user)
        .then(() => {
          this.navCtrl.setRoot(MainmenuPage);
        })
        .catch((error: any) => {
          let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuário está desativado.');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não foi encontrado.');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada não é valida.');
          }
          toast.present();
        });
    }
  }


}

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { User } from '../../providers/firebase-service/user';

import { HomePage } from '../home/home';
import { MainmenuPage } from '../mainmenu/mainmenu';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  user: User = new User();
  @ViewChild('form') form: NgForm;
  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private firebaseServiceProvider: FirebaseServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }
  createAccount() {
    if (this.form.valid) {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
      
      this.firebaseServiceProvider.criarConta(this.user)
      .then((user: any) => {
          
        toast.setMessage('Usuário cadastrado com sucesso.');
        toast.present();
        
        this.navCtrl.setRoot(MainmenuPage);
      })
      .catch((error: any) => {
        
        if (error.code  == 'auth/email-already-in-use') {
          toast.setMessage('O e-mail digitado já está em uso.');
        } if (error.code  == 'auth/invalid-email') {
          toast.setMessage('O e-mail digitado não é valido.');
        }  if (error.code  == 'auth/operation-not-allowed') {
          toast.setMessage('Não está habilitado criar usuários.');
        }  if (error.code  == 'auth/weak-password') {
          toast.setMessage('A senha digitada é muito fraca.');
        }
        toast.present();
      })
      ;
    }
  } 

}

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { MainmenuPage } from '../pages/mainmenu/mainmenu';
import { AngularFireAuth } from 'angularfire2/auth';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,afAuth: AngularFireAuth,private firebaseServiceProvider:FirebaseServiceProvider) {
   const  authObserver =  afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = MainmenuPage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      }
    });
    
    this.initializeApp();

    this.pages = [
      { title: 'Tela Principal', component:MainmenuPage},
      { title: 'Pesquisa', component:CadastroPage},
      { title: 'Cadastro', component:CadastroPage},
      { title: 'Sair',component:HomePage  }
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    
    this.nav.setRoot(page.component);
  }
}


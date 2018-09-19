import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { MainmenuPage } from '../pages/mainmenu/mainmenu';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { PesquisaPage } from '../pages/pesquisa/pesquisa';
import { ResultadoPage } from '../pages/resultado/resultado';

const firebaseconfig = {
  apiKey: "AIzaSyAWUR924M1DNAATH7VWcu1ykRMp3kWvcvc",
  authDomain: "pi04-fa1b8.firebaseapp.com",
  databaseURL: "https://pi04-fa1b8.firebaseio.com",
  projectId: "pi04-fa1b8",
  storageBucket: "pi04-fa1b8.appspot.com",
  messagingSenderId: "1089153629590"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PesquisaPage,
    ResultadoPage,
    MainmenuPage,
    CadastroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PesquisaPage,
    ResultadoPage,
    MainmenuPage,
    CadastroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider
  ]
})
export class AppModule {}

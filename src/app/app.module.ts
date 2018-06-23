import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, ToastController} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {HttpClient, HttpClientModule} from "@angular/common/http";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {VegetabledetailsPage} from "../pages/vegetabledetails/vegetabledetails";
import {IonicStorageModule} from "@ionic/storage";
import {DataProvider} from "../providers/data/data";
import {SynchroPage} from "../pages/synchro/synchro";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VegetabledetailsPage,
    SynchroPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    VegetabledetailsPage,
    SynchroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage
  ]
})

export class AppModule {}

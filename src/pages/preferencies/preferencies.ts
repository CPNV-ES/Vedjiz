import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PreferenciesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preferencies',
  templateUrl: 'preferencies.html',
})
export class PreferenciesPage {
  userName: String 

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public toastCtrl: ToastController) {
    this.storage.get("userName").then(name => {
      this.userName = name
    })
  }

  public abort() {
    this.navCtrl.setRoot(HomePage)
  }

  public prefForm() {
    this.storage.set("userName", this.userName).then(res =>{
      this.toastCtrl.create({ message: "Nom d'utilisateur enregistré",duration: 2000,cssClass: 'toastMessage'}).present()
      this.navCtrl.setRoot(HomePage)
    })
  }

}

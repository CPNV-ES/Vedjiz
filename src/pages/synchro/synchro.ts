import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {Storage} from '@ionic/storage';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../models/Product";
import {HomePage} from "../home/home";

/**
 * Generated class for the SynchroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-synchro',
  templateUrl: 'synchro.html',
})
export class SynchroPage {

  private dataProvider: DataProvider
  private dirtyProducts: Product[]
  private changes: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public httpClient: HttpClient, public toastCtrl: ToastController) {
    this.dataProvider = new DataProvider(storage,httpClient,toastCtrl,true)
    this.dirtyProducts = []
    this.changes = []
    // use lazy loading to handle async
    this.dataProvider.load().then(() => {
      this.dataProvider.products.forEach(product => {
        if (product.isDirty) {
          this.dirtyProducts.push(product)
          this.changes.push({id: product.id, stock: product.stock})
        }
      })
    })
  }

  public save() {
    this.httpClient.patch(DataProvider.apiURL + "/newstock",{changes: this.changes})
      .subscribe(
        data => {
          this.dirtyProducts.forEach(prod => {
            prod.isDirty = false
          })
          this.dataProvider.store()
          this.toastCtrl.create({ message: 'C\'est noté !!!',duration: 2000,cssClass: 'toastMessage'}).present()
          this.navCtrl.setRoot(HomePage)
        },
        err => {
          this.toastCtrl.create({ message: 'Refusé',duration: 2000,cssClass: 'toastMessage'}).present()
          console.log(err)
        }
      )
  }

  public abort() {
    this.navCtrl.setRoot(HomePage)
  }

}

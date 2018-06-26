import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {Storage} from '@ionic/storage';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../models/Product";
import {HomePage} from "../home/home";
import { Order } from '../../models/Order';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  product: Product
  order: Order

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public httpClient: HttpClient, public toastCtrl: ToastController) {
    this.product =  this.navParams.get("product")
  }
  
  abort(){
    this.navCtrl.setRoot(HomePage)
  }

  orderForm () {

    this.httpClient.patch(DataProvider.apiURL + "/newstock",{order: this.order})
      .subscribe(
        data => {
          this.toastCtrl.create({ message: "Commande passée !",duration: 2000,cssClass: 'toastMessage'}).present()
          this.navCtrl.setRoot(HomePage)
        },
        err => {
          this.toastCtrl.create({ message: 'Refusé',duration: 2000,cssClass: 'toastMessage'}).present()
          console.log(err)
        }
      )
  }

}

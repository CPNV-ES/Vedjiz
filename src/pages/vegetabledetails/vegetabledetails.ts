import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {Product} from "../../models/Product";
/**
 * Generated class for the VegetabledetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vegetabledetails',
  templateUrl: 'vegetabledetails.html',
})
export class VegetabledetailsPage {

  product: Product // for show
  original: Product // for comparison
  status: string

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.original = navParams.get("product")
    this.product = Object.assign(Product, this.original); // Work on a clone
  }

  ionViewCanLeave() {

    if (this.original.equalsProduct(this.product)) return true; // no change: bye

    let toast = this.toastCtrl.create({
      message: "Il faut d'abord enregistrer ou abandonner vos changements",
      duration: 2000
    })
    toast.present()
    return false;
  }

  // used to display/hide buttons
  dataChange() {
    this.product.isDirty = !this.original.equalsProduct(this.product)
  }

  save() {
    Object.assign(this.original,this.product) // Copy displayed values to store
    this.product.isDirty = true
  }

  abort() {
    Object.assign(this.product,this.original) // Copy stored values to display
    this.product.isDirty = false
  }

}

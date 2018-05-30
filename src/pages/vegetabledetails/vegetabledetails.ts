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

  product: Product; // for show
  original: Product; // for comparison
  dataIsDirty: boolean; // Some data has changed
  status: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.original = navParams.get("product");
    this.product = Object.assign(Product, this.original); // Work on a clone
    this.dataIsDirty = false;
  }

  ionViewCanLeave() {

    if (!this.dataIsDirty) return true; // no change: bye

    let toast = this.toastCtrl.create({
      message: "Il faut d'abord enregistrer ou abandonner vos changements",
      duration: 2000
    })
    toast.present()
    return false;
  }

  dataChange() {
    this.dataIsDirty = !this.original.equalsProduct(this.product)
  }

  save() {
    Object.assign(this.original,this.product) // Copy displayed values to store
    this.dataIsDirty = false
  }

  abort() {
    Object.assign(this.product,this.original) // Copy stored values to display
    this.dataIsDirty = false
  }

}

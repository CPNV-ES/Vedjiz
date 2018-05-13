import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  product: Product;

  constructor(private dataProvider : DataProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.product = navParams.get("product");
  }

}

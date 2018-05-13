import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Product } from '../../models/Product';
import { DataProvider } from "../../providers/data/data";
import {VegetabledetailsPage} from "../vegetabledetails/vegetabledetails";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: Product[];

  constructor(private dataProvider : DataProvider, public navCtrl: NavController) {
    // Temporary: hardcoded default values
    this.products = this.dataProvider.getAllProducts();
  }

  public viewDetails(product){
    this.navCtrl.push(VegetabledetailsPage, { product : product});
  }
}

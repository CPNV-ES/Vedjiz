import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Product} from '../../models/Product';
import {DataProvider} from "../../providers/data/data";
import {VegetabledetailsPage} from "../vegetabledetails/vegetabledetails";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private dataProvider: DataProvider

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.dataProvider = new DataProvider(storage)
  }

  public viewDetails(product) {
    this.navCtrl.push(VegetabledetailsPage, {product: product});
  }
}

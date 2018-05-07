import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
import { Supplier } from '../../models/supplier';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

  product: Product

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = navParams.get('product')
  }
}

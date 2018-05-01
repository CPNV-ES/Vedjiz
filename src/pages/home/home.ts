import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {User} from '../../models/User.ts';
import {Product} from '../../models/Product.ts';
import {Supplier} from '../../models/Supplier.ts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  product: Product;

  constructor(public navCtrl: NavController) {
    this.product = new Product('Tomates', 2.3, 'kg', 12, 'tomatoes.jpg');
  }

}

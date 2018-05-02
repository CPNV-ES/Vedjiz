import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Product} from '../../models/Product';
import {Supplier} from '../../models/Supplier';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  product: Product;

  constructor(public navCtrl: NavController) {
    this.product = new Product('Tomates', 2.3, 'kg', 12, 'tomatoes.jpg');
    this.product.addSupplier(new Supplier('Louis','Corbaz','0123456','Ch. du chêne 8','Corbaz SA'));
    this.product.addSupplier(new Supplier('Charles','Dumont','2346282','Ch. du peuplier 12','Dumont et fils'));
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Product } from '../../models/product';
import { Supplier } from '../../models/supplier';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  product: Product
  suppliers : Array<Supplier> = []

  constructor(public navCtrl: NavController) {
    this.suppliers = [new Supplier('Gégé', 'Roulat', '+41798522407', 'Impasse des Burtins 5', 'ButoxxDev'), new Supplier('Bernard', 'Marcel', '+41798522507', 'Impasse des clampins 5', 'NicoDev')]
    this.product = new Product('Carotte', 19.50, 'kg', 6, 'carots.jpg', this.suppliers)
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

  product: Product
  productForm: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.product = navParams.get('product')
    this.initForm()
  }

  cancel() {
    this.initForm()
  }

  ionViewCanLeave() {
    return !this.productForm.dirty
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      price: [this.product.price],
      unit: [this.product.unit]
    });
  }
}

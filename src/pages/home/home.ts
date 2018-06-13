import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {VegetabledetailsPage} from "../vegetabledetails/vegetabledetails";
import {Storage} from '@ionic/storage';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private dataProvider: DataProvider

  constructor(public navCtrl: NavController, private storage: Storage, httpClient: HttpClient, public toastCtrl: ToastController) {
    this.dataProvider = new DataProvider(storage, httpClient, toastCtrl)
  }

  public viewDetails(product) {
    this.navCtrl.push(VegetabledetailsPage, {product: product, dataProvider: this.dataProvider});
  }

  // just for test: reset last update to an old date
  public touch(){
    this.dataProvider.lastUpdate = "2018-03-01 10:00:00"
    this.storage.set('lastupdate', "2018-03-01 10:00:00")
  }

  public doRefresh(refresher) {
    this.dataProvider.refresh().then(() => {
      refresher.complete()
    }).catch(err => {
      this.toastCtrl.create({message: err, duration:2000, cssClass:'toastMessage'}).present()
      refresher.complete()
    })
  }
}

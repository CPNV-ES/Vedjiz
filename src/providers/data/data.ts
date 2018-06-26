import {Storage} from '@ionic/storage';
import {Product} from "../../models/Product";
import {HttpClient} from '@angular/common/http';
import {Supplier} from "../../models/Supplier";
import {Timestamp} from "../../models/Timestamp";
import {ToastController} from "ionic-angular";
import {Injectable} from "@angular/core";
import { Order } from '../../models/Order';

/*
 Generated class for the DataProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */

export class DataProvider {

  public static apiURL: string = "http://vedjserver.mycpnv.ch/api/v1"

  public lastUpdate: string
  public products: Product[]
  public orders: Order[]
  private storage: Storage
  private httpClient: HttpClient
  private toastCtrl: ToastController

  constructor (storage: Storage, httpClient: HttpClient, toastCtrl: ToastController,lazy: boolean) {
    this.storage = storage
    this.toastCtrl = toastCtrl
    this.httpClient = httpClient
    this.products = []
    this.orders = []
    if (!lazy) this.load() // eager mode: we load data right away
  }

  public getOrders() {
    this.httpClient.get(DataProvider.apiURL + "/orders")
            .subscribe(
              data => {
                data.forEach(element => {
                  // No enough time
                });
                
              },
              err => {
              })
  }


  public load() {
    return new Promise((resolve,reject) => {
      this.storage.get('lastupdate').then((data) => {
        this.lastUpdate = data
        this.storage.get('products').then((prods) => {
          if (prods != null)
            this.buildFromJSON(prods)

          // Check if backend is newer
          this.httpClient.get(DataProvider.apiURL + "/lastupdate")
            .subscribe(
              data => { // API is responding, let's do it
                var ts: Timestamp = data as Timestamp
                if (ts.updated_at > this.lastUpdate) {  // things have changed on the server side since our last sync
                  this.buildFromAPI()
                  resolve('Loaded from API')
                }
                else {
                  this.toastCtrl.create({
                    message: 'Vos données sont à jour',
                    duration: 2000,
                    cssClass: 'toastMessage'
                  }).present()
                  resolve('Storage up-to-date')
                }
              },
              err => {
                this.toastCtrl.create({
                  message: 'Pas de réponse du serveur',
                  duration: 2000,
                  cssClass: 'toastMessage'
                }).present()
                resolve('Storage up-to-date')
              }
            )
        })
      })
    })
  }

  private zeroPad(x: number) { // returns a zero-right-padded string of a number between 0 and 99
    var v = "0" + x;
    return v.substring(v.length - 2)
  }

  // sets the lastupdate value to now
  private touch() {
    var date = new Date();
    var FormattedDate = date.getFullYear() + "-" + this.zeroPad((date.getMonth() + 1)) + "-" + this.zeroPad(date.getDate()) + " " + this.zeroPad(date.getHours()) + ":" + this.zeroPad(date.getMinutes()) + ":" + this.zeroPad(date.getSeconds());
    this.lastUpdate = FormattedDate
    return this.storage.set('lastupdate', FormattedDate)
  }

  public refresh() {
    return new Promise((resolve,reject) => {
      var clean = true
      this.products.forEach(product => {
        if (product.isDirty) clean = false
      })
      if (clean)
        resolve(this.buildFromAPI())
      else
        reject("Vous avez des changements locaux")
    })
  }

  private buildFromAPI() {
    console.log('buildFromAPI') 
    return this.httpClient.get(DataProvider.apiURL+"/vegetables")
      .subscribe(
        data => {
          this.storage.set('products', data)
          this.touch() // data has been updated
          this.buildFromJSON(data)
          this.toastCtrl.create({message: 'Données rechargées', duration:2000, cssClass:'toastMessage'}).present()
        },
        err => {
          this.toastCtrl.create({message: 'Pas de réponse du serveur', duration:2000, cssClass:'toastMessage'}).present()
          console.log(err)
        }
      )
  }

  // Build our product list based on the JSon, either received from the API, or retrieved from the storage
  private buildFromJSON(data) {
    console.log('buildFromJSON')
    this.products = [] // Empty current list or initialize it
    data.forEach((value) => {
      var p = new Product(value.id, value.productName, value.price, value.unit, value.stock, value.low_stock_threshold, value.image64, value.isDirty)
      value.suppliers.forEach((sup) => {
        p.addSupplier(new Supplier(sup.firstName, sup.lastName, '', '', sup.companyName))
      })
      this.products.push(p)
    })
  }

  // Stores the content of the memory into the storage
  public store() {
    this.storage.set('products',this.products)
    console.log ('Stored')
  }
}

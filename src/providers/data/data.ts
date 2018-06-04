import {Storage} from '@ionic/storage';
import {Product} from "../../models/Product";
import {HttpClient} from '@angular/common/http';
import {Supplier} from "../../models/Supplier";

/*
 Generated class for the DataProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */

export class DataProvider {

  private apiURL: string = "http://vedjserver.mycpnv.ch/api/v1"

  public lastUpdate: string
  public products: Product[]
  private storage: Storage
  private httpClient: HttpClient

  constructor(storage: Storage, httpClient: HttpClient) {
    this.storage = storage
    this.httpClient = httpClient
    this.products = []
    this.storage.get('lastupdate').then((data) => {
      this.lastUpdate = data
      this.storage.get('products').then((prods) => {
        if (prods != null)
          this.buildFromJSON(prods)

        // Check if backend is newer
        this.httpClient.get(this.apiURL+"/lastupdate")
          .subscribe(
            data => { // API is responding, let's do it
              if (data.updated_at > this.lastUpdate) {  // things have changed on the server side since our last sync
                this.buildFromAPI()
              }
              else
                console.log('No readback required')
            },
            err => {
              console.log(err)
            }
          )
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

  private buildFromAPI() {
    console.log('buildFromAPI')
    this.httpClient.get(this.apiURL+"/vegetables")
      .subscribe(
        data => {
          this.storage.set('products', data)
          this.touch() // data has been updated
          this.buildFromJSON(data)
        },
        err => {
          console.log(err)
        }
      )
  }

  // Build our product list based on the JSon, either received from the API, or retrieved from the storage
  private buildFromJSON(data) {
    console.log('buildFromJSON')
    this.products = [] // Empty current list or initialize it
    data.forEach((value) => {
      var p = new Product(value.id, value.productName, value.price, value.unit, value.stock, value.image64)
      value.suppliers.forEach((sup) => {
        p.addSupplier(new Supplier(sup.firstName, sup.lastName, '', '', sup.companyName))
      })
      this.products.push(p)
    })
  }

}

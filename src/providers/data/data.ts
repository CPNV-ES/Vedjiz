import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Supplier } from '../../models/supplier';
import { User } from '../../models/user';
import { Product } from '../../models/product';

// Import SQLite
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import 'rxjs/add/operator/map'

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  suppliers: Array<Supplier>
  users: Array<User>
  products: Array<Product>
  db: SQLiteObject
  options: any = {
    name: 'vedjiz.db',
    location: 'default'
  }
  isOpen: Boolean = false

  constructor(public http: Http, private sqlite: SQLite, private sqlitePorter: SQLitePorter) {
    this.suppliers = [new Supplier(1, 'Gégé', 'Roulat', '+41798522407', 'Impasse des Burtins 5', 'ButoxxDev'), new Supplier(2, 'Bernard', 'Marcel', '+41798522507', 'Impasse des clampins 5', 'NicoDev')]
    this.products = [new Product(1, 'Carotte', 19.50, 'kg', 6, 'carots.jpg', this.suppliers), new Product(2, 'Brocoli', 25.20, 'kg', 20, 'Broccoli.jpeg', this.suppliers), new Product(3, 'Asperge', 12,'kg',153,'asparagus.jpg',[])]
  }

  public connectToDB() {
    return new Promise((resolve, reject) => {
      if (this.isOpen == true) {
        resolve(this.isOpen)
      } else {
        this.sqlite.create(this.options)
        .then((db: SQLiteObject) => {
          this.db = db
          this.http.get('assets/database.sql').map(res => res.text()).subscribe(sql => {
            this.sqlitePorter.importSqlToDb(this.db, sql).then(data => {
              this.isOpen = true
              resolve(this.isOpen)
            }).catch(e => console.log(JSON.stringify(e)))
          })
        }).catch(e => console.log(JSON.stringify(e)))
      }
    })
  }

  getProducts() {
    return this.products
  }

  private seed() {
    let query: string = 'INSERT INTO `products` (name, unit, stock, image_path, price) VALUES ("Carotte", "kg", 6, "carots.jpg", 19.50); INSERT INTO `products` (name, unit, stock, image_path, price) VALUES ("Brocoli", "kg", 11, "Broccoli.jpg", 25.50); INSERT INTO `products` (name, unit, stock, image_path, price) VALUES ("Asperges", "kg", 8, "asparagus.jpg", 153);'
    return new Promise((resolve, reject) => {
      this.db.executeSql(query, [])
        .then((data) => {
          return resolve(JSON.stringify(data))
        }, (error) => {
          return reject(JSON.stringify(error))
        })
    })
  }
}

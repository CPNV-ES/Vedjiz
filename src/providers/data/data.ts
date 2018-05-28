import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Product } from '../../models/Product'
import { Supplier } from '../../models/Supplier'
import { User } from '../../models/User'
import { Platform } from 'ionic-angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import 'rxjs/add/operator/map'

@Injectable()
export class DataProvider {

  products: Array<Product> = []
  suppliers: Supplier[] = []
  users: User[] = []
  db: SQLiteObject
  options: any = {
    name: 'vedjiz2.db',
    location: 'default',
  }
  isOpen: boolean = false

  constructor(public http: Http, public sqlitePorter: SQLitePorter, private sqlite: SQLite, public platform: Platform) {
    
  }

  public connectToDB() {
    return new Promise((resolve, reject) => {
      if (this.isOpen) {
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
    let sql = 'SELECT * FROM products'
    
    return new Promise<Array<Product>>((resolve, reject) => {
      this.db.executeSql(sql, []).then((data) => {
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            let new_product = new Product(data.rows.item(i).id, data.rows.item(i).name, data.rows.item(i).price, data.rows.item(i).unit, [], data.rows.item(i).path, data.rows.item(i).stock)
            this.products.push(new_product)
            resolve(this.products)
          }
        }
      }).catch(error => console.log(JSON.stringify(error)))
    })
  }

  getSuppliers() {
    let sql = 'SELECT * FROM suppliers'

    return new Promise<Array<Supplier>>((resolve, reject) => {
      this.db.executeSql(sql, []).then((data) => {
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            let new_supplier = new Supplier(data.rows.item(i).id, data.rows.item(i).firstName, data.rows.item(i).lastName, data.rows.item(i).phone, data.rows.item(i).address, data.rows.item(i).companyName)
            this.suppliers.push(new_supplier)
            resolve(this.suppliers)
          }
        }
      }).catch(error => console.log(JSON.stringify(error)))
    })
  }

  addProduct(name, price, unit, stock, path) {
    let sql = `INSERT INTO products (name, price, unit, stock, path) VALUES (?, ?, ?, ?, ?)`

    return new Promise<Product>((resolve, reject) => {
      this.db.executeSql(sql, [name, price, unit, stock, path])
        .then((data) => {
          resolve(new Product(data.insertId, name, price, unit, [], path, stock))
        }).catch(error => console.log(JSON.stringify(error)))
    })
  }

  addSupplier(firstname, lastname, companyName, phone, address) {
    let sql = `INSERT INTO suppliers (firstname, lastname, companyName, phone, address) VALUES (?, ?, ?, ?, ?)`

    return new Promise<Supplier>((resolve, reject) => {
      this.db.executeSql(sql, [firstname, lastname, companyName, phone, address])
        .then((data) => {
          resolve(new Supplier(data.insertId, firstname, lastname, phone, address, companyName))
        }).catch(error => console.log(JSON.stringify(error)))
    })
  }

  updateProduct(product) {
    let sql = `UPDATE products SET name = ?, price = ?, unit = ?, stock = ?, path = ? WHERE id = ?`

    this.db.executeSql(sql, [product.name, product.price, product.unit, product.stock, product.path, product.id])
      .then((data) => {
        return JSON.stringify(data)
      }), (error) => {
        return JSON.stringify(error)
      }
  }


}
/**
 * Created by Xavier on 01.05.18.
 */

import { User } from './User'

export class Supplier extends User {

  companyName: string;

  constructor(firstName: string, lastName: string, phone: string, address: string, companyName: string) {
    super(firstName, lastName, phone, address);
    this.companyName = companyName;
  }
}

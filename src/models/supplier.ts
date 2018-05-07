import { User } from './user';

export class Supplier extends User {
  companyName: string

  constructor(firstName: string, lastName: string, phone: string, address: string, companyName: string) {
    super(firstName, lastName, phone, address)
    this.companyName = companyName
  }
}

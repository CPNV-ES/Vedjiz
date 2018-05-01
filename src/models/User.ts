/**
 * Created by Xavier on 01.05.18.
 */
export class User {

  firstName: string;
  lastName: string;
  phone: string;
  address: string;

  constructor(firstName: string, lastName: string, phone: string, address: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
  }
}

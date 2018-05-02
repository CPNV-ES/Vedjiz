/**
 * Created by Xavier on 01.05.18.
 */
export class User {

  firstName: string;
  lastName: string;
  phone: string;      // free-form
  address: string;    // Street, NPA and City in one string

  constructor(firstName: string, lastName: string, phone: string, address: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { API_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(API_URL + '/api/get/contacts')
  }

  getContact(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(API_URL + '/api/get/contact/' + id)
  }

  updateContact(contact: Contact): Promise<any> {
    return this.httpClient.post(API_URL + '/api/update/contact', contact).toPromise()
  }

  updateField(value: any, field: string, id: number): Observable<Contact> {
    return this.httpClient.post<Contact>(API_URL + '/api/update/contact/field', { value, field, id })
  }

  updateOrder(contacts: Contact[]): Promise<any> {
    return this.httpClient.post(API_URL + '/api/update/contacts/order', { contacts }).toPromise()
  }


  createContact(contact: Contact): Promise<any> {
    return this.httpClient.post(API_URL + '/api/create/contact', contact).toPromise()
  }

  removeContact(id: number): Promise<any> {
    return this.httpClient.delete(API_URL + '/api/remove/contact/' + id).toPromise()
  }

  createEmpty(): Contact {
    return {
      name: null,
      who: null,
      email: null,
      phone: null,
      asFirst: false,
      status: false,
      ordering: null
    }
  }

}

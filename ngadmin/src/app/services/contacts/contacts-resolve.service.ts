import { Injectable } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsResolveService implements Resolve<Contact[]> {

  constructor(private contactService: ContactService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact[]> {
    return this.contactService.getContacts()
  }
}

import { Component, OnInit, Inject, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Type, ViewChildren, QueryList, AfterContentInit, AfterContentChecked, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import Sortable, { MultiDrag, Swap } from 'sortablejs';
import { DOCUMENT } from '@angular/common';
import { API_URL } from 'src/app/config';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactService } from 'src/app/services/contacts/contact.service';
import { ContactRowComponent } from './contact-row/contact-row.component';
import { RefreshContactsService } from 'src/app/services/refresh-contacts.service';
import { ConfirmWindowComponent } from 'src/app/tools/confirm-window/confirm-window.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild('editView', { read: ViewContainerRef, static: true }) editView: ViewContainerRef
  @ViewChildren(ContactRowComponent) contactRows: QueryList<ContactRowComponent>
  editContactC: ComponentRef<EditContactComponent>
  addContactC: ComponentRef<AddContactComponent>
  confirmWindow: ComponentRef<ConfirmWindowComponent>
  contacts: Contact[]
  apiUrl: string = API_URL
  sortable: Sortable
  contactSubs: Subscription
  contacts$: Observable<Contact[]>

  constructor(private activatedRoute: ActivatedRoute, @Inject(DOCUMENT) private document: Document, private cf: ComponentFactoryResolver,
    private contactService: ContactService, private refreshContactsService: RefreshContactsService) { }

  ngOnInit() {
    this.contacts = this.activatedRoute.snapshot.data['contacts']
    // console.log(this.contacts)
    this.contacts$ = this.contactService.getContacts()
    this.createSortable()
    this.subscribeToRefresh()
  }

  subscribeToRefresh() {
    this.refreshContactsService.action$.subscribe(bool => {
      if (bool) {
        this.updateContacts()
      }
    })
  }

  ngAfterViewInit(): void {
    // this.subscribeToContactRowChange()
  }


  createSortable() {

    this.sortable = new Sortable(this.document.getElementById('sortContacts'), {
      // Element dragging ended
      onEnd: function (/**Event*/evt) {
        // console.log(evt.oldIndex, evt.newIndex)
        var element = this.contacts[evt.oldIndex];
        this.contacts.splice(evt.oldIndex, 1);
        this.contacts.splice(evt.newIndex, 0, element);
        this.changeContactOrder()
      }.bind(this)

    })
  }


  subscribeToContactRowChange() {
    // this.contactRows.map(cc => {
    //   cc.emitChange.subscribe(c => {
    //     console.log('emitted', c)
    //     this.updateContacts()
    //   })
    // })
  }

  editContact($event) {
    this.editView.clear()
    this.contactService.getContact($event.id).subscribe(c => {
      let edit = this.cf.resolveComponentFactory(<Type<EditContactComponent>>EditContactComponent)
      this.editContactC = this.editView.createComponent<EditContactComponent>(edit)
      this.editContactC.instance.contact = c
      this.editContactC.instance.emitUpdate.subscribe(r => {
        this.updateContacts()
        this.editContactC.destroy()
      })
      this.editContactC.instance.closeUpdate.subscribe(r => {
        this.editContactC.destroy()
      })
    })

  }


  addContact() {
    this.editView.clear()
    let add = this.cf.resolveComponentFactory(<Type<AddContactComponent>>AddContactComponent)
    this.addContactC = this.editView.createComponent<AddContactComponent>(add)
    this.addContactC.instance.contact = this.contactService.createEmpty()
    this.addContactC.instance.emitUpdate.subscribe(r => {
      this.updateContacts()
      this.addContactC.destroy()
    })
    this.addContactC.instance.closeUpdate.subscribe(r => {
      this.addContactC.destroy()
    })
  }

  updateContacts() {
    // this.contactService.getContacts().subscribe(cs => {
    //   this.contacts = cs
    //   // this.subscribeToContactRowChange()
    // })
    this.contactSubs = this.contacts$.subscribe(cs => {
      this.contacts = cs
    })
  }

  changeContactOrder() {
    this.contactService.updateOrder(this.contacts).then(r => {
      this.refreshContactsService.updateContactsAction()
    })
  }

  startRemoveContact($event) {
    this.editView.clear()
    let confirm = this.cf.resolveComponentFactory(<Type<ConfirmWindowComponent>>ConfirmWindowComponent)
    this.confirmWindow = this.editView.createComponent(confirm)
    this.confirmWindow.instance.message = 'Czy chcesz usunąć kontakt?'
    this.confirmWindow.instance.bundleData = $event
    this.confirmWindow.instance.emitActionConfirm.subscribe(what => {
      this.confirmWindow.destroy()
      // console.log(what)
      if (what.do) {
        this.removeContact(what.bundleData)
      }
    })
  }

  removeContact(c: Contact) {
    this.contactService.removeContact(c.id).then(r => {
      this.refreshContactsService.updateContactsAction()
    })
  }

  ngOnDestroy(): void {
    // console.log(this.contactSubs)
    if (this.contactSubs) {
      this.contactSubs.unsubscribe()
    }
  }


}

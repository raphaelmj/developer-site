import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contacts/contact.service';
import { RefreshContactsService } from 'src/app/services/refresh-contacts.service';

@Component({
  selector: 'app-contact-row',
  templateUrl: './contact-row.component.html',
  styleUrls: ['./contact-row.component.less']
})
export class ContactRowComponent implements OnInit, OnChanges {

  @Input() contact: Contact
  @Output() emitEdit: EventEmitter<Contact> = new EventEmitter()
  @Output() emitChange: EventEmitter<any> = new EventEmitter()
  @Output() emitRemove: EventEmitter<Contact> = new EventEmitter()

  constructor(private contactService: ContactService, private refreshContactsService: RefreshContactsService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  editContact() {
    this.emitEdit.emit(this.contact)
  }

  changeAsFirst(value: boolean) {
    // console.log(value)
    this.contactService.updateField(value, 'asFirst', this.contact.id).subscribe(c => {
      // console.log(c)
      // this.emitChange.emit(c)
      this.refreshContactsService.updateContactsAction()
    })
  }

  changeStatus($event) {
    this.contactService.updateField($event.checked, 'status', this.contact.id).subscribe(c => {
      this.emitChange.emit(c)
    })
  }


  removeContact() {
    this.emitRemove.emit(this.contact)
  }

}

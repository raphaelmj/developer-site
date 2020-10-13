import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { reduce } from 'rxjs/operators';
import { ContactService } from 'src/app/services/contacts/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.less']
})
export class EditContactComponent implements OnInit {

  @Input() contact: Contact
  @Output() emitUpdate: EventEmitter<any> = new EventEmitter()
  @Output() closeUpdate: EventEmitter<any> = new EventEmitter()
  contactForm: FormGroup

  constructor(private fb: FormBuilder, private contactService: ContactService) { }

  ngOnInit() {
    this.contactForm = this.createForm()
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: [this.contact.name, Validators.required],
      who: [this.contact.who],
      email: [this.contact.email],
      phone: [this.contact.phone],
      status: [this.contact.status]
    })
  }
  closeEdit() {
    this.closeUpdate.emit()
  }

  updateContact() {
    // console.log(this.contactForm.value)
    if (this.contactForm.valid) {
      var contact: Contact = Object.assign(this.contact, this.contactForm.value)

      var { createdAt, updatedAt, ...reduceContact } = contact
      reduceContact as Contact
      this.contactService.updateContact(reduceContact).then(r => {
        console.log(r)
        this.emitUpdate.emit()
      })
    }
  }

}

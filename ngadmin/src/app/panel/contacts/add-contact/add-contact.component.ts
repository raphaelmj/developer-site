import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { reduce } from 'rxjs/operators';
import { ContactService } from 'src/app/services/contacts/contact.service';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.less']
})
export class AddContactComponent implements OnInit {

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
      this.contactService.createContact(this.contactForm.value).then(r => {
        console.log(r)
        this.emitUpdate.emit()
      })
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactRowComponent } from './contact-row/contact-row.component';
import { ServicesModule } from 'src/app/services/services.module';
import { MatButtonModule, MatSlideToggleModule, MatProgressSpinnerModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { ToolsModule } from 'src/app/tools/tools.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ConfirmWindowComponent } from 'src/app/tools/confirm-window/confirm-window.component';

@NgModule({
  declarations: [ContactsComponent, ContactRowComponent, EditContactComponent, AddContactComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    ServicesModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    ToolsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [
    EditContactComponent, AddContactComponent, ConfirmWindowComponent
  ]
})
export class ContactsModule { }

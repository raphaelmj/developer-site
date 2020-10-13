import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { RedirectIfNotauthGuard } from 'src/app/guards/redirect-if-notauth.guard';
import { ContactsResolveService } from 'src/app/services/contacts/contacts-resolve.service';

const routes: Routes = [
  { path: 'panel/contacts', component: ContactsComponent, canActivate: [RedirectIfNotauthGuard], resolve: { contacts: ContactsResolveService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }

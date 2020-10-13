import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { RedirectIfNotauthGuard } from '../guards/redirect-if-notauth.guard';

const routes: Routes = [
  { path: 'panel', component: PanelComponent, canActivate: [RedirectIfNotauthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }

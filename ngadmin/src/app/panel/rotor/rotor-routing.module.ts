import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RotorComponent } from './rotor.component';
import { RedirectIfNotauthGuard } from 'src/app/guards/redirect-if-notauth.guard';
import { SlidesResolveService } from 'src/app/services/slides/slides-resolve.service';

const routes: Routes = [
  { path: 'panel/rotor', component: RotorComponent, canActivate: [RedirectIfNotauthGuard], resolve: { slides: SlidesResolveService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RotorRoutingModule { }

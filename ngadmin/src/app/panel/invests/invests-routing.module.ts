import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestsComponent } from './invests.component';
import { RedirectIfNotauthGuard } from 'src/app/guards/redirect-if-notauth.guard';
import { InvestsResolveService } from 'src/app/services/invests/invests-resolve.service';

const routes: Routes = [
  { path: 'panel/invests', component: InvestsComponent, canActivate: [RedirectIfNotauthGuard], resolve: { invests: InvestsResolveService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestsRoutingModule { }

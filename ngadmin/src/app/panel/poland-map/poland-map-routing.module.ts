import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolandMapComponent } from './poland-map.component';
import { RedirectIfNotauthGuard } from 'src/app/guards/redirect-if-notauth.guard';
import { PointsResolveService } from 'src/app/services/points/points-resolve.service';
import { InvestsResolveService } from 'src/app/services/invests/invests-resolve.service';

const routes: Routes = [
  { path: 'panel/poland-map', component: PolandMapComponent, canActivate: [RedirectIfNotauthGuard], resolve: { points: PointsResolveService, invests: InvestsResolveService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolandMapRoutingModule { }

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Invest } from 'src/app/models/invest';
import { InvestService } from './invest.service';

@Injectable({
  providedIn: 'root'
})
export class InvestsResolveService implements Resolve<any> {

  constructor(private investService: InvestService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Invest[]> {
    return this.investService.getInvests()
  }

}

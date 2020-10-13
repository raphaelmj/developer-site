import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Point } from 'src/app/models/point';
import { Observable } from 'rxjs';
import { PointService } from './point.service';

@Injectable({
  providedIn: 'root'
})
export class PointsResolveService implements Resolve<Point[]> {

  constructor(private pointService: PointService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Point[]> {
    return this.pointService.getPoints()
  }

}

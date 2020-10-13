import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Point } from '../models/point';

@Injectable({
  providedIn: 'root'
})
export class MapFreePointService {

  pointFree$: Subject<{ firstChange: boolean, point: Point, index: number | null }> = new Subject<{ firstChange: true, point: null, index: null }>()
  pointFreeIndex$: Subject<number> = new Subject<number>()
  pointFreeIndexClear$: Subject<number> = new Subject<number>()

  constructor() { }

  showPoint(firstChange: boolean, point: Point, index: number | null) {
    return this.pointFree$.next({ firstChange, point, index })
  }

  pushPoint(index: number) {
    this.pointFreeIndex$.next(index)
  }

  clearPoint(index: number) {
    this.pointFreeIndexClear$.next(index)
  }

}

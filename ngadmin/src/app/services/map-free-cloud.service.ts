import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Point, PointChild } from '../models/point';

@Injectable({
  providedIn: 'root'
})
export class MapFreeCloudService {

  cloudFree$: Subject<{ firstChange: boolean, cloud: PointChild, indexPoint: number, indexCloud: number | null }> = new Subject<{ firstChange: boolean, cloud: PointChild, indexPoint: number, indexCloud: number | null }>()
  cloudFreeIndex$: Subject<{ indexPoint: number, indexCloud: number }> = new Subject<{ indexPoint: number, indexCloud: number }>()
  cloudFreeIndexClear$: Subject<{ indexPoint: number, indexCloud: number }> = new Subject<{ indexPoint: number, indexCloud: number }>()

  constructor() { }

  showCloud(firstChange: boolean, cloud: PointChild, indexPoint: number, indexCloud: number | null) {
    return this.cloudFree$.next({ firstChange, cloud, indexPoint, indexCloud })
  }

  pushCloud(indexPoint: number, indexCloud: number) {
    this.cloudFreeIndex$.next({ indexPoint, indexCloud })
  }

  clearCloud(indexPoint: number, indexCloud: number) {
    this.cloudFreeIndexClear$.next({ indexPoint, indexCloud })
  }
}

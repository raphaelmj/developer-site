import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { API_URL } from 'src/app/config';
import { Point } from 'src/app/models/point';
import { MapFreePointService } from '../../../services/map-free-point.service';
import { MapFreeCloudService } from 'src/app/services/map-free-cloud.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.less'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class MapViewComponent implements OnInit, OnChanges {

  @Input() points: Point[]
  cloudSizeBool: Array<Array<[boolean]> | boolean> = []

  apiUrl: string = API_URL

  constructor(private mapFreePointService: MapFreePointService, private mapFreeCloudService: MapFreeCloudService) { }

  ngOnInit() {
    // console.log(this.points)
    this.points.map(p => {
      if (p.type == 'collection') {
        this.cloudSizeBool.push(Array(p.childs.length).fill(false))
      } else {
        this.cloudSizeBool.push(false)
      }
    })
    // console.log(this.cloudSizeBool)
    this.mapFreePointService.pointFree$.subscribe(d => {
      if (d.firstChange && !d.index) {
        let newIndex: number = (this.pushNewPointGetIndex(d.point) - 1)
        this.mapFreePointService.pushPoint(newIndex)
      } else {
        this.points[d.index] = d.point
      }
    })
    this.mapFreePointService.pointFreeIndexClear$.subscribe(d => {
      this.points.splice(d, 1)
    })
    this.mapFreeCloudService.cloudFree$.subscribe(d => {
      if (d.firstChange) {
        let newIndex: number = (this.points[d.indexPoint].childs.push(d.cloud) - 1)
        this.mapFreeCloudService.pushCloud(d.indexPoint, newIndex)
      } else {
        this.points[d.indexPoint].childs[d.indexCloud] = d.cloud
      }
    })
    this.mapFreeCloudService.cloudFreeIndexClear$.subscribe(d => {
      this.points[d.indexPoint].childs.splice(d.indexCloud, 1)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
  }

  pushNewPointGetIndex(p: Point): number {
    return this.points.push(p)
  }

  showFullCloudColl(x: number, y: number) {
    this.cloudSizeBool[x][y] = true
  }

  hideFullCloudColl(x: number, y: number) {
    this.cloudSizeBool[x][y] = false
  }

}

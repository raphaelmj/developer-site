import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, Type, ComponentFactoryResolver, Inject, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Point, PointChild } from 'src/app/models/point';
import { EditPointComponent } from './edit-point/edit-point.component';
import { EditCloudComponent } from './edit-cloud/edit-cloud.component';
import { MapViewComponent } from './map-view/map-view.component';
import { InvestService } from 'src/app/services/invests/invest.service';
import { Invest } from 'src/app/models/invest';
import { PointService } from 'src/app/services/points/point.service';
import { DOCUMENT } from '@angular/common';
import { AddPointComponent } from './add-point/add-point.component';
import { AddCloudComponent } from './add-cloud/add-cloud.component';
import { MapFreePointService } from '../../services/map-free-point.service';
import { ConfirmWindowComponent } from 'src/app/tools/confirm-window/confirm-window.component';

@Component({
  selector: 'app-poland-map',
  templateUrl: './poland-map.component.html',
  styleUrls: ['./poland-map.component.less']
})
export class PolandMapComponent implements OnInit {


  // @ViewChild(MapViewComponent, { static: true }) mapView: ComponentRef<MapViewComponent>
  @ViewChild('editView', { read: ViewContainerRef, static: true }) editView: ViewContainerRef
  editPoint: ComponentRef<EditPointComponent>
  editCloud: ComponentRef<EditCloudComponent>
  addPoint: ComponentRef<AddPointComponent>
  addCloud: ComponentRef<AddCloudComponent>
  confirmCloud: ComponentRef<ConfirmWindowComponent>

  points: Point[]
  basePoints: Point[]
  invests: Invest[]
  isSaving: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private cf: ComponentFactoryResolver,
    private investService: InvestService,
    private pointService: PointService,
    @Inject(DOCUMENT) private document: Document,
    private mapFreePointService: MapFreePointService) { }

  ngOnInit() {
    this.points = this.activatedRoute.snapshot.data['points']
    this.basePoints = this.activatedRoute.snapshot.data['points']
    this.invests = this.activatedRoute.snapshot.data['invests']
  }

  subscribeToFreePoint() {
    this.mapFreePointService.pointFreeIndexClear$.subscribe(d => {
      // console.log(d)
    })
  }


  findPointIndex(point: Point) {
    var index = null
    this.points.map((p, i) => {
      if (p.id == point.id) {
        index = i
      }
    })
    return index
  }

  showEditPoint(point: Point) {
    this.editView.clear()
    this.pointService.getPoint(point.id).subscribe(p => {

      let edit = this.cf.resolveComponentFactory(<Type<EditPointComponent>>EditPointComponent)
      this.editPoint = this.editView.createComponent<EditPointComponent>(edit)
      this.editPoint.instance.point = p
      window.scrollTo(0, 0)
      this.editPoint.instance.changePoint.subscribe(data => {
        this.findPointChangeEditValues(data)
      })
      this.editPoint.instance.closeEditEmit.subscribe(data => {
        this.editPoint.destroy()
      })
      this.editPoint.instance.saveEdit.subscribe(p => {
        this.editPoint.destroy()
        this.savePoint(p)
      })

    })

  }


  addPointShow() {
    this.editView.clear()
    let add = this.cf.resolveComponentFactory(<Type<AddPointComponent>>AddPointComponent)
    this.addPoint = this.editView.createComponent<AddPointComponent>(add)
    this.addPoint.instance.point = this.pointService.createEmptyPoint()
    window.scrollTo(0, 0)
    this.addPoint.instance.closeEditEmit.subscribe(d => {
      // console.log(d)
      this.mapFreePointService.clearPoint(d)
      this.addPoint.destroy()
    })
    this.addPoint.instance.saveEdit.subscribe(p => {
      this.addPoint.destroy()
      this.createPoint(p)
    })
  }


  addCloudShow(point: Point, index: number) {
    this.editView.clear()
    let add = this.cf.resolveComponentFactory(<Type<AddCloudComponent>>AddCloudComponent)
    this.addCloud = this.editView.createComponent<AddCloudComponent>(add)
    window.scrollTo(0, 0)
    this.addCloud.instance.point = point
    this.addCloud.instance.pointIndex = index
    this.addCloud.instance.invests = this.invests
    this.addCloud.instance.pointChild = this.pointService.createEmptyCloud()
    this.addCloud.instance.closeEmit.subscribe(d => {
      this.addCloud.destroy()
    })
    this.addCloud.instance.saveEdit.subscribe(p => {
      this.addCloud.destroy()
      this.savePoint(p)
    })
    // this.addCloud.instance.point = this.pointService.createEmptyPoint()

  }


  showEditCloud(point: Point, index: number | null, isChildren: boolean) {
    this.editView.clear()

    // console.log(isChildren)
    if (isChildren) {

      this.pointService.getPoint(point.id).subscribe(p => {
        // console.log('cloud', p.childs[index])
        this.investService.getInvest(p.childs[index].investId).subscribe(invest => {

          let edit = this.cf.resolveComponentFactory(<Type<EditCloudComponent>>EditCloudComponent)
          this.editCloud = this.editView.createComponent<EditCloudComponent>(edit)
          this.editCloud.instance.point = p
          this.editCloud.instance.indexChild = index
          this.editCloud.instance.pointChild = p.childs[index]
          this.editCloud.instance.invest = invest
          this.editCloud.instance.invests = this.invests
          window.scrollTo(0, 0)
          this.editCloud.instance.changeEmit.subscribe(v => {
            // console.log('change')
            this.findPointChangeCloud(v.id, v.indexChild, v.pointChild)
          })
          this.editCloud.instance.closeEmit.subscribe(d => {
            this.editCloud.destroy()
          })
          this.editCloud.instance.saveEdit.subscribe(p => {
            // console.log('save')
            this.savePoint(p)
            this.editCloud.destroy()
          })
        })

      })

    }

  }

  changePointShow($event, index: number) {
    // console.log($event, index)
    this.points[index].isShow = $event.checked
    this.savePoint(this.points[index])
  }

  findPointChangeEditValues(point: Point) {
    var index = null
    this.points.map((d, i) => {
      if (d.id == point.id) {
        index = i
      }
    })

    if (index != null) {

      this.points[index].name = point.name
      this.points[index].left = point.left
      this.points[index].top = point.top
      this.points[index].cityLeft = point.cityLeft
      this.points[index].cityTop = point.cityTop
      this.points[index].type = point.type
      this.points[index].status = point.status
      this.points[index].size = point.size
      this.points[index].isShow = point.isShow

    }

  }

  findPointChangeCloud(id: number, indexChild: number | null, pointChild: PointChild) {
    var index = null
    this.points.map((d, i) => {
      if (d.id == id) {
        index = i
      }
    })
    if (index != null) {

      if (indexChild != null) {

        this.points[index].childs[indexChild] = pointChild
      } else {
        this.points[index].child = pointChild
      }
    }

  }

  savePoint(p: Point) {
    // console.log('save')
    this.isSaving = true;
    var index = this.findPointIndex(p)
    // console.log(p, index)
    this.pointService.updatePoint(this.points[index]).then(p => {
      // console.log('res', p)
      this.points = Object.assign([], p)
      this.basePoints = Object.assign([], p)
      this.isSaving = false
    })

  }

  createPoint(point: Point) {
    this.pointService.createPoint(point).then(ps => {
      this.points = ps
    })
  }


  removePoint(point: Point) {
    this.editView.clear()
    let cloud = this.cf.resolveComponentFactory(<Type<ConfirmWindowComponent>>ConfirmWindowComponent)
    this.confirmCloud = this.editView.createComponent(cloud)
    this.confirmCloud.instance.message = 'Czy chcesz usunąć punkt?'
    this.confirmCloud.instance.bundleData = point
    this.confirmCloud.instance.emitActionConfirm.subscribe(d => {
      // console.log(d)
      if (d.do) {
        this.deletePoint(d.bundleData.id)
        this.confirmCloud.destroy()
      } else {
        this.confirmCloud.destroy()
      }
    })
  }

  removePointCloud(point: Point, index: number) {
    this.editView.clear()
    let cloud = this.cf.resolveComponentFactory(<Type<ConfirmWindowComponent>>ConfirmWindowComponent)
    this.confirmCloud = this.editView.createComponent(cloud)
    this.confirmCloud.instance.message = 'Czy chcesz usunąć chmurę?'
    this.confirmCloud.instance.bundleData = { point, index }
    this.confirmCloud.instance.emitActionConfirm.subscribe(d => {
      // console.log(d.bundleData)
      if (d.do) {
        d.bundleData.point.childs.splice(d.bundleData.index, 1)
        this.savePoint(d.bundleData.point)
        this.confirmCloud.destroy()
      } else {
        this.confirmCloud.destroy()
      }
    })
  }

  deletePoint(id: number) {
    this.pointService.deletePoint(id).then(d => {
      this.pointService.getPoints().subscribe(p => {
        this.points = Object.assign([], p)
        this.basePoints = Object.assign([], p)
      })
    })
  }

}

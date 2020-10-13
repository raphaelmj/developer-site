import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, OnChanges, OnDestroy } from '@angular/core';
import { Point } from 'src/app/models/point';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Invest } from 'src/app/models/invest';
import { MapFreePointService } from '../../../services/map-free-point.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-point',
  templateUrl: './add-point.component.html',
  styleUrls: ['./add-point.component.less']
})
export class AddPointComponent implements OnInit, AfterContentInit, OnDestroy {


  @Input() point: Point
  @Output() changeFreePoint: EventEmitter<Point> = new EventEmitter()
  @Output() closeEditEmit: EventEmitter<any> = new EventEmitter()
  @Output() saveEdit: EventEmitter<Point> = new EventEmitter()
  pointForm: FormGroup
  editIndex: number = null
  private subscribeForm: Subscription
  constructor(private fb: FormBuilder, private mapFreePointService: MapFreePointService) {

  }

  ngOnInit() {
    this.pointForm = this.makeForm()
    this.subscribeToChangePoint()
    this.subscribeToPointShow()
  }

  ngAfterContentInit(): void {
    this.point = Object.assign(this.point, this.pointForm.value)
    this.pointShowOnMap(true)
  }


  subscribeToChangePoint() {
    this.subscribeForm = this.pointForm.valueChanges.subscribe(v => {
      this.point = Object.assign(this.point, this.pointForm.value)
      this.pointShowOnMap(false)
    })
  }

  subscribeToPointShow() {
    this.mapFreePointService.pointFreeIndex$.subscribe(index => {
      this.editIndex = index
    })
  }

  pointShowOnMap(isFirst: boolean) {
    if (isFirst) {
      this.mapFreePointService.showPoint(isFirst, this.point, null)
    } else {
      this.mapFreePointService.showPoint(isFirst, this.point, this.editIndex)
    }
  }

  makeForm(): FormGroup {
    return this.fb.group({
      name: ['Nazwa miasta'],
      left: ['0%'],
      top: ['0%'],
      cityLeft: ['0%'],
      cityTop: ['0%'],
      status: ['plan-invest'],
      type: ['collection'],
      size: ['small'],
      isShow: [true]
    })
  }

  // resetToInit() {
  //   const allowed = ['name', 'left', 'top', 'cityLeft', 'cityTop', 'status', 'type', 'size', 'isShow'];
  //   const filtered = Object.keys(points)
  //     .filter(key => allowed.includes(key))
  //     .reduce((obj, key) => {
  //       obj[key] = points[key];
  //       return obj;
  //     }, {});
  //   // console.log(filtered)
  //   this.pointForm.setValue(filtered)
  // }

  savePointData() {
    // console.log('save', this.point)
    // console.log(point)
    this.saveEdit.emit(this.point)
  }



  closeEdit() {
    // this.resetToInit()
    this.closeEditEmit.emit(this.editIndex)
  }

  ngOnDestroy(): void {
    this.subscribeForm.unsubscribe()
  }

}

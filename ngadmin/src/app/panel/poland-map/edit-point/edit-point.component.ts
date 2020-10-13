import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterContentInit } from '@angular/core';
import { Point } from 'src/app/models/point';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Invest } from 'src/app/models/invest';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-point',
  templateUrl: './edit-point.component.html',
  styleUrls: ['./edit-point.component.less']
})
export class EditPointComponent implements OnInit, AfterContentInit, OnDestroy {



  @Input() point: Point
  pointBase: Point
  @Output() changePoint: EventEmitter<Point> = new EventEmitter()
  @Output() closeEditEmit: EventEmitter<any> = new EventEmitter()
  @Output() saveEdit: EventEmitter<Point> = new EventEmitter()
  pointForm: FormGroup
  private subscribeForm: Subscription
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.pointBase = Object.assign({}, this.point)
    this.pointForm = this.makeForm()
    this.subscribeToChangePoint()

  }
  ngAfterContentInit(): void {

  }

  subscribeToChangePoint() {
    this.subscribeForm = this.pointForm.valueChanges.subscribe(v => {
      // console.log(v)
      let p = v
      p.id = this.point.id
      this.changePoint.emit(p)
    })
  }

  makeForm(): FormGroup {
    return this.fb.group({
      name: [this.point.name],
      left: [this.point.left],
      top: [this.point.top],
      cityLeft: [this.point.cityLeft],
      cityTop: [this.point.cityTop],
      status: [this.point.status],
      type: [this.point.type],
      size: [this.point.size],
      isShow: [this.point.isShow]
    })
  }

  resetToInit() {
    const allowed = ['name', 'left', 'top', 'cityLeft', 'cityTop', 'status', 'type', 'size', 'isShow'];
    var points = Object.assign({}, this.pointBase)
    const filtered = Object.keys(points)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = points[key];
        return obj;
      }, {});
    // console.log(filtered)
    this.pointForm.setValue(filtered)
  }

  savePointData() {
    // console.log('save', this.point)
    // console.log(point)
    this.saveEdit.emit(this.point)
  }

  closeEdit() {
    this.resetToInit()
    this.closeEditEmit.emit()
  }

  ngOnDestroy(): void {
    this.subscribeForm.unsubscribe()
  }

}

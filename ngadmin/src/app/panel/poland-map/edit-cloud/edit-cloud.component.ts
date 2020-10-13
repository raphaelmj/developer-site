import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Point, PointChild } from 'src/app/models/point';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Invest } from 'src/app/models/invest';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-cloud',
  templateUrl: './edit-cloud.component.html',
  styleUrls: ['./edit-cloud.component.less']
})
export class EditCloudComponent implements OnInit, OnDestroy {



  @Input() point: Point;
  @Input() pointChild: PointChild;
  @Input() indexChild: number
  @Input() invest: Invest
  @Input() invests: Invest[]
  @Output() changeEmit: EventEmitter<{ pointChild: PointChild, indexChild: number | null, id: number }> = new EventEmitter()
  @Output() closeEmit: EventEmitter<any> = new EventEmitter()
  @Output() saveEdit: EventEmitter<Point> = new EventEmitter()
  cloudForm: FormGroup
  pointChildBase: PointChild
  investBase: Invest
  investId: number
  private subscribeForm: Subscription

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.pointChildBase = this.pointChild
    this.investBase = Object.assign({}, this.invest)
    if (this.invest)
      this.investId = this.invest.id
    this.cloudForm = this.makeForm()
    this.subscribeToValuesChange()
  }


  subscribeToValuesChange() {
    this.subscribeForm = this.cloudForm.valueChanges.subscribe(v => {
      // console.log(v)
      if (this.indexChild != null) {
        var pc: PointChild = Object.assign({}, this.point.childs[this.indexChild])
      } else {
        var pc: PointChild = Object.assign({}, this.point.child)
      }
      pc.name = v.name
      pc.address = v.address
      pc.status = v.status
      pc.cloudLeft = v.cloudLeft
      pc.cloudTopBottom = v.cloudTopBottom
      pc.openTo = v.openTo
      pc.isShow = v.isShow
      this.changeEmit.emit({ pointChild: pc, indexChild: this.indexChild, id: this.point.id })
    })
  }

  makeForm(): FormGroup {
    return this.fb.group({
      name: [this.pointChild.name],
      address: [this.pointChild.address],
      status: [this.pointChild.status],
      cloudLeft: [this.pointChild.cloudLeft],
      cloudTopBottom: [this.pointChild.cloudTopBottom],
      openTo: [this.pointChild.openTo],
      isShow: [this.pointChild.isShow]
    })
  }

  resetToInit() {
    const allowed = ['name', 'address', 'status', 'cloudLeft', 'cloudTopBottom', 'openTo', 'isShow'];
    var pointChild = Object.assign({}, this.pointChildBase)

    const filtered = Object.keys(pointChild)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = pointChild[key];
        return obj;
      }, {});
    this.cloudForm.setValue(filtered)
    this.pointChild.investId = this.investId
    this.invest = Object.assign({}, this.investBase)
    this.pointChild.status = this.investBase.status
  }

  changeInvest(inv: Invest) {
    this.invest = inv
    this.pointChild.investId = inv.id
    this.pointChild.status = inv.status
    this.pointChild.url = '/' + inv.slug
    this.cloudForm.get('status').setValue(inv.status)
  }

  saveCloudData() {

    this.saveEdit.emit(this.point)
  }

  closeEdit() {
    this.resetToInit()
    this.closeEmit.emit()
  }

  ngOnDestroy(): void {
    this.subscribeForm.unsubscribe()
  }

}

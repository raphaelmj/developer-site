import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, OnDestroy } from '@angular/core';
import { Point, PointChild } from 'src/app/models/point';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Invest } from 'src/app/models/invest';
import { MapFreeCloudService } from 'src/app/services/map-free-cloud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-cloud',
  templateUrl: './add-cloud.component.html',
  styleUrls: ['./add-cloud.component.less']
})
export class AddCloudComponent implements OnInit, AfterContentInit, OnDestroy {


  @Input() point: Point
  @Input() pointChild: PointChild;
  @Input() pointIndex: number
  @Input() invests: Invest[]
  invest: Invest
  @Output() changeEmit: EventEmitter<{ pointChild: PointChild, indexChild: number | null, id: number }> = new EventEmitter()
  @Output() closeEmit: EventEmitter<any> = new EventEmitter()
  @Output() saveEdit: EventEmitter<Point> = new EventEmitter()
  cloudForm: FormGroup
  pointChildBase: PointChild
  cloudIndex: number
  private subscribeForm: Subscription
  constructor(private fb: FormBuilder, private mapFreeCloudService: MapFreeCloudService) { }

  ngOnInit() {
    this.cloudForm = this.makeForm()
    this.subscribeToValuesChange()
    this.subscribeToGetIndexCloud()
  }

  ngAfterContentInit(): void {
    let pc: PointChild = Object.assign(this.pointChild, this.cloudForm.value)
    this.mapFreeCloudService.showCloud(true, pc, this.pointIndex, null)
  }

  subscribeToValuesChange() {
    this.subscribeForm = this.cloudForm.valueChanges.subscribe(v => {
      this.pushChangeToMap()
    })
  }

  subscribeToGetIndexCloud() {
    this.mapFreeCloudService.cloudFreeIndex$.subscribe(d => {
      // console.log(d)
      this.cloudIndex = d.indexCloud
    })
  }

  pushChangeToMap() {
    let pc: PointChild = Object.assign(this.pointChild, this.cloudForm.value)
    this.mapFreeCloudService.showCloud(false, pc, this.pointIndex, null)
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



  changeInvest(inv: Invest) {
    this.invest = inv
    this.invest = inv
    this.pointChild.investId = inv.id
    this.pointChild.status = inv.status
    this.pointChild.url = '/' + inv.slug
    this.cloudForm.get('status').setValue(inv.status)
    this.pushChangeToMap()
  }

  saveCloudData() {
    // console.log('save', this.point.childs)
    this.saveEdit.emit(this.point)
  }

  closeEdit() {
    this.mapFreeCloudService.clearCloud(this.pointIndex, this.cloudIndex)
    this.closeEmit.emit()
  }

  ngOnDestroy(): void {
    this.subscribeForm.unsubscribe()
  }

}

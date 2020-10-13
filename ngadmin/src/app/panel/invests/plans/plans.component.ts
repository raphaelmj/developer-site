import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Plan } from 'src/app/models/invest';
import { OnePlanEditComponent } from './one-plan-edit/one-plan-edit.component';
import { FreeArea } from '../../../models/invest';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.less']
})
export class PlansComponent implements OnInit, AfterViewInit {

  @Input() plans: Plan[]
  @Output() emitChange: EventEmitter<Plan[]> = new EventEmitter()
  @Output() emitClose: EventEmitter<any> = new EventEmitter()
  @ViewChildren(OnePlanEditComponent) oneEdits: QueryList<OnePlanEditComponent>;


  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.changeSubscribe()
    this.oneEdits.changes.subscribe(on => {
      this.changeSubscribe()
    })
  }

  changeSubscribe() {
    // console.log(this.oneEdits)
    this.oneEdits.forEach(oep => {
      oep.changeEmit.subscribe(data => {
        console.log(data)
        this.plans[data.index] = data.data
        this.plans[data.index].showFile = data.showFile
        this.plans[data.index].isAsZone = data.isAsZone
        this.plans[data.index].freeArea = data.freeArea
        this.emitChange.emit(this.plans)
      })
      oep.removeEmit.subscribe(index => {
        this.plans.splice(index, 1)
        this.emitChange.emit(this.plans)
      })
    })
  }

  closeEdit() {
    this.emitClose.emit()
  }

  addPlan(where: string) {

    if (where == 'last') {
      this.plans.push({
        image: null,
        sizeString: null,
        file: null,
        showFile: false,
        isAsZone: false,
        details: [],
        freeArea: {
          showArea: false,
          valueArea: ''
        }
      })
    }

    if (where == 'first') {
      this.plans.unshift({
        image: null,
        sizeString: null,
        file: null,
        showFile: false,
        isAsZone: false,
        details: [],
        freeArea: {
          showArea: false,
          valueArea: ''
        }
      })
    }
    this.emitChange.emit(this.plans)


  }

  removePlan($event) {
    // console.log($event)
    this.plans.splice($event, 1)
    this.emitChange.emit(this.plans)
  }

}

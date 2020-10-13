import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { Plan } from 'src/app/models/invest';
import { API_URL } from 'src/app/config';
import Sortable, { MultiDrag, Swap } from 'sortablejs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-plan-preview',
  templateUrl: './plan-preview.component.html',
  styleUrls: ['./plan-preview.component.less']
})
export class PlanPreviewComponent implements OnInit, OnChanges {

  @Input() plans: Plan[]
  @Output() changePlans: EventEmitter<Plan[]> = new EventEmitter()
  apiUrl: string = API_URL
  sortable: Sortable

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
  }

  ngOnInit() {
    this.createSortable()
  }

  createSortable() {

    this.sortable = new Sortable(this.document.getElementById('sortGrid'), {


      // Element dragging ended
      onEnd: function (/**Event*/evt) {
        // console.log(evt.oldIndex, evt.newIndex)
        var element = this.plans[evt.oldIndex];
        this.plans.splice(evt.oldIndex, 1);
        this.plans.splice(evt.newIndex, 0, element);
        this.changePlans.emit(this.plans)
      }.bind(this)

    })
  }

  removePlan(index: number) {
    this.plans.splice(index, 1)
    this.changePlans.emit(this.plans)
  }

}

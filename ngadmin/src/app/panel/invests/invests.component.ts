import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Type, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invest } from 'src/app/models/invest';
import { EditInvestComponent } from './edit-invest/edit-invest.component';
import { AddInvestComponent } from './add-invest/add-invest.component';
import { API_URL } from 'src/app/config';
import { InvestService } from 'src/app/services/invests/invest.service';
import { map, filter } from 'rxjs/operators';
import Sortable, { MultiDrag, Swap } from 'sortablejs';
import { DOCUMENT } from '@angular/common';
import { ConfirmWindowComponent } from 'src/app/tools/confirm-window/confirm-window.component';

@Component({
  selector: 'app-invests',
  templateUrl: './invests.component.html',
  styleUrls: ['./invests.component.less']
})
export class InvestsComponent implements OnInit {

  @ViewChild('editTemp', { read: ViewContainerRef, static: true }) editTemp: ViewContainerRef
  editInvestC: ComponentRef<EditInvestComponent>
  addInvestC: ComponentRef<AddInvestComponent>
  confirmWindow: ComponentRef<ConfirmWindowComponent>
  invests: Invest[]
  apiUrl: string = API_URL
  sortable: Sortable


  constructor(private activatedRoute: ActivatedRoute, private cf: ComponentFactoryResolver, private investService: InvestService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.invests = this.activatedRoute.snapshot.data['invests']
    // this.editInvest(this.invests[13])
    this.createSortable()
  }

  createSortable() {

    this.sortable = new Sortable(this.document.getElementById('sortInvest'), {

      // Element dragging ended
      onEnd: function (/**Event*/evt) {
        // console.log(evt.oldIndex, evt.newIndex)
        var element = this.invests[evt.oldIndex];
        this.invests.splice(evt.oldIndex, 1);
        this.invests.splice(evt.newIndex, 0, element);
        this.updateInvestOrder()

      }.bind(this)

    })
  }


  addInvest() {
    let add = this.cf.resolveComponentFactory(<Type<AddInvestComponent>>AddInvestComponent)
    this.addInvestC = this.editTemp.createComponent(add)
    this.addInvestC.instance.emitUpdateList.subscribe(d => {
      this.getInvestList()
    })
    this.addInvestC.instance.emitClose.subscribe(d => {
      this.addInvestC.destroy()
    })
  }

  editInvest(invest: Invest) {
    let edit = this.cf.resolveComponentFactory(<Type<EditInvestComponent>>EditInvestComponent)
    this.editInvestC = this.editTemp.createComponent(edit)
    this.editInvestC.instance.invest = invest
    this.editInvestC.instance.emitUpdateList.subscribe(d => {
      this.getInvestList()
    })
    this.editInvestC.instance.emitClose.subscribe(d => {
      this.editInvestC.destroy()
    })
  }

  getInvestList() {
    this.investService.getInvests().subscribe(invs => {
      this.invests = invs
    })
  }

  updateInvestOrder() {
    // console.log(this.invests)
    this.investService.changeInvestOrder(this.invests).subscribe(invs => {
      this.invests = invs
    })
  }


  changeInvestShow($event, invest: Invest) {
    // console.log($event.checked, invest)
    this.investService.updateField($event.checked, 'isShow', invest.id).subscribe(invs => {
      this.invests = invs
    })
  }

  startRemoveInvest(invest: Invest) {
    this.editTemp.clear()
    let confirm = this.cf.resolveComponentFactory(<Type<ConfirmWindowComponent>>ConfirmWindowComponent)
    this.confirmWindow = this.editTemp.createComponent(confirm)
    this.confirmWindow.instance.message = 'Czy chcesz usunąć inwestycje?'
    this.confirmWindow.instance.bundleData = invest
    this.confirmWindow.instance.emitActionConfirm.subscribe(what => {
      this.confirmWindow.destroy()
      // console.log(what)
      if (what.do) {
        this.removeInvest(what.bundleData)
      }
    })
  }

  removeInvest(invest: Invest) {
    this.investService.removeInvest(invest).subscribe(invs => {
      this.invests = invs
    })
  }

}

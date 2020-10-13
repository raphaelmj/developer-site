import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Plan, PlanDetail, PlanDetailData } from 'src/app/models/invest';
import { API_URL } from 'src/app/config';
import { UploadService } from 'src/app/tools/drop-files/upload.service';
import { OneFileUploadService } from 'src/app/services/one-file-upload.service';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FreeArea } from '../../../../models/invest';


@Component({
  selector: 'app-one-plan-edit',
  templateUrl: './one-plan-edit.component.html',
  styleUrls: ['./one-plan-edit.component.less']
})
export class OnePlanEditComponent implements OnInit, OnDestroy {

  @Input() plan: Plan
  @Input() index: number
  @Output() changeEmit: EventEmitter<{ index: number, data: Plan, showFile: boolean, isAsZone: boolean, freeArea: FreeArea }> = new EventEmitter()
  @Output() removeEmit: EventEmitter<number> = new EventEmitter()
  @ViewChild('filePdf', { read: ElementRef, static: true }) filePdf: ElementRef;
  @ViewChild('fileImage', { read: ElementRef, static: true }) fileImage: ElementRef;
  subForm: Subscription
  planForm: FormGroup
  apiUrl: string = API_URL

  constructor(private fb: FormBuilder, private oneFileUploadService: OneFileUploadService) { }

  ngOnInit() {
    this.planForm = this.makeForm()
    this.subscribeToChange()
    // console.log(this.plan)
    // console.log(this.plan.details)
  }

  subscribeToChange() {
    this.subForm = this.planForm.valueChanges.subscribe(d => {
      this.outputChangeData()
    });
  }

  makeForm(): FormGroup {
    return this.fb.group({
      showFile: [this.plan.showFile],
      isAsZone: [this.plan.isAsZone],
      details: this.makeFormDetailsArray(),
      freeArea: this.makeAreaGroup(this.plan.freeArea)
    })
  }

  makeFormDetailsArray(): FormArray {
    var arr: FormArray = this.fb.array([])
    this.plan.details.map(pd => {
      arr.push(
        this.makePlanGroup(pd)
      )
    })
    return arr
  }

  makeAreaGroup(f: FreeArea): FormGroup {
    return this.fb.group({
      showArea: [f.showArea],
      valueArea: [f.valueArea]
    })
  }

  makePlanGroup(p: PlanDetail): FormGroup {
    return this.fb.group({
      title: [p.title],
      type: [p.type],
      data: this.makePlanDetailsDataArray(p.data)
    })
  }

  makePlanDetailsDataArray(pddata: PlanDetailData[]): FormArray {
    var arr: FormArray = this.fb.array([])
    pddata.map(pdd => {
      arr.push(
        this.makePlanDetalisData(pdd)
      )
    })
    return arr
  }

  makePlanDetalisData(pdd: PlanDetailData): FormGroup {
    return this.fb.group({
      label: [pdd.label],
      value: [pdd.value]
    })
  }

  get detailsArray() {
    return this.planForm.get('details') as FormArray;
  }

  addPlanSection() {
    var arr: FormArray = this.fb.array([])
    arr.push(this.fb.group({
      label: [''],
      value: ['']
    }))
    this.detailsArray.push(
      this.fb.group({
        title: [''],
        type: ['list'],
        data: arr
      }))
    this.outputChangeData()
  }

  removeSection(index: number) {

    this.detailsArray.removeAt(index)
    // this.detailsArray.value.splice(index, 1)
    // this.outputChangeData()
  }


  addPlanSectionDataElement(index: number) {
    this.detailsDataArray(index).push(this.fb.group({
      label: [''],
      value: ['']
    }))
    // this.planForm.get('details').value[i].get('data').value.push({ label: '', value: '' })
    // this.planForm.get('details')['controls'][index].get('data').push(this.fb.group({
    //   label: [''],
    //   value: ['']
    // }))
    // this.outputChangeData()
  }

  detailsDataArray(i: number): FormArray {
    return this.planForm.get('details')['controls'][i].get('data') as FormArray;
  }

  removeSectionDataElement(i: number, j: number) {

    this.detailsDataArray(i).removeAt(j)
    // console.log(this.planForm.get('details')['controls'][i])
    // this.planForm.get('details')['controls'][i].get('data').value.splice(j, 1)
    // this.outputChangeData()
  }

  outputChangeData() {
    var pD: PlanDetail[] = this.planForm.get('details').value
    // console.log(pD)
    this.plan.details = pD;
    this.changeEmit.emit(
      {
        index: this.index,
        data: this.plan,
        showFile: this.planForm.get('showFile').value,
        isAsZone: this.planForm.get('isAsZone').value,
        freeArea: this.planForm.get('freeArea').value
      })
  }

  handleFileInput(file: File, type: string) {
    this.oneFileUploadService.uploadFiles(file[0]).subscribe(event => {
      // console.log(event)
      if (event instanceof HttpResponse) {
        // console.log(event.body)
        if (event.body.typeFile == 'pdf') {
          this.filePdf.nativeElement.value = ''
          this.plan.file = event.body.file
        }

        if (event.body.typeFile == 'image') {
          this.fileImage.nativeElement.value = ''
          this.plan.image = event.body.file
          this.plan.sizeString = event.body.sizeString
        }
        this.outputChangeData()

      }
    })
  }

  removePlan() {
    this.removeEmit.emit(this.index)
  }

  ngOnDestroy(): void {
    this.subForm.unsubscribe()
  }


}

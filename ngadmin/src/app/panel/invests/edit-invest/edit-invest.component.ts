import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Type } from '@angular/core';
import { Invest, InvestContact, InvestRentiersContact, InvestMenagmentsContact, SiteLink } from 'src/app/models/invest';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { CK_EDITOR_CONFIG, API_URL } from 'src/app/config';
import { PlansComponent } from '../plans/plans.component';
import { PlanPreviewComponent } from '../plan-preview/plan-preview.component';
import { InvestService } from 'src/app/services/invests/invest.service';

@Component({
  selector: 'app-edit-invest',
  templateUrl: './edit-invest.component.html',
  styleUrls: ['./edit-invest.component.less']
})
export class EditInvestComponent implements OnInit {

  @Input() invest: Invest
  @Output() emitClose: EventEmitter<any> = new EventEmitter()
  @Output() emitUpdateList: EventEmitter<any> = new EventEmitter()
  @ViewChild('editClouds', { read: ViewContainerRef, static: true }) editClouds: ViewContainerRef
  @ViewChild(PlanPreviewComponent, { static: true }) planPreview: PlanPreviewComponent
  plansEdit: ComponentRef<PlansComponent>
  investForm: FormGroup
  ckEditorConfig: any = CK_EDITOR_CONFIG
  apiUrl: string = API_URL

  headerCroppedImage: string = null
  horizontCroppedImage: string = null
  mapCroppedImage: { image: string, imageBig: string } = { image: null, imageBig: null }

  constructor(private fb: FormBuilder, private cfactory: ComponentFactoryResolver, private investService: InvestService) { }

  ngOnInit() {
    // console.log(this.invest)
    this.investForm = this.makeForm()
  }

  makeForm(): FormGroup {
    return this.fb.group({
      mainName: [this.invest.mainName, Validators.required],
      projectName: [this.invest.projectName],
      address: [this.invest.address, Validators.required],
      city: [this.invest.city, Validators.required],
      areaSize: [this.invest.areaSize],
      parkingAreaSize: [this.invest.parkingAreaSize],
      rentiers: [this.invest.rentiers],
      textLeft: [this.invest.textLeft],
      textRight: [this.invest.textRight],
      openDate: [this.invest.openDate],
      siteLinkLink: [(this.invest.siteLink) ? this.invest.siteLink.link : null],
      siteLinkName: [(this.invest.siteLink) ? this.invest.siteLink.name : null],
      remodeling: [this.invest.remodeling],
      buyDate: [this.invest.buyDate],
      status: [this.invest.status],
      isShow: [this.invest.isShow],
      metaKeywords: [this.invest.metaKeywords],
      metaDescription: [this.invest.metaDescription],
      rentiersContacts: this.makeRentiersContactsFormGroup(),
      contacts: this.makeContactsFormGroup(),
      managementContacts: this.makeManagmentContactsFormGroup()
    })
  }

  makeContactsFormGroup(): FormArray {
    var arr: FormArray = this.fb.array([])
    if (this.invest.contacts) {
      this.invest.contacts.map(mc => {
        arr.push(
          this.makeGroupOneContact(mc)
        )
      })
    }
    return arr
  }

  makeGroupOneContact(c: InvestContact): FormGroup {
    return this.fb.group({
      who: [c.who],
      name: [c.name],
      email: [c.email],
      phone: [c.phone]
    })
  }


  addContact() {
    this.investForm.get('contacts')['controls'].push(
      this.fb.group({
        who: [''],
        name: [''],
        email: [''],
        phone: ['']
      }))
  }

  removeContact(i: number) {
    this.investForm.get('contacts')['controls'].splice(i, 1)
    this.investForm.get('contacts').value.splice(i, 1)
  }


  makeRentiersContactsFormGroup(): FormArray {
    var arr: FormArray = this.fb.array([])
    if (this.invest.rentiersContacts) {
      this.invest.rentiersContacts.map(mc => {
        arr.push(
          this.makeGroupOneContact(mc)
        )
      })
    }
    return arr
  }

  makeGroupOneRentiersContact(c: InvestRentiersContact): FormGroup {
    return this.fb.group({
      who: [c.who],
      name: [c.name],
      email: [c.email],
      phone: [c.phone]
    })
  }




  addRentiersContact() {
    this.investForm.get('rentiersContacts')['controls'].push(
      this.fb.group({
        who: [''],
        name: [''],
        email: [''],
        phone: ['']
      }))
  }


  removeRentiersContact(i: number) {
    this.investForm.get('rentiersContacts')['controls'].splice(i, 1)
    this.investForm.get('rentiersContacts').value.splice(i, 1)
  }


  makeManagmentContactsFormGroup(): FormArray {
    var arr: FormArray = this.fb.array([])
    if (this.invest.managementContacts) {
      this.invest.managementContacts.map(mc => {
        arr.push(
          this.makeGroupOneContact(mc)
        )
      })
    }
    return arr
  }

  makeGroupOneManagmentContact(c: InvestMenagmentsContact): FormGroup {
    return this.fb.group({
      who: [c.who],
      name: [c.name],
      email: [c.email],
      phone: [c.phone]
    })
  }

  editPlans() {
    this.editClouds.clear()
    let edit = this.cfactory.resolveComponentFactory(<Type<PlansComponent>>PlansComponent)
    this.plansEdit = this.editClouds.createComponent(edit)
    this.plansEdit.instance.plans = (this.invest.plans) ? this.invest.plans : []
    this.plansEdit.instance.emitClose.subscribe(d => {
      this.plansEdit.destroy()
    })
    this.plansEdit.instance.emitChange.subscribe(plans => {
      this.invest.plans = plans
      this.planPreview.plans = plans
      this.planPreview.changePlans.subscribe(pls => {
        this.invest.plans = pls
      })
    })
  }

  addManagmentContact() {
    this.investForm.get('managementContacts')['controls'].push(
      this.fb.group({
        who: [''],
        name: [''],
        email: [''],
        phone: ['']
      }))
  }


  changePlans($event) {
    this.invest.plans = $event
  }


  removeManagmentContact(i: number) {
    this.investForm.get('managementContacts')['controls'].splice(i, 1)
    this.investForm.get('managementContacts').value.splice(i, 1)
  }


  changeGallery($event) {
    this.invest.gallery = $event
  }

  changeHeaderImage($event) {
    this.headerCroppedImage = $event
  }

  changeHorizontImage($event) {
    this.horizontCroppedImage = $event
  }

  changeMapImage($event) {
    // console.log($event)
    switch ($event.imageType) {
      case 'image':
        this.mapCroppedImage.image = $event.image.image
        break;
      case 'imageBig':
        this.mapCroppedImage.imageBig = $event.image.image
        break
    }
  }

  changeZone($event) {
    if ($event) {
      this.invest.zone = $event
    } else {
      this.invest.zone = null
    }
  }

  closeEdit() {
    this.emitClose.emit()
  }

  saveForm() {


    // console.log(this.invest)
    // console.log(this.headerCroppedImage, this.horizontCroppedImage, this.mapCroppedImage)
    if (this.investForm.valid) {
      let invest: Invest = Object.assign({}, this.investForm.value);
      invest.siteLink = {
        link: this.investForm.get('siteLinkLink').value,
        name: this.investForm.get('siteLinkName').value,
      }
      console.log(this.invest)
      this.investService.updateInvest(invest, this.invest, this.headerCroppedImage, this.horizontCroppedImage, this.mapCroppedImage).then(r => {
        // console.log(r)
        this.emitUpdateList.emit()
      })
    }
  }


}

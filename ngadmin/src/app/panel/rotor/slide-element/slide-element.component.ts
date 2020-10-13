import { Component, OnInit, Input, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, Type, Output, EventEmitter } from '@angular/core';
import { Slide } from 'src/app/models/slide';
import { UploadImageComponent } from 'src/app/tools/upload-image/upload-image.component';
import { API_URL } from 'src/app/config';
import { SlideService } from 'src/app/services/slides/slide.service';
import { ConfirmWindowComponent } from 'src/app/tools/confirm-window/confirm-window.component';

@Component({
  selector: 'app-slide-element',
  templateUrl: './slide-element.component.html',
  styleUrls: ['./slide-element.component.less']
})
export class SlideElementComponent implements OnInit {

  @Input() slide: Slide
  @Output() emitChange: EventEmitter<any> = new EventEmitter()
  @ViewChild('editCloud', { read: ViewContainerRef, static: true }) editCloud: ViewContainerRef
  uploadImageC: ComponentRef<UploadImageComponent>
  confirmWindow: ComponentRef<ConfirmWindowComponent>
  croppedImage: string = null
  apiUrl: string = API_URL

  constructor(private cf: ComponentFactoryResolver, private slideService: SlideService) { }

  ngOnInit() {

  }

  changeSlideShow($event, s: Slide) {
    // console.log($event.checked)
    this.slideService.updateField($event.checked, 'status', s.id).subscribe(s => {
      this.updateSlideImage()
    })
  }

  editImage(s: Slide) {
    this.editCloud.clear()
    let edit = this.cf.resolveComponentFactory(<Type<UploadImageComponent>>UploadImageComponent)
    this.uploadImageC = this.editCloud.createComponent(edit)
    this.uploadImageC.instance.data = s
    this.uploadImageC.instance.maintainAspectRatio = true
    this.uploadImageC.instance.wProp = 1
    this.uploadImageC.instance.hProp = 0.46875
    this.uploadImageC.instance.resizeToWidth = 1600
    this.uploadImageC.instance.hideCloud.subscribe(close => {
      this.uploadImageC.destroy()
    })
    this.uploadImageC.instance.addImageEmit.subscribe(d => {
      // console.log(d)
      if (d.image && d.image != '') {
        this.croppedImage = d.image
        this.updateSlideImage()
      }
      this.uploadImageC.destroy()
    })
  }

  updateSlideImage() {
    this.slideService.updateSlideImage(this.croppedImage, this.slide.id).subscribe(s => {
      // console.log(s)
      this.emitChange.emit()
    })
  }

  startRemoveSlide() {
    this.editCloud.clear()
    let confirm = this.cf.resolveComponentFactory(<Type<ConfirmWindowComponent>>ConfirmWindowComponent)
    this.confirmWindow = this.editCloud.createComponent(confirm)
    this.confirmWindow.instance.message = 'Czy chcesz usunąć slajd?'
    this.confirmWindow.instance.bundleData = this.slide
    this.confirmWindow.instance.emitActionConfirm.subscribe(what => {
      this.confirmWindow.destroy()
      // console.log(what)
      if (what.do) {
        this.removeSlide(what.bundleData.id)
      }
    })
  }

  removeSlide(id: number) {
    this.slideService.removeSlide(id).then(r => {
      this.emitChange.emit()
    })
  }

}

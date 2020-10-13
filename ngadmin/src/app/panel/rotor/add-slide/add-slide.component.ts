import { Component, OnInit, Type, ComponentRef, ViewContainerRef, ViewChild, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { UploadImageComponent } from 'src/app/tools/upload-image/upload-image.component';
import { SlideService } from 'src/app/services/slides/slide.service';
import { API_URL } from 'src/app/config';
import { Slide } from 'src/app/models/slide';

@Component({
  selector: 'app-add-slide',
  templateUrl: './add-slide.component.html',
  styleUrls: ['./add-slide.component.less']
})
export class AddSlideComponent implements OnInit {

  @Output() emitChange: EventEmitter<Slide> = new EventEmitter()
  @Output() emitClose: EventEmitter<any> = new EventEmitter()
  @ViewChild('editCloud', { read: ViewContainerRef, static: true }) editCloud: ViewContainerRef
  apiUrl: string = API_URL
  uploadImageC: ComponentRef<UploadImageComponent>
  croppedImage: string = null
  status: boolean = false
  isImageExits: boolean = true

  constructor(private cf: ComponentFactoryResolver, private slideService: SlideService) { }

  ngOnInit() {
  }


  addImage() {
    this.editCloud.clear()
    let edit = this.cf.resolveComponentFactory(<Type<UploadImageComponent>>UploadImageComponent)
    this.uploadImageC = this.editCloud.createComponent(edit)
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
        this.isImageExits = true
      }
      this.uploadImageC.destroy()
    })
  }


  closeEdit() {
    this.emitClose.emit()
  }


  addSlide() {
    if (this.croppedImage) {
      this.isImageExits = true
      var s: Slide = this.slideService.createEmptySlide()
      this.slideService.addSlide(s, this.croppedImage).subscribe(s => {
        // console.log(s)
        this.emitChange.emit(s)
      })
    } else {
      this.isImageExits = false
    }
  }

}

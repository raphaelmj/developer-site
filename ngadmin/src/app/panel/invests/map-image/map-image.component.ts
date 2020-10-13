import { Component, OnInit, Output, Input, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, Type, EventEmitter } from '@angular/core';
import { MapImage } from "src/app/models/invest"
import { UploadImageComponent } from 'src/app/tools/upload-image/upload-image.component';
import { API_URL } from 'src/app/config';
@Component({
  selector: 'app-map-image',
  templateUrl: './map-image.component.html',
  styleUrls: ['./map-image.component.less']
})
export class MapImageComponent implements OnInit {

  @Input() mapImage: MapImage
  @Output() emitImageChange: EventEmitter<{ imageType: string, image: string }> = new EventEmitter()
  @ViewChild('imagePopup', { read: ViewContainerRef, static: true }) imagePopup: ViewContainerRef
  uploadImageC: ComponentRef<UploadImageComponent>
  apiUrl: string = API_URL
  croppedImage: string = null
  croppedImageBig: string = null

  constructor(private fc: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  openEdit(imageType: string) {
    this.imagePopup.clear()
    let editImage = this.fc.resolveComponentFactory(<Type<UploadImageComponent>>UploadImageComponent)
    this.uploadImageC = this.imagePopup.createComponent(editImage)
    this.uploadImageC.instance.data = imageType
    this.setImageCropProp(imageType)
    this.uploadImageC.instance.maintainAspectRatio = true
    this.uploadImageC.instance.resizeToWidth = 1600
    this.uploadImageC.instance.hideCloud.subscribe(d => {
      this.uploadImageC.destroy()
    })
    this.uploadImageC.instance.addImageEmit.subscribe(image => {
      this.uploadImageC.destroy()
      // console.log(image)
      this.changeImage(image)
      this.emitImageChange.emit({ imageType: image.data, image })
    })
  }

  setImageCropProp(imageType: string) {
    switch (imageType) {
      case 'image':
        this.uploadImageC.instance.wProp = 1
        this.uploadImageC.instance.hProp = 0.3256
        break;
      case 'imageBig':
        this.uploadImageC.instance.wProp = 1
        this.uploadImageC.instance.hProp = 0.5625
        break
    }
  }

  changeImage(image: { data: string, image: string }) {
    switch (image.data) {
      case 'image':
        this.croppedImage = image.image
        this.emitImageChange.emit({ imageType: image.data, image: image.image })
        break;
      case 'imageBig':
        this.croppedImageBig = image.image
        this.emitImageChange.emit({ imageType: image.data, image: image.image })
        break
    }
  }

  backBasePhoto(imageType: string) {
    switch (imageType) {
      case 'image':
        this.croppedImage = null
        this.emitImageChange.emit({ imageType, image: null })
        break;
      case 'imageBig':
        this.croppedImageBig = null
        this.emitImageChange.emit({ imageType, image: null })
        break
    }

  }

}

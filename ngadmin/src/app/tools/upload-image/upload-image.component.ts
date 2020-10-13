import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.less']
})
export class UploadImageComponent implements OnInit, OnChanges {


  @Output() addImageEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() hideCloud: EventEmitter<any> = new EventEmitter<any>();
  @Input() data;
  @Input() wProp: number = 1;
  @Input() hProp: number = 1;
  @Input() maintainAspectRatio: boolean = false;
  @Input() resizeToWidth: number = 1320

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor() {
    // console.log(this.wProp)
    // this.aspectRatio = this.wProp + '/' + this.hProp;
    // console.log(this.aspectRatio)
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(event)
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

  hideNotSave() {
    this.hideCloud.emit();
  }

  saveChanges() {
    let data = {
      data: this.data,
      image: this.croppedImage
    }
    this.addImageEmit.emit(data)
  }

}

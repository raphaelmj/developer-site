import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Zone } from 'src/app/models/invest';
import { API_URL } from 'src/app/config';
import { OneFileUploadService } from 'src/app/services/one-file-upload.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.less']
})
export class ZoneComponent implements OnInit {

  @Input() zone: Zone
  @Output() emitZoneChange: EventEmitter<any> = new EventEmitter()
  @ViewChild('filePdf', { read: ElementRef, static: true }) filePdf: ElementRef;
  @ViewChild('fileImage', { read: ElementRef, static: true }) fileImage: ElementRef;
  apiUrl: string = API_URL
  isFile: boolean;

  constructor(private oneFileUploadService: OneFileUploadService) { }

  ngOnInit() {
  }

  isFileCahnge($event) {
    this.zone.showFile = $event.checked
    this.emitZoneChange.emit(this.zone)
  }

  handleFileInput(file: File, type: string) {

    if (!this.zone) {
      this.zone = {
        image: null,
        sizeString: null,
        pdf: null
      }
    }

    this.oneFileUploadService.uploadFiles(file[0]).subscribe(event => {
      // console.log(event)
      if (event instanceof HttpResponse) {
        console.log(event.body)
        if (event.body.typeFile == 'pdf') {
          this.filePdf.nativeElement.value = ''
          this.zone.pdf = event.body.file
        }

        if (event.body.typeFile == 'image') {
          this.fileImage.nativeElement.value = ''
          this.zone.image = event.body.file
          this.zone.sizeString = event.body.sizeString
        }
        this.emitZoneChange.emit(this.zone)
      }
    })
  }

  clearZone() {
    this.zone = null
    this.emitZoneChange.emit(this.zone)
  }

}

import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { GalleryImage } from '../../../models/invest';
import { from } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { UploadService } from '../../../tools/drop-files/upload.service';
import { HttpResponse } from '@angular/common/http';
import { API_URL } from '../../../config';
import Sortable, { MultiDrag, Swap } from 'sortablejs';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less']
})
export class GalleryComponent implements OnInit {

  @Input() galleryImages: GalleryImage[]
  @Output() emitGalleryChange: EventEmitter<GalleryImage[]> = new EventEmitter()
  files: File[] = [];
  filesUF: File[] = [];
  formData: FormData;
  apiUrl: string = API_URL
  sortable: Sortable

  constructor(private uploadService: UploadService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.createSortable()
  }

  createSortable() {

    this.sortable = new Sortable(this.document.getElementById('sortGallery'), {


      // Element dragging ended
      onEnd: function (/**Event*/evt) {
        // console.log(evt.oldIndex, evt.newIndex)
        var element = this.galleryImages[evt.oldIndex];
        this.galleryImages.splice(evt.oldIndex, 1);
        this.galleryImages.splice(evt.newIndex, 0, element);

      }.bind(this)

    })
  }

  ngAfterContentChecked() {
    from(this.files).pipe(
      filter(file => {
        var bool: boolean = true;
        this.filesUF.map(f => {
          if (f.name == file.name && f.type == file.type && f.size == file.size) {
            bool = false;
          }
        })
        // console.log(file.type)
        if (file.type != 'image/jpeg' && file.type != 'image/png') {
          bool = false;
        }
        return bool
      })
    ).subscribe(fileUnique => {
      this.filesUF.push(fileUnique);
    })
  }

  uploadFiles() {
    this.uploadService.uploadFiles(this.formData).subscribe(event => {

      if (event instanceof HttpResponse) {
        // console.log(event.body)
        // console.log(this.galleryImages)
        this.files = []
        this.filesUF = []
        if (this.galleryImages) {
          this.galleryImages = this.galleryImages.concat(event.body)
        } else {
          // console.log('null')
          this.galleryImages = event.body
        }

        this.outputChangeGallery()
      }
    })
  }

  outputChangeGallery() {
    this.emitGalleryChange.emit(this.galleryImages)
  }

  removeImage(i: number) {
    this.galleryImages.splice(i, 1)
    this.outputChangeGallery()
  }



}

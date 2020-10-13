import { Component, OnInit, Inject, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlideService } from 'src/app/services/slides/slide.service';
import { Slide } from 'src/app/models/slide';
import Sortable, { MultiDrag, Swap } from 'sortablejs';
import { DOCUMENT } from '@angular/common';
import { API_URL } from 'src/app/config';
import { UploadImageComponent } from 'src/app/tools/upload-image/upload-image.component';
import { AddSlideComponent } from './add-slide/add-slide.component';

@Component({
  selector: 'app-rotor',
  templateUrl: './rotor.component.html',
  styleUrls: ['./rotor.component.less']
})
export class RotorComponent implements OnInit {

  @ViewChild('editCloud', { read: ViewContainerRef, static: true }) editCloud: ViewContainerRef
  addSlideC: ComponentRef<AddSlideComponent>
  slides: Slide[]
  apiUrl: string = API_URL
  sortable: Sortable

  constructor(private activatedRoute: ActivatedRoute, private slideService: SlideService, @Inject(DOCUMENT) private document: Document, private cf: ComponentFactoryResolver) { }

  ngOnInit() {
    this.slides = this.activatedRoute.snapshot.data['slides']
    this.createSortable()
  }

  createSortable() {

    this.sortable = new Sortable(this.document.getElementById('sortSlides'), {


      // Element dragging ended
      onEnd: function (/**Event*/evt) {
        // console.log(evt.oldIndex, evt.newIndex)
        var element = this.slides[evt.oldIndex];
        this.slides.splice(evt.oldIndex, 1);
        this.slides.splice(evt.newIndex, 0, element);
        this.updateSlidesOrder()
      }.bind(this)

    })
  }

  changeImage($event) {
    this.slideService.getSlides().subscribe(sls => {
      this.slides = sls
    })
  }

  updateSlidesOrder() {
    this.slideService.updateOrder(this.slides).subscribe(slides => {
      this.slides = slides
    })
  }

  addSlide() {
    this.editCloud.clear()
    let add = this.cf.resolveComponentFactory(<Type<AddSlideComponent>>AddSlideComponent)
    this.addSlideC = this.editCloud.createComponent(add)
    this.addSlideC.instance.emitClose.subscribe(d => {
      this.addSlideC.destroy()
    })
    this.addSlideC.instance.emitChange.subscribe(s => {
      this.slidesGet()
      this.addSlideC.destroy()
    })
  }

  slidesGet() {
    this.slideService.getSlides().subscribe(sls => {
      this.slides = sls
    })
  }

}

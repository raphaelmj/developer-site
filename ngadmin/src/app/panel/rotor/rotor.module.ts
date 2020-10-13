import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RotorRoutingModule } from './rotor-routing.module';
import { RotorComponent } from './rotor.component';
import { ServicesModule } from 'src/app/services/services.module';
import { MatButtonModule, MatSlideToggleModule, MatProgressSpinnerModule } from '@angular/material';
import { ToolsModule } from 'src/app/tools/tools.module';
import { UploadImageComponent } from 'src/app/tools/upload-image/upload-image.component';
import { SlideElementComponent } from './slide-element/slide-element.component';
import { AddSlideComponent } from './add-slide/add-slide.component';
import { ConfirmWindowComponent } from 'src/app/tools/confirm-window/confirm-window.component';

@NgModule({
  declarations: [RotorComponent, SlideElementComponent, AddSlideComponent],
  imports: [
    CommonModule,
    RotorRoutingModule,
    ServicesModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    ToolsModule
  ],
  entryComponents: [
    UploadImageComponent,
    AddSlideComponent,
    ConfirmWindowComponent
  ]
})
export class RotorModule { }

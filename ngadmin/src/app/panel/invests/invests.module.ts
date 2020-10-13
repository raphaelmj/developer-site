import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestsRoutingModule } from './invests-routing.module';
import { MatButtonModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatProgressSpinnerModule } from '@angular/material';
import { InvestsComponent } from './invests.component';
import { AddInvestComponent } from './add-invest/add-invest.component';
import { EditInvestComponent } from './edit-invest/edit-invest.component';
import { ServicesModule } from 'src/app/services/services.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { ToolsModule } from 'src/app/tools/tools.module';
import { PlansComponent } from './plans/plans.component';
import { PlanPreviewComponent } from './plan-preview/plan-preview.component';
import { OnePlanEditComponent } from './plans/one-plan-edit/one-plan-edit.component';
import { UploadService } from 'src/app/tools/drop-files/upload.service';
import { DropFilesComponent } from '../../tools/drop-files/drop-files.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ngfModule, ngf } from "angular-file";
import { MainImageComponent } from './main-image/main-image.component';
import { HorizontalImageComponent } from './horizontal-image/horizontal-image.component';
import { MapImageComponent } from './map-image/map-image.component';
import { ZoneComponent } from './zone/zone.component'
import { UploadImageComponent } from 'src/app/tools/upload-image/upload-image.component';
import { ConfirmWindowComponent } from 'src/app/tools/confirm-window/confirm-window.component';

@NgModule({
  declarations: [InvestsComponent, AddInvestComponent, EditInvestComponent, PlansComponent, PlanPreviewComponent, OnePlanEditComponent, GalleryComponent, MainImageComponent, HorizontalImageComponent, MapImageComponent, ZoneComponent],
  imports: [
    CommonModule,
    InvestsRoutingModule,
    ServicesModule,
    MatButtonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    ToolsModule,
    CKEditorModule,
    NgxFileDropModule,
    ngfModule
  ],
  providers: [
    UploadService
  ],
  entryComponents: [
    AddInvestComponent,
    EditInvestComponent,
    PlansComponent,
    PlanPreviewComponent,
    DropFilesComponent,
    UploadImageComponent,
    ConfirmWindowComponent
  ]
})
export class InvestsModule { }

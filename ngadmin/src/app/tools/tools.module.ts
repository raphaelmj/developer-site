import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmWindowComponent } from "./confirm-window/confirm-window.component";
import { InputXeditableComponent } from "./input-xeditable/input-xeditable.component";
import { FormsModule } from "@angular/forms";
import { SelectXeditableComponent } from './select-xeditable/select-xeditable.component';
import { ConfirmDoubleWindowComponent } from './confirm-double-window/confirm-double-window.component';
import { MatIconModule } from '@angular/material/icon';
import { TextareaXeditableComponent } from './textarea-xeditable/textarea-xeditable.component';
import { PaginationComponent } from './pagination/pagination.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DropFilesComponent } from './drop-files/drop-files.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ngfModule, ngf } from "angular-file"
import { UploadService } from './drop-files/upload.service';
import { DropFilesSimpleComponent } from './drop-files-simple/drop-files-simple.component';
import { UploadSimpleService } from './drop-files-simple/upload-simple.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    ImageCropperModule,
    NgxFileDropModule,
    ngfModule
  ],
  declarations: [ConfirmWindowComponent, InputXeditableComponent, SelectXeditableComponent, ConfirmDoubleWindowComponent, TextareaXeditableComponent, PaginationComponent, UploadImageComponent, DropFilesComponent, DropFilesSimpleComponent],
  exports: [ConfirmWindowComponent, InputXeditableComponent, SelectXeditableComponent, ConfirmDoubleWindowComponent, TextareaXeditableComponent, PaginationComponent, UploadImageComponent, DropFilesComponent, DropFilesSimpleComponent],
  providers: [UploadService, UploadSimpleService]
})
export class ToolsModule { }

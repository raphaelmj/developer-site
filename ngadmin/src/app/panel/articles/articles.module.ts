import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from 'src/app/services/services.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { ToolsModule } from 'src/app/tools/tools.module';
import { MatButtonModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatProgressSpinnerModule } from '@angular/material';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

@NgModule({
  declarations: [ArticlesComponent, EditArticleComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    ServicesModule,
    MatButtonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    ToolsModule,
    CKEditorModule,
  ],
  entryComponents: [
    EditArticleComponent
  ]
})
export class ArticlesModule { }

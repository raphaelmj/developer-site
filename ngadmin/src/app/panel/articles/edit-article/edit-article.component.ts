import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/models/article';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CK_EDITOR_CONFIG } from 'src/app/config';
import { ArticleService } from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.less']
})
export class EditArticleComponent implements OnInit {

  @Input() article: Article
  @Output() emitUpdate: EventEmitter<any> = new EventEmitter()
  articleForm: FormGroup
  ckEditorConfig: any = CK_EDITOR_CONFIG

  constructor(private fb: FormBuilder, private articleService: ArticleService) { }

  ngOnInit() {
    this.articleForm = this.createForm()
    this.createNestedIfExits()
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: [this.article.title],
      contentType: [this.article.contentType],
      singleContent: [this.article.singleContent],
      textLeft: [this.article.textLeft],
      textRight: [this.article.textRight]
    })
  }

  createNestedIfExits() {
    if (this.article.customData) {
      this.articleForm.addControl('customData', this.fb.group({
        title: [this.article.customData.title],
        firstRow: [this.article.customData.firstRow],
        secondRow: [this.article.customData.secondRow],
        link: [this.article.customData.link]
      }))
    } else {
      this.articleForm.addControl('customData', new FormControl())
    }
  }

  saveArticle() {

    let article: Article = this.articleForm.value
    this.articleService.updateArticle(article, this.article.id).then(r => {
      // console.log(r)
      this.emitUpdate.emit()
    })
  }

}

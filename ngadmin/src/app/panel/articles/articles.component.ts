import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Type } from '@angular/core';
import { ArticleService } from 'src/app/services/articles/article.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { EditArticleComponent } from './edit-article/edit-article.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.less']
})
export class ArticlesComponent implements OnInit {

  @ViewChild('editScreen', { read: ViewContainerRef, static: true }) editScreen: ViewContainerRef
  editArticle: ComponentRef<EditArticleComponent>
  articles: Article[]

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute, private cf: ComponentFactoryResolver) { }

  ngOnInit() {
    this.articles = this.activatedRoute.snapshot.data['articles']
    this.openEditArticle(this.articles[2])
  }

  openEditArticle(article: Article) {
    this.editScreen.clear()
    let edit = this.cf.resolveComponentFactory(<Type<EditArticleComponent>>EditArticleComponent)
    this.editArticle = this.editScreen.createComponent<EditArticleComponent>(edit)
    this.editArticle.instance.article = article
    this.editArticle.instance.emitUpdate.subscribe(d => {
      this.getArticles()
    })
  }

  getArticles() {
    this.articleService.getArticles().subscribe(arts => {
      this.articles = arts
    })
  }

}

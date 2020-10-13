import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Article } from 'src/app/models/article';
import { Observable } from 'rxjs';
import { ArticleService } from './article.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolveService implements Resolve<Article[]> {

  constructor(private articleService: ArticleService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[]> {
    return this.articleService.getArticles()
  }

}

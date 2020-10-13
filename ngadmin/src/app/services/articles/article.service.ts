import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article';
import { API_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(API_URL + '/api/get/articles')
  }

  getArticle(id: number): Observable<Article> {
    return this.httpClient.get<Article>(API_URL + '/api/get/article/' + id)
  }

  updateArticle(data: Article, id: number): Promise<any> {
    return this.httpClient.post(API_URL + '/api/update/article', { data, id }).toPromise()
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { RedirectIfNotauthGuard } from 'src/app/guards/redirect-if-notauth.guard';
import { ArticleResolveService } from 'src/app/services/articles/article-resolve.service';

const routes: Routes = [
  { path: 'panel/articles', component: ArticlesComponent, canActivate: [RedirectIfNotauthGuard], resolve: { articles: ArticleResolveService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from "./auth/user.service";
import { NavService } from './auth/nav.service';
import { InvestService } from './invests/invest.service';
import { InvestsResolveService } from './invests/invests-resolve.service';
import { InvestResolveService } from './invests/invest-resolve.service';
import { ArticleService } from './articles/article.service';
import { ArticleResolveService } from './articles/article-resolve.service';
import { PointService } from './points/point.service';
import { PointsResolveService } from './points/points-resolve.service';
import { SlideService } from './slides/slide.service';
import { SlidesResolveService } from './slides/slides-resolve.service';
import { ContactService } from './contacts/contact.service';
import { ContactsResolveService } from './contacts/contacts-resolve.service';
import { RefreshContactsService } from './refresh-contacts.service';
import { MapFreePointService } from './map-free-point.service';
import { MapFreeCloudService } from './map-free-cloud.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
  ],
  declarations: [],
  providers: [
    UserService,
    NavService,
    InvestService,
    InvestsResolveService,
    InvestResolveService,
    ArticleService,
    ArticleResolveService,
    PointService,
    PointsResolveService,
    SlideService,
    SlidesResolveService,
    ContactService,
    ContactsResolveService,
    RefreshContactsService,
    MapFreePointService,
    MapFreeCloudService
  ]
})
export class ServicesModule { }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invest } from 'src/app/models/invest';
import { API_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class InvestService {

  constructor(private httpClient: HttpClient) { }

  getInvests(): Observable<Invest[]> {
    return this.httpClient.get<Invest[]>(API_URL + '/api/get/invests')
  }

  getInvest(id: number): Observable<Invest> {
    return this.httpClient.get<Invest>(API_URL + '/api/get/invest/' + id)
  }

  makeEmptyInvest(): Invest {
    return {
      headerImage: null,
      map: null,
      siteLink: null,
      movie: null,
      gallery: null,
      plans: null,
      contacts: null,
      rentiersContacts: null,
      managementContacts: null,
      zone: null,
      mainName: '',
      projectName: '',
      slug: '',
      address: '',
      city: '',
      areaSize: '',
      parkingAreaSize: '',
      rentiers: '',
      textLeft: '',
      textRight: '',
      horizontImage: '',
      logo: '',
      lat: '',
      lng: '',
      openDate: '',
      remodeling: '',
      buyDate: '',
      status: "plan-invest",
      ordering: null,
      isShow: false,
      metaKeywords: '',
      metaDescription: ''
    }
  }

  createInvest(data: any, invest: Invest, headerCroppedImage: string, horizontCroppedImage: string, mapCroppedImage: { image: string, imageBig: string }): Promise<any> {
    return this.httpClient.post(API_URL + '/api/create/invest', { data, invest, headerCroppedImage, horizontCroppedImage, mapCroppedImage }).toPromise()
  }

  updateInvest(data: any, invest: Invest, headerCroppedImage: string, horizontCroppedImage: string, mapCroppedImage: { image: string, imageBig: string }): Promise<any> {
    return this.httpClient.post(API_URL + '/api/update/invest', { data, invest, headerCroppedImage, horizontCroppedImage, mapCroppedImage }).toPromise()
  }

  changeInvestOrder(invests: Invest[]): Observable<Invest[]> {
    return this.httpClient.post<Invest[]>(API_URL + '/api/change/invest/sort', { invests })
  }

  updateField(value: any, field: string, id: number): Observable<Invest[]> {
    return this.httpClient.post<Invest[]>(API_URL + '/api/update/invest/field', { value, field, id })
  }

  removeInvest(invest: Invest): Observable<Invest[]> {
    return this.httpClient.delete<Invest[]>(API_URL + '/api/invest/delete/' + invest.id)
  }

}

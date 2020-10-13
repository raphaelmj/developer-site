import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Slide } from 'src/app/models/slide';
import { API_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor(private httpClient: HttpClient) { }

  getSlides(): Observable<Slide[]> {
    return this.httpClient.get<Slide[]>(API_URL + '/api/get/slides')
  }

  updateSlideImage(croppedImage: string, id: number): Observable<Slide> {
    return this.httpClient.post<Slide>(API_URL + '/api/update/slide', { slideImage: croppedImage, id })
  }

  updateField(value: any, field: string, id: number): Observable<Slide> {
    return this.httpClient.post<Slide>(API_URL + '/api/update/slide/field', { value, field, id })
  }

  updateOrder(slides: Slide[]): Observable<Slide[]> {
    return this.httpClient.post<Slide[]>(API_URL + '/api/update/slides/order', { slides })
  }

  createEmptySlide(): Slide {
    return {
      image: null,
      status: false,
      ordering: null
    }
  }

  addSlide(slide: Slide, croppedImage: string): Observable<Slide> {
    return this.httpClient.post<Slide>(API_URL + '/api/add/slide', { slide, slideImage: croppedImage })
  }

  removeSlide(id: number): Promise<any> {
    return this.httpClient.delete(API_URL + '/api/remove/slide/' + id).toPromise()
  }

}

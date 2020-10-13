import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Point } from 'src/app/models/point';
import { API_URL } from 'src/app/config';
import { PointChild } from '../../models/point';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private httpClient: HttpClient) { }

  getPoints(): Observable<Point[]> {
    return this.httpClient.get<Point[]>(API_URL + '/api/get/points')
  }

  getPoint(id: number): Observable<Point> {
    return this.httpClient.get<Point>(API_URL + '/api/get/point/' + id)
  }

  updatePoint(point: Point): Promise<Point[]> {
    return this.httpClient.post<Point[]>(API_URL + '/api/update/point', point).toPromise()
  }

  createPoint(point: Point): Promise<Point[]> {
    return this.httpClient.post<Point[]>(API_URL + '/api/create/point', point).toPromise()
  }

  deletePoint(id: number): Promise<any> {
    return this.httpClient.delete(API_URL + '/api/remove/point/' + id).toPromise()
  }

  createEmptyPoint(): Point {
    return {
      name: '',
      left: '',
      top: '',
      cityLeft: '',
      cityTop: '',
      status: 'plan-invest',
      type: 'collection',
      size: 'small',
      child: null,
      childs: [],
      isShow: true,
      ordering: null
    }
  }

  createEmptyCloud(): PointChild {
    return {
      name: '',
      address: '',
      status: 'plan-invest',
      cloudLeft: '0%',
      cloudTopBottom: '0%',
      openTo: 'top',
      url: '',
      investId: null,
      isShow: false
    }
  }

}

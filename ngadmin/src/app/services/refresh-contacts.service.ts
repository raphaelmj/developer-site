import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshContactsService {

  action$: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor() { }

  updateContactsAction() {
    this.action$.next(true)
  }

}

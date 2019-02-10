import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class LoadingService {

  /**
     * @description spinners BehaviorSubject
     */
  public spinnerSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  /**
   * Creates an instance of spinner
   */
  constructor() {
  }

  /**
   * To show spinner
   */
  show() {
    this.spinnerSubject.next(true);
  }

  /**
   * To hide spinner
   */
  hide() {
    this.spinnerSubject.next(false);
  }

  getMessage(): Observable<any> {
    return this.spinnerSubject.asObservable();
  }

}

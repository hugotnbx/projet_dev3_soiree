import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonStateService {
  private _isButtonDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isButtonDisabled$: Observable<boolean> = this._isButtonDisabled.asObservable();

  constructor() {}

  disableButton() {
    this._isButtonDisabled.next(true);
  }

  enableButton() {
    this._isButtonDisabled.next(false);
  }
}

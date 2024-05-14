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

  private _disabledEvents: Set<number> = new Set<number>();

  disableButtonForEvent(eventId: number) {
      this._disabledEvents.add(eventId);
      this.updateButtonState();
  }

  enableButtonForEvent(eventId: number) {
      this._disabledEvents.delete(eventId);
      this.updateButtonState();
  }

  private updateButtonState() {
      const isButtonDisabled = this._disabledEvents.size > 0;
      this._isButtonDisabled.next(isButtonDisabled);
  }

}

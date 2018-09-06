import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-alert',
  templateUrl: 'my-alert.html'
})
export class MyAlertComponent {
  private _isAlert = null;
  private myAlertID = 'my-alert';
  @Input()
  set id(id: string) {
    if(id) {
      this.myAlertID = `my-alert#${id}`;
    }
  }
  @Input()
  set isAlert(isAlert: boolean) {
    this._isAlert = isAlert;
    this.initOverlay();
  }
  @Input() snTitle: any;
  @Input() serialNumber: any;

  @Output() alterConfirm = new EventEmitter();
  @Output() alterCancel = new EventEmitter();
  @Output() getStartTime = new EventEmitter();
  @Output() getEndTime = new EventEmitter();

  constructor() {
    console.log('Hello MyAlertComponent Component');
  }

  initOverlay() {
    const overlay = document.querySelector(this.myAlertID)
    if(this._isAlert) {
      overlay.parentElement.style.overflow = 'hidden';
    } else {
      overlay.parentElement.style.overflow = 'auto';
    }
  }

  myGetStartTime(index) {
    this.getStartTime.emit(index);
  }

  myGetEndTime(index) {
    this.getEndTime.emit(index);
  }

  myAlterConfirm() {
    this.alterConfirm.emit();
  }

  myAlterCancel() {
    this.alterCancel.emit();
  }

}

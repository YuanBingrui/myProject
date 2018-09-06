import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-modal',
  templateUrl: 'my-modal.html'
})
export class MyModalComponent {
  private _isModal = null;
  private _beginTemperature = {CJID: '', CWSJ: '', WD: ''};
  private cwq = '';
  private myModalID = 'my-modal';
  private isDisabled = true;
  private isManualInput = null;
  @Input()
  set id(id: string) {
    if(id) {
      this.myModalID = `my-modal#${id}`;
    }
  }
  @Input()
  set beginTemperature(beginTemperature: any) {
    this._beginTemperature = beginTemperature;
  }
  @Input() modalTitle: any;
  @Input() temperatureMeasuringGun: any;
  @Input()
  set isModal(isModal: boolean) {
    this._isModal = isModal;
    this.initOverlay();
  }
  @Output() modalConfirm = new EventEmitter();
  @Output() modalCancel = new EventEmitter();
  @Output() getTemperature = new EventEmitter();

  constructor() {
    console.log('Hello MyModalComponent Component');
  }

  initOverlay() {
    const overlay = document.querySelector(this.myModalID)
    if(this._isModal) {
      overlay.parentElement.style.overflow = 'hidden';
    } else {
      overlay.parentElement.style.overflow = 'auto';
    }
  }

  getSpecTemperature(tempGunID) {
    this.isManualInput = 'Z'
    this.cwq = tempGunID
    this.getTemperature.emit(tempGunID);
  }

  myModalConfirm(beginTemperature) {
    this.modalConfirm.emit(Object.assign(beginTemperature, { CJFS: this.isManualInput, CWQ: this.cwq }));
  }

  myModalCancel() {
    this.modalCancel.emit();
  }

  manualInput() {
    this._beginTemperature = { CJID: '', CWSJ: '', WD: ''}
    this.isManualInput = 'S'
    this.cwq = ''
    this.isDisabled = false
  }

}

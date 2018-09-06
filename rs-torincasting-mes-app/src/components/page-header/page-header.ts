import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: 'page-header.html'
})
export class PageHeaderComponent {

  @Input() headerInfo: any;
  @Output() dateChange = new EventEmitter();

  constructor() {
    console.log('Hello PageHeaderComponent Component');
  }

  dateTimeChange(presentDate) {
    this.dateChange.emit(presentDate);
  }

}

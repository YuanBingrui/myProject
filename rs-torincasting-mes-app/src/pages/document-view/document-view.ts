import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-document-view',
  templateUrl: 'document-view.html',
})
export class DocumentViewPage {
  documentName: string;
  pdfSrc: string;
  zoomValue: number = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.documentName = this.navParams.data.pageTitle;
    this.pdfSrc = this.navParams.data.newUrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentViewPage');
  }

  adjustVisibleArea(zoomType) {
    switch(zoomType){
      case 'zoom-in':
        if(this.zoomValue <= 3) {
          this.zoomValue += 0.2;
        }
      break;
      case 'zoom-out':
        if(this.zoomValue >= 0.4) {
          this.zoomValue -= 0.2;
        }
      break;
      case 'refresh':
        this.zoomValue = 1;
      break;
    }
  }

}

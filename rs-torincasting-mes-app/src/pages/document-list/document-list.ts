import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// import { InAppBrowser } from '@ionic-native/in-app-browser';

import { DocumentViewPage } from '../document-view/document-view';

import { TipstoolProvider } from '../../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
import { DocumnetServiceProvider } from '../../providers/documnet-service/documnet-service';

@Component({
  selector: 'page-document-list',
  templateUrl: 'document-list.html',
})
export class DocumentListPage {
  pageTitle: string;
  wlid: string;
  mkid: string;
  lx: string;
  tableTitle: any = [
    {id: 'XH', name: '序号'},
    {id: 'WDXX_MC', name: '文件名称'},
    {id: 'CZ', name: '操作'}];
  documentList: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tipsTool: TipstoolProvider,
    public storage: Storage,
    public documnetService: DocumnetServiceProvider,
    public utilService: UtilServiceProvider
    // public iab: InAppBrowser
  ) {
    this.wlid = this.navParams.data.wlid
    this.mkid = this.navParams.data.mkid
    this.lx = this.navParams.data.lx
    this.pageTitle = this.lx === 'BZS' ? '标准书' : '指导书'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentListPage');
    this.getZybzsDocumentList()
  }

  getZybzsDocumentList() {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.documnetService.getDocList(userid, this.lx, this.mkid, this.wlid).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          if(this.utilService.rowsDataTrimValueProperty(response.body.rows).length === 0){
            this.tipsTool.presentAlertButtonYes('暂无数据！！');
          }
          this.initRawData(this.utilService.rowsDataTrimValueProperty(response.body.rows));
        }else{
          this.tipsTool.presentAlertButtonYes('请求出现问题，请稍后重试！');
        }
      }).catch(err => {
        this.tipsTool.dismissLoading(loading);
        this.tipsTool.presentAlertButtonYes(err);
      });
    }).catch(err => {
      this.tipsTool.dismissLoading(loading);
      this.tipsTool.presentAlertButtonYes(err);
    });
  }

  initRawData(rawData) {
    rawData.forEach((currentValue, index) => {
      currentValue = Object.assign(currentValue, { XH: index + 1, CZ: '下载' })
    })
    this.documentList = JSON.parse(JSON.stringify(rawData))
  }

  downloadDoc(documentItem) {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.documnetService.downloadDoc(userid, documentItem.WDXX_MLID, documentItem.WDXX_FJZ, documentItem.WDID, documentItem.WDXX_MC, documentItem.WDXX_BB).then(response => {
        this.tipsTool.dismissLoading(loading);
        let linkUrl = response.host + '/download_file/' + response.path;
        let newUrl = linkUrl.replace(/\\/g,"/");
        this.navToDocumentView(newUrl)
        // this.iab.create(encodeURI(newUrl), '_self', 'location=yes');
      }).catch(err => {
        this.tipsTool.dismissLoading(loading);
        this.tipsTool.presentAlertButtonYes(err);
      });
    }).catch(err => {
      this.tipsTool.dismissLoading(loading);
      this.tipsTool.presentAlertButtonYes(err);
    });
  }

  navToDocumentView(newUrl) {
    let isPdf = /.+\.pdf$/.test(newUrl)
    if(isPdf) {
      this.navCtrl.push(DocumentViewPage, { pageTitle: this.pageTitle, newUrl: newUrl })
    } else {
      this.tipsTool.presentAlertButtonYes('只支持查看PDF格式的文档');
    }
  }

}

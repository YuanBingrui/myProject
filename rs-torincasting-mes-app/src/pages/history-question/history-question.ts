import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { CastingServiceProvider } from '../../providers/casting-service/casting-service';
import { TipstoolProvider } from '../../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@Component({
  selector: 'page-history-question',
  templateUrl: 'history-question.html',
})
export class HistoryQuestionPage {
  wlid: string;
  tableTitle: any = [
    {id: 'XH', name: '序号'},
    {id: 'YYMS', name: '不合格原因'},
    {id: 'BZ', name: '备注'},
    {id: 'CS', name: '出现次数'}];
  historyQuestionList: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tipsTool: TipstoolProvider,
    public storage: Storage,
    public castingService: CastingServiceProvider,
    public utilService: UtilServiceProvider
  ) {
    this.wlid = this.navParams.data.wlid
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryQuestionPage');
    this.getHistoryQuestion()
  }

  getHistoryQuestion() {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.castingService.inquireHistoryQuestion(userid, this.wlid).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          if(this.utilService.rowsDataTrimValueProperty(response.body.rows).length === 0){
            this.tipsTool.presentAlertButtonYes('暂无数据！！');
          }
          this.sortRawData(this.utilService.rowsDataTrimValueProperty(response.body.rows));
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

  sortRawData(rawData) {
    rawData.forEach((currentValue, index) => {
      currentValue = Object.assign(currentValue, { XH: index + 1 })
    })
    rawData.sort(function (a, b) {
      return (parseInt(b.CS) - parseInt(a.CS))
    });
    this.historyQuestionList = JSON.parse(JSON.stringify(rawData))

  }

}

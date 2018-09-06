import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { OpenBoxServiceProvider } from '../../providers/open-box-service/open-box-service';
import { TipstoolProvider } from '../../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@Component({
  selector: 'page-open-box-home',
  templateUrl: 'open-box-home.html',
})
export class OpenBoxHomePage {
  headerInfo: any  = {
    bz: '',
    czr: '',
    noticeInfo: [
      {id: 1, content: '滚动信息01'},
      {id: 1, content: '滚动信息02'},
      {id: 1, content: '滚动信息03'},
      {id: 1, content: '滚动信息04'}],
    planDate: moment().format('YYYY-MM-DD')
  };
  tableTitle: any = [
    {id: 'XH', name: '序号'},
    {id: 'BCBH', name: '包次编号'},
    {id: 'CPBH', name: '产品编号'},
    {id: 'CPMC', name: '产品名称'},
    {id: 'CPSL', name: '产品数量'},
    {id: 'YJKXSJ', name: '预计开箱时间'},
    {id: 'KXYQ', name: '开箱时间要求'},
    {id: 'SJKXSJ', name: '开箱时间'}];
  openBoxData: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tipsTool: TipstoolProvider,
    public storage: Storage,
    public openBoxService: OpenBoxServiceProvider,
    public utilService: UtilServiceProvider
  ) {
    this.headerInfo.bz = this.utilService.userInfo.userTeam
    this.headerInfo.czr = this.utilService.userInfo.userName
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenBoxHomePage');
    this.getOpenBoxPlans();
  }

  getOpenBoxPlans() {
    this.openBoxData = [];
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.openBoxService.getOpenBoxPlans(userid, this.headerInfo.planDate).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          if(this.utilService.rowsDataTrimValueProperty(response.body.rows).length === 0){
            this.tipsTool.presentAlertButtonYes('暂无数据！！');
          }
          this.formatOpenBoxData(this.utilService.rowsDataTrimValueProperty(response.body.rows));
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

  formatOpenBoxData(openBoxIintData) {
    this.openBoxData = openBoxIintData.map((currentValue) => {
      currentValue['SJKXSJ'] = moment(currentValue['SJKXSJ']).isSame('1899-12-30') ? '开始' : replaceBlack(currentValue['SJKXSJ'])
      return Object.assign(currentValue, { isFk: !(currentValue['SJKXSJ'] === '开始')})
    })

    function replaceBlack(sjkxsj) {
      return sjkxsj.replace(/\s+/, '<br/>')
    }
  }

  getOpenBoxTime(index) {
    if(this.openBoxData[index].SJKXSJ !== '开始') {
      this.tipsTool.presentAlertButtonYes('该条计划已反馈')
    } else {
      this.openBoxData[index].SJKXSJ = moment().format('YYYY-MM-DD') + '<br/>' + moment().format('HH:mm:ss')
      this.OpenBoxFeedback(this.openBoxData[index]);
    }
  }

  OpenBoxFeedback(openBoxDataone) {
    let loading = this.tipsTool.presentLoadingDefault('反馈中，请稍后');
    this.storage.get('userid').then(userid => {
      this.openBoxService.OpenBoxFeedback(userid, openBoxDataone.KXJHID, replaceBr(openBoxDataone.SJKXSJ)).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.getOpenBoxPlans();
          this.tipsTool.presentAlertButtonYes(response.desc);
        }else{
          this.tipsTool.presentAlertButtonYes(response.desc);
        }
      }).catch(err => {
        this.tipsTool.dismissLoading(loading);
        this.tipsTool.presentAlertButtonYes(err);
      });
    }).catch(err => {
      this.tipsTool.dismissLoading(loading);
      this.tipsTool.presentAlertButtonYes(err);
    });

    function replaceBr(sjkxsj) {
      return sjkxsj.replace(/<br\/>/, ' ')
    }
  }

  planDateFilter(event) {
    this.getOpenBoxPlans();
  }

}

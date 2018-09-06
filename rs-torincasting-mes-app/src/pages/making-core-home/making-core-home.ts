import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { MakingCoreServiceProvider } from '../../providers/making-core-service/making-core-service';
import { TipstoolProvider } from '../../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

import { MakingCoreExaminePage } from '../making-core-examine/making-core-examine';
import { MakeCoreFxPage } from '../make-core-fx/make-core-fx';

@Component({
  selector: 'page-making-core-home',
  templateUrl: 'making-core-home.html',
})
export class MakingCoreHomePage {
  headerInfo: any  = {
    bz: '',
    czr: '',
    noticeInfo: [
      {id: 1, content: '滚动信息1'},
      {id: 1, content: '滚动信息2'},
      {id: 1, content: '滚动信息3'},
      {id: 1, content: '滚动信息4'}],
    planDate: moment().format('YYYY-MM-DD')
  };
  teamLabel: string;
  teamLabelList: any = [];
  tableTitle: any = [
    {id: 'XH', name: '序号'},
    {id: 'CPBM', name: '产品编号'},
    {id: 'CPMC', name: '产品名称'},
    {id: 'SXBH', name: '砂芯编号'},
    {id: 'SXMC', name: '砂芯名称'},
    {id: 'JYJG', name: '检验结果'},
    {id: 'CL', name: '处理'},
    {id: 'JY', name: '检验'}];
  makingCoreData: any = [];
  loading: any;
  clStatus: any = { Y: '已处理' };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tipsTool: TipstoolProvider,
    public storage: Storage,
    public makingCoreService: MakingCoreServiceProvider,
    public utilService: UtilServiceProvider
  ) {
    this.headerInfo.bz = this.utilService.userInfo.userTeam
    this.headerInfo.czr = this.utilService.userInfo.userName
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter MakingCoreHomePage');
    this.inquireMakingCoreGW();
  }

  inquireMakingCoreGW() {
    this.loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.makingCoreService.inquireMakingCoreGW(userid).then(response => {
        if (response && 0 === response.errcode) {
          this.teamLabelList = this.utilService.rowsDataTrimValueProperty(response.body.rows);
          if(this.teamLabelList.length !== 0) {
            this.teamLabel = this.teamLabelList[0].GWID
            this.inquireMakingCorePlan(this.teamLabel)
          }
        } else {
          this.loading && this.tipsTool.dismissLoading(this.loading);
          this.tipsTool.presentAlertButtonYes('请求出现问题，请稍后重试！');
        }
      }).catch(err => {
        this.loading && this.tipsTool.dismissLoading(this.loading);
        this.tipsTool.presentAlertButtonYes(err);
      });
    }).catch(err => {
      this.loading && this.tipsTool.dismissLoading(this.loading);
      this.tipsTool.presentAlertButtonYes(err);
    });
  }

  inquireMakingCorePlan(gwid) {
    this.storage.get('userid').then(userid => {
      this.makingCoreService.inquireMakingCorePlan(userid, gwid, this.headerInfo.planDate).then(response => {
        this.loading && this.tipsTool.dismissLoading(this.loading);
        if (response && 0 === response.errcode) {
          if(this.utilService.rowsDataTrimValueProperty(response.body.rows).length === 0){
            this.tipsTool.presentAlertButtonYes('暂无数据！！');
          }
          this.handleRawData(this.utilService.rowsDataTrimValueProperty(response.body.rows));
        }else{
          this.tipsTool.presentAlertButtonYes('请求出现问题，请稍后重试！');
        }
      }).catch(err => {
        this.loading && this.tipsTool.dismissLoading(this.loading);
        this.tipsTool.presentAlertButtonYes(err);
      });
    }).catch(err => {
      this.loading && this.tipsTool.dismissLoading(this.loading);
      this.tipsTool.presentAlertButtonYes(err);
    });
  }

  handleRawData(makingCoreRawData) {
    this.makingCoreData = makingCoreRawData.map((currentValue, currentIndex) => {
      return Object.assign(currentValue, { XH: currentIndex + 1, JY: '检验' })
    })
  }

  changeTeamLabel() {
    this.inquireMakingCorePlan(this.teamLabel)
  }

  planDateFilter(event) {
    this.inquireMakingCorePlan(this.teamLabel)
  }

  goToExaminePage(selectedmakingCoreData) {
    this.navCtrl.push(MakingCoreExaminePage, { selectedmakingCoreData: selectedmakingCoreData })
  }

  makeCoreFX(itemSliding, selectedmakingCoreData, type) {
    itemSliding.close();
    if(type !== 'N') {
      this.navCtrl.push(MakeCoreFxPage, { selectedmakingCoreData: selectedmakingCoreData, type: type});
    } else {
      this.cancelFX(selectedmakingCoreData)
    }
  }

  cancelFX(selectedmakingCoreData) {
    this.storage.get('userid').then(userid => {
      this.makingCoreService.submitFx(userid, selectedmakingCoreData.ZYJHID, selectedmakingCoreData.MXXH, 'N', '').then(response => {
        if (response && 0 === response.errcode) {
          this.tipsTool.presentAlertButtonYes('取消放行成功！');
          this.inquireMakingCoreGW();
        }else{
          this.tipsTool.presentAlertButtonYes('请求出现问题，请稍后重试！');
        }
      }).catch(err => {
        this.tipsTool.presentAlertButtonYes(err);
      });
    }).catch(err => {
      this.tipsTool.presentAlertButtonYes(err);
    });
  }

}

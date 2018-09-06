import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { ModelingServiceProvider } from '../../providers/modeling-service/modeling-service';
import { TipstoolProvider } from '../../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

import { ModelingExaminePage } from '../modeling-examine/modeling-examine';
import { ModelingFxPage } from '../modeling-fx/modeling-fx';

@Component({
  selector: 'page-modeling-home',
  templateUrl: 'modeling-home.html',
})
export class ModelingHomePage {
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
    {id: 'TH', name: '图号'},
    {id: 'JYJG', name: '检验结果'},
    {id: 'CL', name: '处理'},
    {id: 'JY', name: '检验'}];
  modelingData: any = [];
  loading: any;
  clStatus: any = { Y: '已处理' };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tipsTool: TipstoolProvider,
    public storage: Storage,
    public modelingService: ModelingServiceProvider,
    public utilService: UtilServiceProvider
  ) {
    this.headerInfo.bz = this.utilService.userInfo.userTeam
    this.headerInfo.czr = this.utilService.userInfo.userName
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter ModelingHomePage');
    this.inquireModelingGW();
  }

  inquireModelingGW() {
    this.loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.modelingService.inquireModelingGW(userid).then(response => {
        if (response && 0 === response.errcode) {
          this.teamLabelList = this.utilService.rowsDataTrimValueProperty(response.body.rows);
          if(this.teamLabelList.length !== 0) {
            this.teamLabel = this.teamLabelList[0].GWID
            this.inquireModelingPlan(this.teamLabel)
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

  inquireModelingPlan(gwid) {
    this.storage.get('userid').then(userid => {
      this.modelingService.inquireModelingPlan(userid, gwid, this.headerInfo.planDate).then(response => {
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

  handleRawData(modelingRawData) {
    this.modelingData = modelingRawData.map((currentValue, currentIndex) => {
      return Object.assign(currentValue, { XH: currentIndex + 1, JY: '检验' })
    })
  }

  changeTeamLabel() {
    this.loading = this.tipsTool.presentLoadingDefault('');
    this.inquireModelingPlan(this.teamLabel)
  }

  planDateFilter(event) {
    this.loading = this.tipsTool.presentLoadingDefault('');
    this.inquireModelingPlan(this.teamLabel)
  }

  goToExaminePage(selectedModelingData) {
    this.navCtrl.push(ModelingExaminePage, { selectedModelingData: selectedModelingData })
  }

  modelingFX(itemSliding, selectedModelingData, type) {
    itemSliding.close();
    if(type !== 'N') {
      this.navCtrl.push(ModelingFxPage, { selectedModelingData: selectedModelingData, type: type});
    } else {
      this.cancelFX(selectedModelingData)
    }
  }

  cancelFX(selectedModelingData) {
    this.storage.get('userid').then(userid => {
      this.modelingService.submitFx(userid, selectedModelingData.GPID, 'N', '').then(response => {
        if (response && 0 === response.errcode) {
          this.tipsTool.presentAlertButtonYes('取消放行成功！');
          this.inquireModelingGW();
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


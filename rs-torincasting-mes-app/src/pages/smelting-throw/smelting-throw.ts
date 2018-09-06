import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SmeltingServiceProvider } from '../../providers/smelting-service/smelting-service';
import { TipstoolProvider } from '../../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@Component({
  selector: 'page-smelting-throw',
  templateUrl: 'smelting-throw.html',
})
export class SmeltingThrowPage {
  tlInfo: any;
  tlmxList: any;
  tableTitle: any = [
    {id: 'XH', name: '序号'},
    {id: 'PH', name: '计划'},
    {id: 'SJ', name: '时间'},
    {id: 'SL', name: '数量'},
    {id: 'XZ', name: '选择'}];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tipsTool: TipstoolProvider,
    public storage: Storage,
    public smeltingService: SmeltingServiceProvider,
    public utilService: UtilServiceProvider,
    public viewCtrl: ViewController
  ) {
    this.tlInfo = this.navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SmeltingThrowPage');
    this.getTlmxInfo();
  }

  getTlmxInfo() {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.smeltingService.getTlmx(userid, this.tlInfo.lcbh, this.tlInfo.wlid).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.tlmxList = this.utilService.rowsDataTrimValueProperty(response.body.rows);
          this.handleRawTlmx();
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

  handleRawTlmx() {
    this.tlmxList.forEach((currentValue, index) => {
      Object.assign(currentValue, { XH: index + 1, XZ: false})
    })
  }

  deleteTlmx(selectedFkids) {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.smeltingService.deleteTlmx(userid, selectedFkids).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.viewCtrl.dismiss('done');
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

  dismissApply() {
    this.viewCtrl.dismiss('cancel');
  }

  confirmApply() {
    let selectedFkid = [];
    this.tlmxList.forEach((currentValue, index) => {
      currentValue.XZ && selectedFkid.push(currentValue.FKID)
    })
    this.deleteTlmx(selectedFkid.toString())
  }

}

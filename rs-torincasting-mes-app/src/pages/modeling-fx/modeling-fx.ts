import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ModelingServiceProvider } from '../../providers/modeling-service/modeling-service';
import { TipstoolProvider } from '../../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@Component({
  selector: 'page-modeling-fx',
  templateUrl: 'modeling-fx.html',
})
export class ModelingFxPage {
  selectedModelingData: any;
  type: any;
  userTeam: any;
  labelList: any = [
    {id: 'CPBM', name: '产品编码'},
    {id: 'CPMC', name: '产品名称'},
    {id: 'TH', name: '图号'}
  ];
  FXidea: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public tipsTool: TipstoolProvider,
    public storage: Storage,
    public modelingService: ModelingServiceProvider,
    public utilService: UtilServiceProvider,
    public alertCtrl: AlertController
  ) {
    this.selectedModelingData = this.navParams.data.selectedModelingData
    this.type = this.navParams.data.type
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModelingFxPage');
    this.userTeam = this.utilService.userInfo.userTeam
    this.type === 'V' && this.viewFx()
  }

  viewFx() {
    this.storage.get('userid').then(userid => {
      this.modelingService.viewFx(userid, this.selectedModelingData.GPID).then(response => {
        if (response && 0 === response.errcode) {
          this.FXidea = this.utilService.rowsDataTrimValueProperty(response.body.rows)[0].FXYJ
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

  submitFx() {
    let that = this
    this.storage.get('userid').then(userid => {
      this.modelingService.submitFx(userid, this.selectedModelingData.GPID, 'Y', this.FXidea).then(response => {
        if (response && 0 === response.errcode) {
          const alert = that.alertCtrl.create({
            subTitle: '放行成功！',
            buttons: [
              {
                text: '确定',
                handler: data => {
                  that.viewCtrl.dismiss('confirm');
                }
              }
            ]
          });
          alert.present();
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

  dismissApply() {
    this.viewCtrl.dismiss('cancel');
  }

  confirmApply() {
    this.submitFx()
  }

}

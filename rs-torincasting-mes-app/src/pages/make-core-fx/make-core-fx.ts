import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MakingCoreServiceProvider } from '../../providers/making-core-service/making-core-service';
import { TipstoolProvider } from '../../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@Component({
  selector: 'page-make-core-fx',
  templateUrl: 'make-core-fx.html',
})
export class MakeCoreFxPage {
  selectedMakingCoreData: any;
  type: any;
  userTeam: any;
  labelList: any = [
    {id: 'CPBM', name: '产品编码'},
    {id: 'CPMC', name: '产品名称'}
  ];
  FXidea: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public tipsTool: TipstoolProvider,
    public storage: Storage,
    public makingCoreService: MakingCoreServiceProvider,
    public utilService: UtilServiceProvider,
    public alertCtrl: AlertController
  ) {
    this.selectedMakingCoreData = this.navParams.data.selectedmakingCoreData
    this.type = this.navParams.data.type
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeCoreFxPage');
    this.userTeam = this.utilService.userInfo.userTeam
    this.type === 'V' && this.viewFx()
  }

  viewFx() {
    this.storage.get('userid').then(userid => {
      this.makingCoreService.viewFx(userid, this.selectedMakingCoreData.ZYJHID, this.selectedMakingCoreData.MXXH).then(response => {
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
      this.makingCoreService.submitFx(userid, this.selectedMakingCoreData.ZYJHID, this.selectedMakingCoreData.MXXH, 'Y', this.FXidea).then(response => {
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

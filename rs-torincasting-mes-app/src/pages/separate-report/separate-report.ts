import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CastingServiceProvider } from '../../providers/casting-service/casting-service';
import { TipstoolProvider } from '../../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@Component({
  selector: 'page-separate-report',
  templateUrl: 'separate-report.html',
})
export class SeparateReportPage {
  castingDataone: any;
  lx: string;
  tableTitle: any = [
    {id: 'XH', name: '序号'},
    {id: 'TSZL', name: '铁水重量(㎏)'},
    {id: 'BCBH', name: '包次编号'},
    {id: 'JZPH', name: '浇铸牌号'},
    {id: 'CPBM', name: '产品编号'},
    {id: 'SL', name: '数量'},
    {id: 'XLH', name: '序列号'},
    {id: 'PH', name: '批号'},
    {id: 'XZ', name: '选择'},
    {id: 'GLYY', name: '隔离原因'},
    {id: 'BZ', name: '备注'},
    {id: 'CZ', name: '操作'}];
  separateReportData: any = [];
  tempSeparateReportData: any;
  glyyArr: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public tipsTool: TipstoolProvider,
    public storage: Storage,
    public castingService: CastingServiceProvider,
    public utilService: UtilServiceProvider
  ) {
    this.castingDataone = this.navParams.data.castingDataone;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeparateReportPage');
    if(this.castingDataone.DJGL === 'Y'){
      this.lx = this.castingDataone.DJGL
      this.getXlhGl()
    } else {
      this.lx = this.castingDataone.DJGL
      this.getUnXlhGl();
    }
  }

  getUnXlhGl() {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.castingService.getUnXlhGl(userid, this.castingDataone.JZJHID).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.separateReportData = this.utilService.rowsDataTrimValueProperty(response.body.rows);
          this.getGlyy();
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

  getXlhGl() {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.castingService.getXlhGl(userid, this.castingDataone.JZJHID).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.separateReportData = this.utilService.rowsDataTrimValueProperty(response.body.rows);
          this.getGlyy();
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

  getGlyy() {
    this.storage.get('userid').then(userid => {
      this.castingService.getGlyy(userid).then(response => {
        if (response && 0 === response.errcode) {
          this.glyyArr = this.utilService.rowsDataTrimValueProperty(response.body.rows)
          this.handleData();
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

  handleData() {
    this.separateReportData.forEach((currentValue, index) => {
      Object.keys(currentValue).forEach((key) => {
        key === 'GLYY' && (currentValue[key] = { value: currentValue[key] && currentValue[key].split(','), options: this.glyyArr })
        key === 'SL' && (currentValue[key] = this.generateOptions(this.castingDataone.JHSL.value))
        this.lx === 'Y' && (key === 'XZ' && (currentValue[key] = currentValue[key] === 'Y' ? true : false))
      })
      this.lx === 'N' && (currentValue = Object.assign(currentValue, {CZ: '删除'}))
    })
    this.lx === 'N' && (this.tempSeparateReportData = JSON.parse(JSON.stringify(this.separateReportData[0])))
  }

  generateOptions(sl) {
    let options = []
    for (let i = sl; i >= 1; i--) {
      options.push(i)
    }
    return {value: sl, options: options}
  }

  updateJzXlhGl(columns) {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.castingService.updateJzXlhGl(userid, this.castingDataone.JZJHID, columns).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          console.log(response)
        }else{
          this.tipsTool.presentAlertButtonYes('请求出现问题，请稍后重试！');
        }
        this.viewCtrl.dismiss('confirm');
      }).catch(err => {
        this.tipsTool.dismissLoading(loading);
        this.tipsTool.presentAlertButtonYes(err);
        this.viewCtrl.dismiss('confirm');
      });
    }).catch(err => {
      this.tipsTool.dismissLoading(loading);
      this.tipsTool.presentAlertButtonYes(err);
      this.viewCtrl.dismiss('confirm');
    });
  }

  updateJzUnXlhGl(columns) {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.castingService.updateJzUnXlhGl(userid, this.castingDataone.JZJHID, columns).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          console.log(response)
        }else{
          this.tipsTool.presentAlertButtonYes('请求出现问题，请稍后重试！');
        }
        this.viewCtrl.dismiss('confirm');
      }).catch(err => {
        this.tipsTool.dismissLoading(loading);
        this.tipsTool.presentAlertButtonYes(err);
        this.viewCtrl.dismiss('confirm');
      });
    }).catch(err => {
      this.tipsTool.dismissLoading(loading);
      this.tipsTool.presentAlertButtonYes(err);
      this.viewCtrl.dismiss('confirm');
    });
  }

  dismissApply() {
    this.viewCtrl.dismiss('cancel');
  }

  confirmApply() {
    let floorInfoArr = []
    let tempObj = {}
    this.separateReportData.forEach((currentValue, index) => {
      tempObj = {
        xh: currentValue.XH,
        glyy: currentValue.GLYY.value.toString(),
        bz: currentValue.BZ
      }
      if(this.lx === 'Y') {
        floorInfoArr.push(Object.assign(tempObj, { xlh: currentValue.XLH, gl: currentValue.XZ ? 'Y' : 'N' }));
      } else {
        floorInfoArr.push(Object.assign(tempObj, { ph: currentValue.PH, glsl: currentValue.SL.value }));
      }
    })
    this.lx === 'Y' && this.updateJzXlhGl({nf: this.separateReportData.length, floorInfoArr: floorInfoArr})
    this.lx === 'N' && this.updateJzUnXlhGl({nf: this.separateReportData.length, floorInfoArr: floorInfoArr})
  }

  addPhItem() {
    Object.keys(this.tempSeparateReportData).forEach((key) => {
      key === 'XH' && (this.tempSeparateReportData[key] = this.separateReportData.length + 1)
      key === 'SL' && (this.tempSeparateReportData[key] = this.generateOptions(this.castingDataone.JHSL.value))
      key === 'GLYY' && (this.tempSeparateReportData[key] = { value: '', options: this.glyyArr })
    })

    this.separateReportData.push(JSON.parse(JSON.stringify(this.tempSeparateReportData)))
  }

  deletePhItem(index) {
    this.separateReportData.splice(index, 1)
  }

}

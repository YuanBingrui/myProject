import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { SeparateReportPage } from '../separate-report/separate-report';
import { DocumentListPage } from '../document-list/document-list';
import { HistoryQuestionPage } from '../history-question/history-question';

import { CastingServiceProvider } from '../../providers/casting-service/casting-service';
import { TipstoolProvider } from '../../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
import { DocumnetServiceProvider } from '../../providers/documnet-service/documnet-service';

@Component({
  selector: 'page-casting-home',
  templateUrl: 'casting-home.html',
})
export class CastingHomePage {
  isModal: boolean = false;
  isAlert: boolean = false;
  headerInfo: any  = {
    bz: '',
    czr: '',
    noticeInfo: [
      {id: 1, content: '滚动信息001'},
      {id: 1, content: '滚动信息002'},
      {id: 1, content: '滚动信息003'},
      {id: 1, content: '滚动信息004'}],
    planDate: moment().format('YYYY-MM-DD')
  };
  tableTitle: any = [
    {id: 'XH', name: '序号'},
    {id: 'TSZL', name: '铁水重量(㎏)'},
    {id: 'BCBH', name: '包次编号'},
    {id: 'JZPH', name: '浇铸牌号'},
    {id: 'CPBM', name: '产品编号'},
    {id: 'JHSL', name: '数量'},
    {id: 'DCLSL', name: '待处理'},
    {id: 'WD', name: '始浇温度'},
    {id: 'SJSJ', name: '始浇时间'},
    {id: 'ZJSJ', name: '终浇时间'},
    {id: 'CZ', name: '操作'}];
  castingList: any = [];
  beginTemperature: any = {CJID: '', CWSJ: '', WD: ''};
  presentIndex: any;
  modalTitle: any = { title: '始浇温度采集', label: '始浇温度' };
  specTemperature: any = [];
  snTitle: any = [
    {id: 'XLH', name: '序列号'},
    {id: 'SJSJ', name: '始浇时间'},
    {id: 'ZJSJ', name: '终浇时间'}];
  serialNumber: any = [];
  defaultTemperature: any = {CJID: '', CWSJ: '', WD: ''};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public tipsTool: TipstoolProvider,
    public storage: Storage,
    public castingService: CastingServiceProvider,
    public documnetService: DocumnetServiceProvider,
    public utilService: UtilServiceProvider
  ) {
    this.headerInfo.bz = this.utilService.userInfo.userTeam
    this.headerInfo.czr = this.utilService.userInfo.userName
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad CastingHomePage');
    this.getListInfo();
  }

  getListInfo() {
    this.castingList = [];
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.castingService.getListInfo(userid, this.headerInfo.planDate).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          if(this.utilService.rowsDataTrimValueProperty(response.body.rows).length === 0){
            this.tipsTool.presentAlertButtonYes('暂无数据！！');
          }
          this.initCastingData(this.utilService.rowsDataTrimValueProperty(response.body.rows));
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

  initCastingData(castingData) {
    let tempObj = {}
    castingData.forEach((cValue, cIndex) => {
      tempObj = {}
      this.tableTitle.forEach((tValue, tIndex) => {
        let btnDes = ''
        switch(tValue.id){
          case 'TSZL':
            cValue[tValue.id] = ~~cValue[tValue.id]
            break;
          case 'WD':
            btnDes = '温度采集'
            break;
          case 'SJSJ':
            cValue[tValue.id] = moment(cValue[tValue.id]).isSame('1899-12-30') ? '' : this.changeTimeFormat(cValue[tValue.id])
            btnDes = '开始'
            break;
          case 'ZJSJ':
            cValue[tValue.id] = moment(cValue[tValue.id]).isSame('1899-12-30') ? '' : this.changeTimeFormat(cValue[tValue.id])
            btnDes = '结束'
            break;
          case 'CZ':
            btnDes = '提交'
            break;
        }
        tempObj[tValue.id] = (tValue.id === 'JHSL') ? generateOptions(cValue[tValue.id]) : (cValue[tValue.id] || btnDes)
      })
      Object.keys(cValue).forEach((key) => {
        !tempObj.hasOwnProperty(key) && (tempObj[key] = cValue[key])
      })
      if(tempObj['SJSJ'] !== '开始'){
        tempObj['isDisabled'] = true
        tempObj['CZ'] = '修改'
      } else {
        tempObj['isDisabled'] = false
      }

      this.castingList.push(tempObj)
    })

    function generateOptions(jhsl) {
      let options = []
      for (let i = jhsl; i >= 1; i--) {
        options.push(i)
      }
      return {value: jhsl, options: options}
    }
  }

  changeTimeFormat(time) {
    // return time.replace(/.+\s+/, '')
    return time.replace(/\s+/, '<br/>')
  }

  eventOperation(eventType, index) {
    switch(eventType){
      case 'WD':
        !this.castingList[index].isDisabled ? this.getStartTemperature(index) : this.tipsTool.presentAlertButtonYes('请点击修改按钮，再重新编辑！');
      break;
      case 'SJSJ':
        !this.castingList[index].isDisabled ? this.getStartTime(index) : this.tipsTool.presentAlertButtonYes('请点击修改按钮，再重新编辑！');
        break;
      case 'ZJSJ':
        !this.castingList[index].isDisabled ? this.getEndTime(index) : this.tipsTool.presentAlertButtonYes('请点击修改按钮，再重新编辑！');
      break;
      case 'CZ':
        if(this.castingList[index].isDisabled) {
          this.castingList[index].CZ = '提交'
          this.castingList[index].isDisabled = false
        } else {
          this.submitData(index);
        }
      break;
    }
  }

  getAlterStartTime(index) {
    this.serialNumber[index].SJSJ = moment().format('YYYY-MM-DD') + '<br/>' + moment().format('HH:mm:ss');
  }

  getAlterEndTime(index) {
    this.serialNumber[index].ZJSJ = moment().format('YYYY-MM-DD') + '<br/>' + moment().format('HH:mm:ss');
  }

  getStartTime(index) {
    if (this.castingList[index].DJGL === 'Y') {
      // (this.castingList[index].SJSJ === '开始' && !this.serialNumber) && this.getSinglePlanxlh(this.castingList[index].JZJHID);
      this.castingList[index].SJSJ === '开始' && this.getSinglePlanxlh(this.castingList[index].JZJHID);
      this.isAlert = true;
    } else {
      this.castingList[index].SJSJ = moment().format('YYYY-MM-DD') + '<br/>' + moment().format('HH:mm:ss');
    }
    this.presentIndex = index;
  }

  getEndTime(index) {
    if (this.castingList[index].DJGL === 'Y') {
      // (this.castingList[index].ZJSJ === '结束' && !this.serialNumber) && this.getSinglePlanxlh(this.castingList[index].JZJHID);
      this.castingList[index].ZJSJ === '结束' && this.getSinglePlanxlh(this.castingList[index].JZJHID);
      this.isAlert = true;
    } else {
      this.castingList[index].ZJSJ = moment().format('YYYY-MM-DD') + '<br/>' + moment().format('HH:mm:ss');
    }
    this.presentIndex = index;
  }

  getSinglePlanxlh(jzjhid) {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.castingService.getSinglePlanxlh(userid, jzjhid).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.SetXlh(this.utilService.rowsDataTrimValueProperty(response.body.rows));
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

  SetXlh(XlhList) {
    let tempObj = {}
    XlhList.forEach((currentValue, index) => {
      tempObj = {}
      Object.keys(currentValue).forEach((key) => {
        let btnDes = ''
        switch(key){
          case 'SJSJ':
            btnDes = !moment(currentValue[key]).isSame('1899-12-30') ? this.changeTimeFormat(currentValue[key]) : '开始'
            break;
          case 'ZJSJ':
            btnDes = !moment(currentValue[key]).isSame('1899-12-30') ? this.changeTimeFormat(currentValue[key]) : '结束'
            break;
        }
        tempObj[key] = btnDes || currentValue[key]
      })
      this.serialNumber.push(tempObj)
    })
  }

  alterConfirm() {
    this.castingList[this.presentIndex].SJSJ = this.serialNumber[0].SJSJ;
    this.castingList[this.presentIndex].ZJSJ = this.serialNumber[this.serialNumber.length-1].ZJSJ;
    this.isAlert = false;
  }

  alterCancel() {
    this.isAlert = false;
  }

  getStartTemperature(index) {
    this.getSpecTemperatureGun();
    this.isModal = true;
    this.presentIndex = index;
  }

  getSpecTemperatureGun() {
    this.specTemperature = []
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.castingService.getSpecTemperatureGun(userid).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.utilService.rowsDataTrimValueProperty(response.body.rows).forEach((currentValue) => {
            this.specTemperature.push({ id: currentValue.H_CWQ_CWQID, name: currentValue.H_CWQ_MC })
          })
        }else{
          this.tipsTool.presentAlertButtonYes('获取测温枪失败，请稍后重试！');
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

  getSpecTemperature(presentGun) {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.castingService.collectTemperature(userid, presentGun).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.beginTemperature = response.body.rows.length === 0 ? this.defaultTemperature : this.utilService.rowsDataTrimValueProperty(response.body.rows)[0];
        } else {
          this.beginTemperature = this.defaultTemperature;
          this.tipsTool.presentAlertButtonYes('请动手输入温度值');
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

  modalConfirm(event) {
    if(event.WD) {
      this.castingList[this.presentIndex].WD = event.WD
      this.submitTemperature(event)
      this.isModal = false;
    } else {
      this.tipsTool.presentAlertButtonYes('温度值不能为空');
    }
  }

  modalCancel() {
    this.isModal = false;
  }

  submitTemperature(event) {
    this.storage.get('userid').then(userid => {
      this.castingService.submitSpecTemperatureGun(userid, this.castingList[this.presentIndex].JZJHID, event.CJID, event.CJFS, event.WD, event.CWSJ, event.CWQ).then(response => {
        if (response && 0 === response.errcode) {
          console.log('success')
        } else {
          this.tipsTool.presentAlertButtonYes('请求出现问题，请稍后重试！');
        }
      }).catch(err => {
        this.tipsTool.presentAlertButtonYes(err);
      });
    }).catch(err => {
      this.tipsTool.presentAlertButtonYes(err);
    });
  }

  submitData(index) {
    let alert = this.alertCtrl.create({
      title: '确认提交？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            if(this.castingList[index].WD === '温度采集') {
              this.tipsTool.presentAlertButtonYes('请采集温度！！');
              return
            }
            if(this.castingList[index].SJSJ === '开始') {
              this.tipsTool.presentAlertButtonYes('请获取始浇时间！！');
              return
            }
            if(this.castingList[index].SJSJ === '结束') {
              this.tipsTool.presentAlertButtonYes('请获取终浇时间！！');
              return
            }
            if(this.castingList[index].DJGL === 'Y') {
              this.updateJzfkXlh(this.castingList[index])
            } else {
              this.updateJzfkUnxlh(this.castingList[index])
            }
          }
        }
      ]
    });
    alert.present();
  }

  updateJzfkXlh(castingItem) {
    let floorInfoArr = [];
    let nf = 0
    let isSjEmpy = this.serialNumber.some((currentValue, index) => {
      nf++
      floorInfoArr.push({
        xh: currentValue.XH,
        xlh: currentValue.XLH,
        sjsj: currentValue.SJSJ !== '开始' ? this.replaceTimeBr(currentValue.SJSJ) : '',
        zjsj: currentValue.ZJSJ !== '结束' ? this.replaceTimeBr(currentValue.ZJSJ) : ''
      })
      return currentValue.SJSJ === '开始' || currentValue.ZJSJ === '结束'
    })
    if(isSjEmpy) {
      this.tipsTool.presentAlertButtonYes('浇铸时间不能为空！！')
    } else {
      this.changeXlh(castingItem, 'FK', {nf: nf, floorInfoArr: floorInfoArr })
    }
  }

  changeXlh(castingItem, lx, columns) {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.castingService.changeXlh(userid, castingItem.JZJHID, castingItem.WD, lx, columns).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          castingItem.CZ = '修改'
          castingItem.isDisabled = true
          this.serialNumber = []
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

  updateJzfkUnxlh(castingItem) {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.castingService.updateJzfkUnxlh(userid, castingItem.JZJHID, castingItem.JHSL.value, castingItem.WD, this.replaceTimeBr(castingItem.SJSJ), this.replaceTimeBr(castingItem.ZJSJ)).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          castingItem.CZ = '修改'
          castingItem.isDisabled = true
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

  replaceTimeBr(time) {
    return time.replace(/<br\/>/, ' ')
  }

  gotoDocumentList(itemSliding, presentIndex) {
    itemSliding.close();
    this.navCtrl.push(DocumentListPage, {wlid: this.castingList[presentIndex].CPBM, mkid: 'JZ', lx: 'BZS'});
  }

  gltbOpration(itemSliding, presentIndex) {
    itemSliding.close();
    this.navCtrl.push(SeparateReportPage, {castingDataone: this.castingList[presentIndex]});
  }

  planDateFilter(event) {
    this.getListInfo();
  }

  inquireHistoryQuestion(itemSliding, presentIndex) {
    itemSliding.close();
    this.navCtrl.push(HistoryQuestionPage, {wlid: this.castingList[presentIndex].CPBM});
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { SmeltingThrowPage } from '../smelting-throw/smelting-throw';

import { SmeltingServiceProvider } from '../../providers/smelting-service/smelting-service';
import { TipstoolProvider } from '../../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
import { DocumnetServiceProvider } from '../../providers/documnet-service/documnet-service';

@Component({
  selector: 'page-smelting-home',
  templateUrl: 'smelting-home.html',
})
export class SmeltingHomePage {
  headerInfo: any  = {
    bz: '',
    czr: '',
    noticeInfo: [
      {id: 1, content: '滚动信息0001'},
      {id: 1, content: '滚动信息0002'},
      {id: 1, content: '滚动信息0003'},
      {id: 1, content: '滚动信息0004'}],
    planDate: moment().format('YYYY-MM-DD')
  };
  tableTitle: any = [
    {id: 'WLMC', name: '原料'},
    {id: 'JHSL', name: '计划'},
    {id: 'YTSL', name: '已投'}];
  furnaceArr: any = [];
  plans: any = {};
  detailInfo: any = [
    {WLMC: '', JHSL: '', YTSL: ''},
    {WLMC: '', JHSL: '', YTSL: ''},
    {WLMC: '', JHSL: '', YTSL: ''}];
  rawMaterialPits: any = [];
  selectedFurnaceId: string = 'null';
  selectedPitId: string = 'null';
  wlInfo: any = { WLID: '', WLMC: '' };
  tlcz: any;
  presentIndex: any;
  presentLcbh: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tipsTool: TipstoolProvider,
    public storage: Storage,
    public smeltingService: SmeltingServiceProvider,
    public documnetService: DocumnetServiceProvider,
    public utilService: UtilServiceProvider
  ) {
    this.headerInfo.bz = this.utilService.userInfo.userTeam
    this.headerInfo.czr = this.utilService.userInfo.userName
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SmeltingHomePage')
    this.getSmeltingFurnace()
    this.getPits()
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter SmeltingHomePage')
    if(this.presentLcbh !== undefined && this.presentIndex !== undefined) {
      this.getSmeltingPlans(this.presentLcbh, this.presentIndex)
    }
  }

  getSmeltingFurnace() {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.smeltingService.getSmeltingFurnace(userid).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.handleRawData(this.utilService.rowsDataTrimValueProperty(response.body.rows));
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

  handleRawData(furnaceInfo) {
    furnaceInfo.forEach((currentValue, index) => {
      this.furnaceArr.push({
        id: currentValue.LH,
        name: currentValue.MC,
        plans: this.plans,
        detailInfo: this.detailInfo
      })
    })
    this.getPlanPitNumber()
  }

  getPits() {
    this.storage.get('userid').then(userid => {
      this.smeltingService.getPits(userid).then(response => {
        if (response && 0 === response.errcode) {
          this.rawMaterialPits = this.utilService.rowsDataTrimValueProperty(response.body.rows);
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

  getTlCz() {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.smeltingService.getTlCz(userid).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.tlcz = Number(response.body) > 0 ? Number(response.body) : ''
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

  getPlanPitNumber() {
    this.storage.get('userid').then(userid => {
      this.smeltingService.getPlanPitNumber(userid, this.headerInfo.planDate).then(response => {
        if (response && 0 === response.errcode) {
          this.handlePlanPitNumber(this.utilService.rowsDataTrimValueProperty(response.body.rows));
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

  handlePlanPitNumber(RawPlanPitNumber) {
    let options = []
    this.furnaceArr.forEach((fValue, fIndex) => {
      options = []
      RawPlanPitNumber.forEach((pValue, pIndex) => {
        (fValue.id === pValue.LH) && options.push(pValue.LCBH) 
      })
      Object.assign(fValue, { plans: { value: '', options } })
    })
  }

  getSmeltingPlans(lcbh, currentIndex) {
    this.presentLcbh = lcbh
    this.presentIndex = currentIndex
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.smeltingService.getSmeltingPlans(userid, lcbh).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          Object.assign(this.furnaceArr[currentIndex], { detailInfo: this.utilService.rowsDataTrimValueProperty(response.body.rows) });
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

  goToSmeltingThrow(detailone, currentIndex) {
    this.navCtrl.push(SmeltingThrowPage, { lcbh: this.furnaceArr[currentIndex].plans.value, wlid: detailone.WLID })
  }

  confirmTl() {
    if(!this.tlcz) {
      this.tipsTool.presentAlertButtonYes('请输入正确的投料称重值');
      return
    }
    if(!this.furnaceArr[this.presentIndex].plans.value) {
      this.tipsTool.presentAlertButtonYes('请选择炉次编号');
      return
    }
    if(this.selectedPitId === 'null') {
      this.tipsTool.presentAlertButtonYes('请选择坑位');
      return
    }
    if(!this.wlInfo) {
      this.tipsTool.presentAlertButtonYes('无此原料，无法投料');
      return
    }
    this.newAddTlmx(this.furnaceArr[this.presentIndex].plans.value, this.selectedPitId, this.wlInfo.WLID, this.tlcz)
  }

  newAddTlmx(lcbh, kwid, wlid, tlcz) {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.smeltingService.newAddTlmx(userid, lcbh, kwid, wlid, tlcz).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.getSmeltingPlans(this.presentLcbh, this.presentIndex)
          this.tlcz = ''
          // this.getPlanPitNumber()
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

  getZybzsDocumentList(itemSliding, presentIndex) {
    itemSliding.close();
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.documnetService.getDocList(userid, 'BZS', 'RL', '').then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          console.log(response)
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

  planDateFilter(event) {
    this.getPlanPitNumber()
  }

  selectedFurnace(selectedId, presentIndex) {
    this.selectedFurnaceId = selectedId
    this.presentIndex = presentIndex
  }

  selectedPit(selectedId, rawMaterialPit) {
    this.selectedPitId = selectedId;
    this.wlInfo = { WLID: '', WLMC: '' }
    this.furnaceArr[this.presentIndex].detailInfo.forEach((dValue, dIndex) => {
      (dValue.KWID === rawMaterialPit.KW_KWID) && (this.wlInfo = { WLID: dValue.WLID, WLMC: dValue.WLMC })
    })
  }

}

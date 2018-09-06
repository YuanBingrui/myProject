import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import * as moment from 'moment';

import { SmeltingServiceProvider } from '../../providers/smelting-service/smelting-service';
import { CastingServiceProvider } from '../../providers/casting-service/casting-service';
import { SmeltingDetectionServiceProvider } from '../../providers/smelting-detection-service/smelting-detection-service';
import { TipstoolProvider } from '../../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@Component({
  selector: 'page-smelting-detection-fx',
  templateUrl: 'smelting-detection-fx.html',
})
export class SmeltingDetectionFxPage {
  isModal: boolean = false;
  planDate: string = moment().format('YYYY-MM-DD');
  furnaceArr: any = [];
  plans: any = {};
  presentIndex: any;
  pickTemperatures:  any = [
    { id: 'RLWD', name: '熔炼温度', value: '', pickTimeName: '采集时间', pickTime: null },
    { id: 'CTWD', name: '出铁温度', value: '', pickTimeName: '采集时间', pickTime: null }];
  isFurnace: string;
  ironWaterId: string;
  presentLcbh: string;
  analyzeType: string = 'GPFX';
  spectrumTableTitle: any =[];
  spectrumStandardData: any = [];
  spectrumDetectTableTitle: any = [];
  spectrumDetectData: any = [];
  hotTableTitle: any =[];
  hotStandardData: any = [];
  hotDetectTableTitle: any = [];
  hotDetectData: any = [];
  detectionType: any = { S: 'Spectrum', H: 'Hot' };
  fxidea: string;
  fangxingStatus: string = 'N';
  fangxingStatusOptions: any = [
    { id: 'Y', name: '已放行'},
    { id: 'N', name: '未放行'},
    { id: '', name: ''}
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tipsTool: TipstoolProvider,
    public storage: Storage,
    public smeltingService: SmeltingServiceProvider,
    public castingService: CastingServiceProvider,
    public smeltingDetectionService: SmeltingDetectionServiceProvider,
    public utilService: UtilServiceProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SmeltingDetectionPage');
    this.getSmeltingFurnace();
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
        plans: this.plans
      })
    })
    this.getPlanPitNumber()
  }

  getPlanPitNumber() {
    this.storage.get('userid').then(userid => {
      this.smeltingDetectionService.getUnqualifiedLcbh(userid, this.planDate, this.fangxingStatus).then(response => {
        if (response && 0 === response.errcode) {
          if(response.body.rows.length !== 0) {
            this.handlePlanPitNumber(this.utilService.rowsDataTrimValueProperty(response.body.rows));
          } else {
            this.initAllData()
          }
        }else{
          this.tipsTool.presentAlertButtonYes('请求出现问题，请稍后重试！');
        }
      }).catch(err => {
        this.tipsTool.presentAlertButtonYes(err);
        console.log(err)
      });
    }).catch(err => {
      this.tipsTool.presentAlertButtonYes(err);
      console.log(err)
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

  initAllData() {
    this.plans = {}
    this.furnaceArr.forEach((currentValue) => {
      currentValue.plans = {}
    })
    this.presentIndex = null
    this.pickTemperatures = [
      { id: 'RLWD', name: '熔炼温度', value: '', pickTimeName: '采集时间', pickTime: null },
      { id: 'CTWD', name: '出铁温度', value: '', pickTimeName: '采集时间', pickTime: null }]
    this.isFurnace = ''
    this.ironWaterId = ''
    this.presentLcbh = ''
    this.analyzeType = 'GPFX'
    this.spectrumTableTitle = []
    this.spectrumStandardData = []
    this.spectrumDetectTableTitle = []
    this.spectrumDetectData = []
    this.hotTableTitle = []
    this.hotStandardData = []
    this.hotDetectTableTitle = []
    this.hotDetectData = []
    this.fxidea = ''
  }

  selectedFurnace(furnaceID, index) {
    this.isFurnace = furnaceID;
    this.presentIndex = index;
  }

  getSmeltingDetectionInfo(lcbh) {
    if(lcbh) {
      this.presentLcbh = lcbh
      this.inquireSmeltingDetection(lcbh)
      this.inquireSpectrumAnalysis(lcbh)
      this.inquireHotAnalysis(lcbh)
    }
  }

  inquireSmeltingDetection(lcbh) {
    this.storage.get('userid').then(userid => {
      this.smeltingDetectionService.inquireSmeltingDetection(userid, lcbh).then(response => {
        if (response && 0 === response.errcode) {
          this.setSmeltingDetection(this.utilService.rowsDataTrimValueProperty(response.body.rows)[0])
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

  setSmeltingDetection(smeltingDetectionData) {
    this.ironWaterId = smeltingDetectionData.JTPH
    this.pickTemperatures.forEach((currentValue, index) => {
      if(currentValue.id === 'RLWD') {
        currentValue.value = smeltingDetectionData.RLWD
        currentValue.pickTime = moment(smeltingDetectionData.RLSJ).isSame('1899-12-30') ? '' : smeltingDetectionData.RLSJ
      } else if(currentValue.id === 'CTWD') {
        currentValue.value = smeltingDetectionData.CTWD
        currentValue.pickTime = moment(smeltingDetectionData.CTSJ).isSame('1899-12-30') ? '' : smeltingDetectionData.CTSJ
      }
    })
    this.inquireAnalysisStandard(this.ironWaterId)
  }

  inquireSpectrumAnalysis(lcbh) {
    this.storage.get('userid').then(userid => {
      this.smeltingDetectionService.inquireSpectrumAnalysis(userid, lcbh).then(response => {
        if (response && 0 === response.errcode) {
          this.setAnalysisTableTitle(response.body.userdata.relationAlias, this.detectionType['S'])
          this.setDetectOrderData(this.utilService.rowsDataTrimValueProperty(response.body.rows), this.detectionType['S']);
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

  inquireHotAnalysis(lcbh) {
    this.storage.get('userid').then(userid => {
      this.smeltingDetectionService.inquireHotAnalysis(userid, lcbh).then(response => {
        if (response && 0 === response.errcode) {
          this.setAnalysisTableTitle(response.body.userdata.relationAlias, this.detectionType['H'])
          this.setDetectOrderData(this.utilService.rowsDataTrimValueProperty(response.body.rows), this.detectionType['H']);
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

  setAnalysisTableTitle(titleString, detectionType) {
    if(detectionType === this.detectionType['S']) {
      splitTitleString(titleString, this.spectrumDetectTableTitle)
      this.spectrumDetectTableTitle.unshift({ id: 'XH', name: '序号'})
    } else {
      splitTitleString(titleString, this.hotDetectTableTitle)
      this.hotDetectTableTitle.unshift(...[{ id: 'XH', name: '序号'}])
    }

    function splitTitleString(titleString, titleArray) {
      titleString.split(",").forEach((currentValue) => {
        titleArray.push({id: currentValue, name: currentValue})
      })
    }
  }

  inquireAnalysisStandard(jtph) {
    this.storage.get('userid').then(userid => {
      this.smeltingDetectionService.inquireAnalysisStandard(userid, jtph).then(response => {
        if (response && 0 === response.errcode) {
          this.handleAnalysisStandard(this.utilService.rowsDataTrimValueProperty(response.body.rows));
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

  handleAnalysisStandard(analysisStandardData) {
    let tempSpectrumObj = {}, tempHotObj = {}
    analysisStandardData.forEach((currentValue, index) => {
      this.spectrumTableTitle.push({ id: currentValue.CF, name: currentValue.CF })
      tempSpectrumObj[currentValue.CF] = currentValue.BZ
      if(currentValue.CF === 'CE' || currentValue.CF === 'C' || currentValue.CF === 'Si') {
        this.hotTableTitle.push({ id: currentValue.CF, name: currentValue.CF })
        tempHotObj[currentValue.CF] = currentValue.BZ
      }
    })
    this.spectrumStandardData.push(tempSpectrumObj)
    this.hotStandardData.push(tempHotObj)
  }

  getAnalysisOrder(AnalysisType) {
    AnalysisType === this.detectionType['S'] && this.getSpectrumAnalysisOrder()
    AnalysisType === this.detectionType['H'] && this.getHotAnalysisOrder()
  }

  getSpectrumAnalysisOrder() {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.smeltingDetectionService.getSpectrumAnalysis(userid, this.presentLcbh, this.ironWaterId).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.setDetectOrderData(this.utilService.rowsDataTrimValueProperty(response.body.rows), this.detectionType['S'])
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

  getHotAnalysisOrder() {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.smeltingDetectionService.getHotAnalysis(userid, this.presentLcbh, this.ironWaterId).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.setDetectOrderData(this.utilService.rowsDataTrimValueProperty(response.body.rows), this.detectionType['H'])
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

  setDetectOrderData(detectOrderData, detectionType) {
    let detectDataLength
    if(detectionType === this.detectionType['S']) {
      detectDataLength = this.spectrumDetectData.length
      detectOrderData.forEach((currentValue, index) => {
        this.spectrumDetectData.push(Object.assign(currentValue, { XH: detectDataLength + index + 1 }))
      })
    } else {
      detectDataLength = this.hotDetectData.length
      detectOrderData.forEach((currentValue, index) => {
        this.hotDetectData.push(Object.assign(currentValue, { XH: detectDataLength + index + 1 }))
      })
    }
  }

  planDateFilter() {
    this.getPlanPitNumber()
  }

  changeFangxingStatus() {
    this.getPlanPitNumber()
  }

  comfirmLetGo() {
    let loading = this.tipsTool.presentLoadingDefault('正在保存，请稍后......');
    this.storage.get('userid').then(userid => {
      this.smeltingDetectionService.confirmLetGo(userid, this.presentLcbh, this.fxidea).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.tipsTool.presentAlertButtonYes('成功！');
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

  dismissLetGo() {
    this.fxidea = ''
  }

}

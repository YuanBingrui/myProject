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
  selector: 'page-smelting-detection-jl',
  templateUrl: 'smelting-detection-jl.html',
})
export class SmeltingDetectionJlPage {
  isModal: boolean = false;
  planDate: string = moment().format('YYYY-MM-DD');
  furnaceArr: any = [];
  plans: any = {};
  presentIndex: any;
  pickTemperatures:  any = [
    { id: 'RLWD', name: '熔炼温度', value: '', pickTimeName: '采集时间', pickTime: '' },
    { id: 'CTWD', name: '出铁温度', value: '', pickTimeName: '采集时间', pickTime: '' }];
  isFurnace: string;
  beginTemperature: any = {CJID: '', CWSJ: '', WD: ''};
  typeid: string;
  modalTitle: any;
  specTemperature: any = [];
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
  defaultTemperature: any = {CJID: '', CWSJ: '', WD: ''};

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
      this.smeltingService.getPlanPitNumber(userid, this.planDate).then(response => {
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
        currentValue.pickTime = moment(smeltingDetectionData.RLCJSJ).isSame('1899-12-30') ? '' : smeltingDetectionData.RLCJSJ
      } else if(currentValue.id === 'CTWD') {
        currentValue.value = smeltingDetectionData.CTWD
        currentValue.pickTime = moment(smeltingDetectionData.CTCJSJ).isSame('1899-12-30') ? '' : smeltingDetectionData.CTCJSJ
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
      this.hotDetectTableTitle.unshift(...[{ id: 'XZ', name: '选择'}, { id: 'XH', name: '序号'}])
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
      this.spectrumDetectData = []
      detectDataLength = this.spectrumDetectData.length
      detectOrderData.forEach((currentValue, index) => {
        this.spectrumDetectData.push(Object.assign(currentValue, { XH: detectDataLength + index + 1 }))
      })
    } else {
      detectDataLength = this.hotDetectData.length
      detectOrderData.forEach((currentValue, index) => {
        this.hotDetectData.push(Object.assign(currentValue, { XH: detectDataLength + index + 1, XZ: false }))
      })
    }
  }

  deleteHotDetectData() {
    this.hotDetectData = this.hotDetectData.filter((currentValue, index) => {
      return !currentValue.XZ
    })
  }

  getStartTemperature(typeid) {
    this.getSpecTemperatureGun();
    this.beginTemperature = '';
    if(typeid === 'RLWD') {
      this.modalTitle = { title: '熔炼温度采集', label: '熔炼温度' };
    } else {
      this.modalTitle = { title: '出铁温度采集', label: '出铁温度' };
    }
    this.typeid = typeid;
    this.isModal = true;
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
    if(this.typeid === 'RLWD') {
      this.pickTemperatures[0].value = event.WD;
      this.pickTemperatures[0].pickTime = event.WD ? moment().format('YYYY-MM-DD HH:mm:ss') : '';
      this.pickTemperatures[0] = Object.assign(this.pickTemperatures[0], {CJID: event.CJID, CWSJ: event.CWSJ, CJFS: event.CJFS, CWQ: event.CWQ})
    }else {
      this.pickTemperatures[1].value = event.WD;
      this.pickTemperatures[1].pickTime = event.WD ? moment().format('YYYY-MM-DD HH:mm:ss') : '';
      this.pickTemperatures[1] = Object.assign(this.pickTemperatures[1], {CJID: event.CJID, CWSJ: event.CWSJ, CJFS: event.CJFS, CWQ: event.CWQ})
    }
    this.isModal = false;
  }

  modalCancel() {
    this.isModal = false;
  }

  planDateFilter() {
    this.getPlanPitNumber()
  }

  submitDetection() {
    if(!this.pickTemperatures[0].value) {
      this.tipsTool.presentAlertButtonYes('请采集熔炼温度');
      return
    }
    if(!this.pickTemperatures[0].value) {
      this.tipsTool.presentAlertButtonYes('请采集出铁温度');
      return
    }
    if(!this.spectrumDetectData.length) {
      this.tipsTool.presentAlertButtonYes('光谱分析检测数据不能为空');
      return
    }
    if(!this.hotDetectData.length) {
      this.tipsTool.presentAlertButtonYes('热分析检测数据不能为空');
      return
    }
    let nf = 0, floorInfoArr = []
    this.spectrumDetectData.forEach((spectrumcurrentValue) => {
      nf = nf + 1
      floorInfoArr.push({xh: nf, lx: 'G', xlh: spectrumcurrentValue.XLH, bhg: spectrumcurrentValue.BHG})
    })
    this.hotDetectData.forEach((hotcurrentValue) => {
      nf = nf + 1
      floorInfoArr.push({xh: nf, lx: 'R', xlh: hotcurrentValue.XLH, bhg: hotcurrentValue.BHG})
    })
    this.submitDetectionOrder({nf: nf, floorInfoArr: floorInfoArr})
  }

  saveDetectionOrder(columns) {
    // let loading = this.tipsTool.presentLoadingDefault('正在保存，请稍后......');
    // this.storage.get('userid').then(userid => {
    //   this.smeltingDetectionService.saveDetectionOrder(userid, this.presentLcbh, this.pickTemperatures[0].value, this.pickTemperatures[1].value, this.pickTemperatures[0].pickTime, this.pickTemperatures[1].pickTime, columns).then(response => {
    //     this.tipsTool.dismissLoading(loading);
    //     if (response && 0 === response.errcode) {
    //       this.tipsTool.presentAlertButtonYes(response.desc);
    //     } else {
    //       this.tipsTool.presentAlertButtonYes('请求出现问题，请稍后重试！');
    //     }
    //   }).catch(err => {
    //     this.tipsTool.dismissLoading(loading);
    //     this.tipsTool.presentAlertButtonYes(err);
    //   });
    // }).catch(err => {
    //   this.tipsTool.dismissLoading(loading);
    //   this.tipsTool.presentAlertButtonYes(err);
    // });
  }

  submitDetectionOrder(columns) {
    let loading = this.tipsTool.presentLoadingDefault('正在提交，请稍后......');
    this.storage.get('userid').then(userid => {
      this.smeltingDetectionService.saveDetectionOrder(userid, this.presentLcbh, this.pickTemperatures, columns).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.tipsTool.presentAlertButtonYes(response.desc);
        } else {
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

}

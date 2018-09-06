import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { ModelingServiceProvider } from '../../providers/modeling-service/modeling-service';
import { TipstoolProvider } from '../../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@Component({
  selector: 'page-modeling-examine',
  templateUrl: 'modeling-examine.html',
})
export class ModelingExaminePage {
  selectedModelingData: any;
  newAddSample: string;
  newAddSampleList: any = [];
  materialID: any;
  tableTitle: any = [
    {id: 'XH', name: '序号'},
    // {id: 'XMID', name: '检验项目'},
    {id: 'XMMC', name: '项目名称'},
    {id: 'JYLX', name: '检验类别'},
    {id: 'JYYQ', name: '检验要求'},
    {id: 'JYJG', name: '确认结果'},
    {id: 'JYZ', name: '检验值'},
    {id: 'SFPZ', name: '拍照'}];
  examineData: any = [];
  presentIndex: any;
  moldingSandOptions: any = [
    { label: '新砂', value: '0' },
    { label: '表面新', value: '1' },
    { label: '混合砂', value: '2' },
    { label: '旧砂', value: '3' }
  ];
  moldingSandOptionObj: any = { '0' : '新砂', '1' : '表面新', '2' : '混合砂', '3' : '旧砂'};
  sfpzObj: any = { 'Y': '已拍照', 'N': '未拍照' };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public camera: Camera,
    public tipsTool: TipstoolProvider,
    public storage: Storage,
    public modelingService: ModelingServiceProvider,
    public utilService: UtilServiceProvider
  ) {
    this.selectedModelingData = this.navParams.data.selectedModelingData;
    this.materialID = this.selectedModelingData.CPBM + ':' + this.selectedModelingData.CPMC + ':' + this.selectedModelingData.TH;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModelingExaminePage');
    this.inquireModelingPlanSample()
  }

  inquireModelingPlanSample() {
    this.storage.get('userid').then(userid => {
      this.modelingService.inquireModelingPlanSample(userid, this.selectedModelingData.GPID).then(response => {
        if (response && 0 === response.errcode) {
          this.newAddSampleList = this.utilService.rowsDataTrimValueProperty(response.body.rows);
          if(this.newAddSampleList.length !== 0) {
            this.newAddSample = this.newAddSampleList[0].YB
            this.inquireModelingPlanDetail(this.newAddSample)
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

  inquireModelingPlanDetail(yb) {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.modelingService.inquireModelingPlanDetail(userid, this.selectedModelingData.GPID, yb).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.examineData = this.utilService.rowsDataTrimValueProperty(response.body.rows);
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

  addNewExamineSample() {
    let loading = this.tipsTool.presentLoadingDefault('正在新增样本，请稍等......');
    this.storage.get('userid').then(userid => {
      this.modelingService.addNewExamineSample(userid, this.selectedModelingData.GPID).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.tipsTool.presentAlertButtonYes('新增样本' + response.desc);
          this.newAddSampleList.push({ YB: response.body, H_ZXJYMX_JYDXID: '' });
          this.newAddSample = response.body;
          this.inquireModelingPlanDetail(this.newAddSample);
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

  changeSample() {
    this.inquireModelingPlanDetail(this.newAddSample)
  }

  takingPhoto(index){
    if(index === undefined) {
      if(this.presentIndex === '') {
        this.tipsTool.presentAlertButtonYes('请先选中要替换的检验数据')
        return
      } else {
        index = this.presentIndex
      }
    }
    const options: CameraOptions = {
      quality: 80,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1024,
      targetHeight: 768
    }
    let loading = this.tipsTool.presentLoadingDefault('正在上传照片，请稍等......');
    this.camera.getPicture(options).then((imageData) => {
      this.uploadImg(loading, 'data:image/jpeg;base64,' + imageData, this.examineData[index].XH, index)
    }, (err) => {
      this.tipsTool.dismissLoading(loading);
      this.tipsTool.presentAlertButtonYes('获取图片失败,请重新拍照');
    });
  }

  uploadImg(loading, imgFile, xh, index) {
    this.storage.get('userid').then(userid => {
      this.modelingService.uploadImg(userid, this.selectedModelingData.GPID, this.newAddSample, xh, imgFile).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.tipsTool.presentAlertButtonYes('上传图片成功')
          this.examineData[index].SFPZ = 'done'
          this.examineData[index].ZPCZ = 'Y'
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

  checkResult(index, xmid, sfpz, zpcz) {
    if (this.presentIndex === index){
      this.presentIndex = '';
    } else {
      this.presentIndex = index;
    }
    if (sfpz === 'Y') {
      if (zpcz === 'Y') {
        this.checkIsTakingPhoto(index, '照片已上传，是否重新上传？', zpcz)
      } else {
        this.checkIsTakingPhoto(index, '该项目需要拍照，请确认拍照后再次确认结果', zpcz)
      }
    } else {
      if(xmid === 'XSLBSX' || xmid === 'XSLBXX') {
        this.checkIsMoldingSand(index)
      }
    }
  }

  checkIsTakingPhoto(index, message, type) {
    let self = this
    let confirm = this.alertCtrl.create({
      title: '拍照',
      message: message,
      buttons: [
        {
          text: '取消',
          handler: () => {
            type === 'Y' && (self.examineData[index].SFPZ = 'done')
          }
        },
        {
          text: '确定',
          handler: () => {
            self.takingPhoto(index)
          }
        }
      ]
    });
    confirm.present();
  }

  checkIsMoldingSand(index) {
    let alert = this.alertCtrl.create();
    alert.setTitle('型砂类型');

    this.moldingSandOptions.forEach((currentValue, currentIndex) => {
      alert.addInput({
        type: 'radio',
        label: currentValue.label,
        value: currentValue.value,
        checked: this.examineData[index].JYZ ? (currentValue.value === this.examineData[index].JYZ) : (currentIndex === 0)
      });
    })

    alert.addButton('取消');
    alert.addButton({
      text: '确认',
      handler: data => {
        this.examineData[index].JYZ = data
        this.selectMoldingSandType(index, this.examineData[index].XH, data)
      }
    });
    alert.present();
  }

  selectedOption(option) {
    this.examineData[this.presentIndex].JYJG = option
    this.updateExamineDetail(this.examineData[this.presentIndex]);
  }

  updateExamineDetail(examineDataOne) {
    this.storage.get('userid').then(userid => {
      this.modelingService.updateExamineDetail(userid, this.selectedModelingData.GPID, this.newAddSample, examineDataOne.XH, examineDataOne.JYJG).then(response => {
        if (response && 0 === response.errcode) {
          console.log(response.desc)
          // this.tipsTool.presentAlertButtonYes(response.desc);
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

  selectMoldingSandType(index, xh, jyz) {
    this.storage.get('userid').then(userid => {
      this.modelingService.selectMoldingSandType(userid, this.selectedModelingData.GPID, this.newAddSample, xh, jyz).then(response => {
        if (response && 0 === response.errcode) {
          console.log(response.body)
          // this.tipsTool.presentAlertButtonYes(response.desc);
          this.examineData[index].JYJG = response.body
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
    this.viewCtrl.dismiss('confirm');
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { MakingCoreServiceProvider } from '../../providers/making-core-service/making-core-service';
import { TipstoolProvider } from '../../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@Component({
  selector: 'page-making-core-examine',
  templateUrl: 'making-core-examine.html',
})
export class MakingCoreExaminePage {
  selectedMakingCoreData: any;
  newAddSample: string;
  newAddSampleList: any = [];
  materialID: any;
  tableTitle: any = [
    {id: 'XH', name: '序号'},
    {id: 'XMID', name: '检验项目'},
    {id: 'XMMC', name: '项目名称'},
    {id: 'JYLX', name: '检验类别'},
    {id: 'JYYQ', name: '检验要求'},
    {id: 'JYJG', name: '确认结果'}];
  examineData: any = [];
  presentIndex: any;
  mxxh: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public camera: Camera,
    public tipsTool: TipstoolProvider,
    public storage: Storage,
    public makingCoreService: MakingCoreServiceProvider,
    public utilService: UtilServiceProvider
  ) {
    this.selectedMakingCoreData = this.navParams.data.selectedmakingCoreData
    this.materialID = this.selectedMakingCoreData.SXBH + ':' + this.selectedMakingCoreData.SXMC
    this.mxxh = this.selectedMakingCoreData.MXXH
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakingCoreExaminePage');
    console.log(this.selectedMakingCoreData)
    this.inquireMakingCorePlanSample()
  }

  inquireMakingCorePlanSample() {
    this.storage.get('userid').then(userid => {
      this.makingCoreService.inquireMakingCorePlanSample(userid, this.selectedMakingCoreData.ZYJHID, this.mxxh).then(response => {
        if (response && 0 === response.errcode) {
          this.newAddSampleList = this.utilService.rowsDataTrimValueProperty(response.body.rows);
          if(this.newAddSampleList.length !== 0) {
            this.newAddSample = this.newAddSampleList[0].YB
            this.inquireMakingCorePlanDetail(this.newAddSample)
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

  inquireMakingCorePlanDetail(yb) {
    let loading = this.tipsTool.presentLoadingDefault('');
    this.storage.get('userid').then(userid => {
      this.makingCoreService.inquireMakingCorePlanDetail(userid, this.selectedMakingCoreData.ZYJHID, this.mxxh, yb).then(response => {
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
      this.makingCoreService.addNewExamineSample(userid, this.selectedMakingCoreData.ZYJHID, this.mxxh).then(response => {
        this.tipsTool.dismissLoading(loading);
        if (response && 0 === response.errcode) {
          this.tipsTool.presentAlertButtonYes('新增样本' + response.desc);
          this.newAddSampleList.push({ YB: response.body, H_ZXJYMX_JYDXID: '' });
          this.newAddSample = response.body;
          this.inquireMakingCorePlanDetail(this.newAddSample);
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
    this.inquireMakingCorePlanDetail(this.newAddSample)
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
      this.makingCoreService.uploadImg(userid, this.selectedMakingCoreData.ZYJHID, this.mxxh, this.newAddSample, xh, imgFile).then(response => {
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

  checkResult(index, sfpz, zpcz) {
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
            console.log('condfirm');
          }
        }
      ]
    });
    confirm.present();
  }

  selectedOption(option) {
    this.examineData[this.presentIndex].JYJG = option
    this.updateExamineDetail(this.examineData[this.presentIndex]);
  }

  updateExamineDetail(examineDataOne) {
    this.storage.get('userid').then(userid => {
      this.makingCoreService.updateExamineDetail(userid, this.selectedMakingCoreData.ZYJHID, this.mxxh, this.newAddSample, examineDataOne.XH, examineDataOne.JYJG).then(response => {
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

  dismissApply() {
    this.viewCtrl.dismiss('cancel');
  }

  confirmApply() {
    this.viewCtrl.dismiss('confirm');
  }

}

import { Injectable } from '@angular/core';
import { ToastController, LoadingController, Loading, AlertController } from 'ionic-angular';

@Injectable()
export class TipstoolProvider {

  duration: number = 3000;
  position: string = 'bottom';

  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    console.log('Hello Tipstool Provider');
  }

  presentToast(message: string, onDidDismiss ? : any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: this.duration,
      position: this.position,
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      onDidDismiss && onDidDismiss();
    });

    toast.present();
  }

  presentActionSuccess() {
    this.presentToast('操作成功。');
  }

  presentActionError() {
    this.presentToast('操作失败，请检查重试！');
  }

  presentLoadError() {
    this.presentToast('数据初始化失败！');
  }

  presentNoData(onDidDismiss ? : any) {
    this.presentToast('无数据！', onDidDismiss);
  }

  presentLoadNoMore(onDidDismiss ? : any) {
    this.presentToast('没有更多数据！', onDidDismiss);
  }

  presentLoadingDefault(content ? : any): Loading {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: content ? content : '请稍等...'
    });
    loading.present();
    return loading;
  }

  dismissLoading(loading: any) {
    loading.dismiss();
  }

  presentAlertButtonYes(title: string) {
    let alert = this.alertCtrl.create({
      title: title
    });
    alert.addButton({
      text: '确认'
    });
    alert.present();
  }

}

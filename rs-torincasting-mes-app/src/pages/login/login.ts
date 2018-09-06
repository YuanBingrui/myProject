import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { SettingServerPage } from '../setting-server/setting-server';

import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  DEFAULT_SERVER = 'http://192.168.10.241:9080/hcp_zzmes/'
  login: {
    server: string,
    corpid: string,
    userid ? : string,
    password ? : string,
    errorMessage ? : string
  } = {
    // set default server
    server: this.DEFAULT_SERVER,
    corpid: 'zzmes'
  };
  submitted: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loginService: LoginServiceProvider,
    public storage: Storage,
    public utilService: UtilServiceProvider
  ) {
    this.initInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  initInfo(){
    this.storage.get('userid').then(data => {
      this.login.userid = data;
    }).catch(err => {
      console.log(err);
    })
    this.storage.get('server').then(data => {
      this.login.server = data ? data : this.DEFAULT_SERVER;
    }).catch(err => {
      this.login.server = this.DEFAULT_SERVER;
      console.log(err);
    })
  }

  onLogin(form) {
    this.submitted = true;
    this.login.errorMessage = '登录失败，请检查服务器！！';
    if (form.valid) {
      this.loginService.doLogin(this.login).then(data => {
        data && this.navCtrl.setRoot(HomePage);
      }).catch(err => 
        console.error('login failed: ', err)
      );
    }
  }

  settingServer() {
    let modal = this.modalCtrl.create(SettingServerPage, { server: this.login.server});
    modal.present();
    modal.onDidDismiss((data) => {
      if(data !== 'cancel' && data !== null) {
        this.login.server = data.server;
        this.storage.remove('server');
        this.storage.set('server', this.login.server);
      }else{
        console.log(data);
      }
    });
  }

}

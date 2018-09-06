import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginServiceProvider } from '../../providers/login-service/login-service';

@Component({
  selector: 'page-setting-server',
  templateUrl: 'setting-server.html',
})
export class SettingServerPage {
	serverInfo: {
		server: string
	} = {
		server: ''
	}
	historyServer: Array<string> = [];

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public viewCtrl: ViewController,
  	public loginService: LoginServiceProvider,
  	public storage: Storage
  ) {
  	this.serverInfo.server = this.navParams.data.server;
  	this.showHistoryServer();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingServerPage');
  }

  dismissSettingServer() {
    this.viewCtrl.dismiss('cancel');
  }

  applySettingServer() {
    this.viewCtrl.dismiss(this.serverInfo);
    this.pushHistoryServer(this.serverInfo.server);
  }

  showHistoryServer(){
  	let that = this;
  	this.storage.get('serverNum').then(data => {
  		for (let i = 0; i < data; i++) {
  			that.storage.get('historyServer'+i).then(historyServer => {
  				that.historyServer.push(historyServer);
  			}).catch(err => {
  				console.log(err);
  			})
  		}
  	}).catch(err => {
  		console.log(err);
  	});
  	
  }

  pushHistoryServer(server){
  	if(this.historyServer.indexOf(server) === -1){
  		this.historyServer.push(server);
  	}
  	this.loginService.saveHistoryServer(this.historyServer);
  	this.loginService.saveServerNum(this.historyServer.length);
  }

  changePresentServer(presentServer){
  	this.serverInfo.server = presentServer;
  }

  deleteServer(index){
  	this.historyServer.splice(index, 1);
  	this.loginService.removeHistoryServer(index);
  	this.loginService.saveServerNum(this.historyServer.length);
  }

}

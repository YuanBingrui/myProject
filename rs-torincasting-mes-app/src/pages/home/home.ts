import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { MenuListPage } from '../menu-list/menu-list';
import { Storage } from '@ionic/storage';

import { HomeServiceProvider } from '../../providers/home-service/home-service';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { TipstoolProvider } from '../../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menuList: any = [
  {id: 'zzfk', name: '浇铸反馈', authorityID: '936000022'},
  {id: 'rlfk', name: '熔炼反馈', authorityID: '936000030'},
  {id: 'rljcjl', name: '熔炼检测记录', authorityID: '936000031'},
  {id: 'rljcfx', name: '熔炼检测放行', authorityID: '936000032'},
  {id: 'kxfk', name: '开箱反馈', authorityID: '936000034'},
  {id: 'zxinjy', name: '制芯检验', authorityID: '936000036'},
  {id: 'zxingjy', name: '造型检验', authorityID: '936000037'}];
  showMenuList: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public homeService: HomeServiceProvider,
    public loginService: LoginServiceProvider,
    public tipsTool: TipstoolProvider,
    public utilService: UtilServiceProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParameterSelectPage');
    this.getUsername()
    this.getUserTeams()
    this.getUserAuthority()
  }

  navGotoFeedbackPage(menuItem) {
    this.navCtrl.push(MenuListPage, { menuItem: menuItem })
  }

  getUsername() {
    this.storage.get('userid').then(userid => {
      this.homeService.getUsername(userid).then(response => {
        if (response && 0 === response.errcode) {
          this.utilService.userInfo.userName = response.body
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

  getUserTeams() {
    this.storage.get('userid').then(userid => {
      this.homeService.getUserTeams(userid).then(response => {
        if (response && 0 === response.errcode) {
          this.utilService.userInfo.userTeam = response.body
        }
      }).catch(err => {
        console.log(err)
      });
    }).catch(err => {
      console.log(err)
    });
  }

  getUserAuthority() {
    this.storage.get('userid').then(userid => {
      this.homeService.getUserAuthority(userid).then(response => {
        if (response && 0 === response.errcode) {
          this.handleAuthority(response.body)
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

  handleAuthority(authorityStr) {
    let authorityObj = {}
    authorityStr.split(',').forEach((currentValue) => {
      authorityObj[currentValue] = currentValue
    })
    this.menuList.forEach((menuItem) => {
      Object.assign(menuItem, { isShow: authorityObj.hasOwnProperty(menuItem.authorityID) })
    })
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: '确定退出？',
      buttons: ['取消']
    });
    alert.addButton({
      text: '确定退出',
      handler: () => {
        let navTransition = alert.dismiss();
        this.loginService.logout().then(() => {
          this.loginService.clearLogin();
          navTransition.then(() => {
            this.navCtrl.setRoot(LoginPage);
          });
        }).catch(err => 
          console.log('logout error: ', err)
        );
        return false;
      }
    });
    alert.present();
  }

}

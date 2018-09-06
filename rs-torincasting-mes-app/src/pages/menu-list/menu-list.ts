import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';

import { CastingHomePage } from '../casting-home/casting-home';
import { SmeltingHomePage } from '../smelting-home/smelting-home';
import { SmeltingDetectionJlPage } from '../smelting-detection-jl/smelting-detection-jl';
import { SmeltingDetectionFxPage } from '../smelting-detection-fx/smelting-detection-fx';
import { OpenBoxHomePage } from '../open-box-home/open-box-home';
import { MakingCoreHomePage } from '../making-core-home/making-core-home';
import { ModelingHomePage } from '../modeling-home/modeling-home';
import { DocumentListPage } from '../document-list/document-list';

@Component({
  selector: 'page-menu-list',
  templateUrl: 'menu-list.html',
})
export class MenuListPage {
  @ViewChild('menuContent') nav: Nav;
  rootView: any;
  sideMenuList: any = [{ id: 'home', name: '首页', iconName: 'icon-home'}];
  menuItem: any;
  mkid: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    console.log(this.navParams.data.menuItem);
    this.menuItem = this.navParams.data.menuItem;
    this.mkid = this.menuItem.id === "zzfk" ? 'JZ' : 'RL'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuListPage');
    this.initSideMenuList();
  }

  initSideMenuList() {
    switch (this.menuItem.id) {
      case "zzfk":
        this.sideMenuList.push({ id: 'zyzds', name: '作业指导书', iconName: 'icon-zyzds'});
        this.rootView = CastingHomePage;
        break;
      case "rlfk":
        this.sideMenuList.push({ id: 'zyzds', name: '作业指导书', iconName: 'icon-zyzds'});
        this.rootView = SmeltingHomePage;
        break;
      case "rljcjl":
        this.rootView = SmeltingDetectionJlPage;
        break;
      case "rljcfx":
        this.rootView = SmeltingDetectionFxPage;
        break;
      case "kxfk":
        this.rootView = OpenBoxHomePage;
        break;
      case "zxinjy":
        this.rootView = MakingCoreHomePage;
        break;
      case "zxingjy":
        this.rootView = ModelingHomePage;
        break;
    }
  }

  navToPage(sideMenuItem) {
    switch (sideMenuItem.id) {
      case "home":
        this.navCtrl.pop();
        break;
      case "zyzds":
        this.gotoDocumentList();
        break;
    }
  }

  gotoDocumentList() {
    this.navCtrl.push(DocumentListPage, {wlid: '', mkid: this.mkid, lx: 'ZDS'});
  }

}

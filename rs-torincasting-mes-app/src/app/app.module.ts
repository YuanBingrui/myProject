import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { MenuListPage } from '../pages/menu-list/menu-list';
import { SettingServerPage } from '../pages/setting-server/setting-server';
import { CastingHomePage } from '../pages/casting-home/casting-home';
import { SeparateReportPage } from '../pages/separate-report/separate-report';
import { SmeltingHomePage } from '../pages/smelting-home/smelting-home';
import { SmeltingThrowPage } from '../pages/smelting-throw/smelting-throw';
import { SmeltingDetectionJlPage } from '../pages/smelting-detection-jl/smelting-detection-jl';
import { SmeltingDetectionFxPage } from '../pages/smelting-detection-fx/smelting-detection-fx';
import { OpenBoxHomePage } from '../pages/open-box-home/open-box-home';
import { ModelingHomePage } from '../pages/modeling-home/modeling-home';
import { ModelingExaminePage } from '../pages/modeling-examine/modeling-examine';
import { ModelingFxPage } from '../pages/modeling-fx/modeling-fx';
import { MakingCoreHomePage } from '../pages/making-core-home/making-core-home';
import { MakingCoreExaminePage } from '../pages/making-core-examine/making-core-examine';
import { MakeCoreFxPage } from '../pages/make-core-fx/make-core-fx';
import { HistoryQuestionPage } from '../pages/history-question/history-question';
import { DocumentListPage } from '../pages/document-list/document-list';
import { DocumentViewPage } from '../pages/document-view/document-view';

import { ComponentsModule } from '../components/components.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { CastingServiceProvider } from '../providers/casting-service/casting-service';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { Md5ServiceProvider } from '../providers/md5-service/md5-service';
import { TipstoolProvider } from '../providers/tipstool/tipstool';
import { UtilServiceProvider } from '../providers/util-service/util-service';
import { SmeltingServiceProvider } from '../providers/smelting-service/smelting-service';
import { OpenBoxServiceProvider } from '../providers/open-box-service/open-box-service';
import { SmeltingDetectionServiceProvider } from '../providers/smelting-detection-service/smelting-detection-service';
import { MakingCoreServiceProvider } from '../providers/making-core-service/making-core-service';
import { ModelingServiceProvider } from '../providers/modeling-service/modeling-service';
import { HomeServiceProvider } from '../providers/home-service/home-service';
import { DocumnetServiceProvider } from '../providers/documnet-service/documnet-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    MenuListPage,
    SettingServerPage,
    CastingHomePage,
    SeparateReportPage,
    SmeltingHomePage,
    SmeltingThrowPage,
    SmeltingDetectionJlPage,
    SmeltingDetectionFxPage,
    OpenBoxHomePage,
    ModelingHomePage,
    ModelingExaminePage,
    ModelingFxPage,
    MakingCoreHomePage,
    MakingCoreExaminePage,
    MakeCoreFxPage,
    HistoryQuestionPage,
    DocumentListPage,
    DocumentViewPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    ComponentsModule,
    PdfViewerModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    MenuListPage,
    SettingServerPage,
    CastingHomePage,
    SeparateReportPage,
    SmeltingHomePage,
    SmeltingThrowPage,
    SmeltingDetectionJlPage,
    SmeltingDetectionFxPage,
    OpenBoxHomePage,
    ModelingHomePage,
    ModelingExaminePage,
    ModelingFxPage,
    MakingCoreHomePage,
    MakingCoreExaminePage,
    MakeCoreFxPage,
    HistoryQuestionPage,
    DocumentListPage,
    DocumentViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    // InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CastingServiceProvider,
    HttpServiceProvider,
    LoginServiceProvider,
    Md5ServiceProvider,
    TipstoolProvider,
    UtilServiceProvider,
    SmeltingServiceProvider,
    OpenBoxServiceProvider,
    SmeltingDetectionServiceProvider,
    MakingCoreServiceProvider,
    ModelingServiceProvider,
    HomeServiceProvider,
    DocumnetServiceProvider
  ]
})
export class AppModule {}

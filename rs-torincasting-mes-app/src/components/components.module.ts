import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PageHeaderComponent } from './page-header/page-header';
import { MyModalComponent } from './my-modal/my-modal';
import { MyAlertComponent } from './my-alert/my-alert';
import { MyTimerComponent } from './my-timer/my-timer';
@NgModule({
	declarations: [PageHeaderComponent,
    MyModalComponent,
    MyAlertComponent,
    MyTimerComponent],
	imports: [
    IonicModule
  ],
	exports: [PageHeaderComponent,
    MyModalComponent,
    MyAlertComponent,
    MyTimerComponent]
})
export class ComponentsModule {}

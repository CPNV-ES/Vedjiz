import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreferenciesPage } from './preferencies';

@NgModule({
  declarations: [
    PreferenciesPage,
  ],
  imports: [
    IonicPageModule.forChild(PreferenciesPage),
  ],
})
export class PreferenciesPageModule {}

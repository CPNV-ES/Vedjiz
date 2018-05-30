import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VegetabledetailsPage } from './vegetabledetails';

@NgModule({
  declarations: [
    VegetabledetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VegetabledetailsPage),
  ],
})
export class VegetabledetailsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeCertHomeComponent } from './home/home.component';
import { DegreeCertStepOneComponent } from './step-one/step-one.component';
import { DegreeCertStepTwoComponent } from './step-two/step-two.component';
import { DegreeCertStepThreeComponent } from './step-three/step-three.component';
import { DegreeCertStepFourComponent } from './step-four/step-four.component';
import { DegreeCertStepFiveComponent } from './step-five/step-five.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedDirectiveModule } from '@ksp/shared/directive';
import { SharedUiAddRowButtonModule } from '@ksp/shared/ui/add-row-button';
import { SharedFormDegreeCertStepTwoModule } from '@ksp/shared/form/degree-cert-step-two';
import { SharedFormDegreeCertStepThreeModule } from '@ksp/shared/form/degree-cert-step-three';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    SharedFormOthersModule,
    MatTableModule,
    MatIconModule,
    SharedDirectiveModule,
    SharedUiAddRowButtonModule,
    SharedFormDegreeCertStepTwoModule,
    SharedFormDegreeCertStepThreeModule,
  ],
  declarations: [
    DegreeCertHomeComponent,
    DegreeCertStepOneComponent,
    DegreeCertStepTwoComponent,
    DegreeCertStepThreeComponent,
    DegreeCertStepFourComponent,
    DegreeCertStepFiveComponent,
  ],
  exports: [
    DegreeCertHomeComponent,
    DegreeCertStepOneComponent,
    DegreeCertStepTwoComponent,
    DegreeCertStepThreeComponent,
    DegreeCertStepFourComponent,
    DegreeCertStepFiveComponent,
  ],
})
export class SharedFeatureDegreeCertModule {}

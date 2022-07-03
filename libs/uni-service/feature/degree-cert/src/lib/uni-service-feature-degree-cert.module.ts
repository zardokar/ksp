import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BottomNavComponent } from '@ksp/shared/menu';
import {
  DegreeCertListComponent,
  SharedDegreeCertModule,
} from '@ksp/shared/degree-cert';
import { UniServiceFormModule } from '@ksp/uni-service/form';
import { DegreeCertRequestComponent } from './degree-cert-request/degree-cert-request.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormDegreeCertStepThreeModule } from '@ksp/shared/form/degree-cert/step-three';
import { SharedFormDegreeCertStepOneModule } from '@ksp/shared/form/degree-cert/step-one';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { MatIconModule } from '@angular/material/icon';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { UniContainerPageComponent } from '@ksp/uni-service/pages';

const routes: Routes = [
  {
    path: '',
    component: UniContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'request',
        component: DegreeCertRequestComponent,
      },
      {
        path: 'list',
        component: DegreeCertListComponent,
      },
    ],
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BottomNavComponent,
    SharedDegreeCertModule,
    SharedFormDegreeCertStepOneModule,
    SharedFormDegreeCertStepThreeModule,
    UniServiceFormModule,
    MatStepperModule,
    MatTabsModule,
    RequestHeaderInfoComponent,
    MatIconModule,
    TopNavComponent,
    ReactiveFormsModule,
  ],
  declarations: [DegreeCertRequestComponent],
})
export class UniServiceFeatureDegreeCertModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';

import { EthicsReportRecordingComponent } from './ethicsreport-recording/ethicsreport-recording.component';
// --------------------------------------------------------------------------------------------------------------------------
export const routes: Routes = [
    {
      path: '', // สอบสวน
      component: EServiceContainerPageComponent,
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full',
        },
        {
          path: 'recording',
          component: EthicsReportRecordingComponent,
        }
      ],
    },
  ];

// --------------------------------------------------------------------------------------------------------------------------
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],

  declarations: [
    
  ],
  exports: [
    
  ],
})
// --------------------------------------------------------------------------------------------------------------------------
export class EServiceEthicsReportModule {}
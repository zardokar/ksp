import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';

import { EthicsReportRecordingComponent } from './ethicsreport-recording/ethicsreport-recording.component';
import { EthicsReportRecordingStatisticComponent } from './ethicsreport-recordingstat/ethicsreport-recordingstat.component';
import { EthicsReportResultStatisticComponent } from './ethicsreport-resultstat/ethicsreport-resultstat.component';
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
          component: EthicsReportRecordingComponent
        },
        {
          path: 'recordingstat',
          component: EthicsReportRecordingStatisticComponent
        },
        {
          path: 'resultstat',
          component: EthicsReportResultStatisticComponent
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
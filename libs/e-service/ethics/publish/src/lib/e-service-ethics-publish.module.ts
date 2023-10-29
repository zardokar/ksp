import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishReviewComponent } from './publish-review/publish-review.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AccusationRecordComponent } from '@ksp/e-service/ethics/accusation';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { MatDialogModule } from '@angular/material/dialog';
import {
  InquiryDetailComponent,
  InquiryResultComponent,
} from '@ksp/e-service/ethics/inquiry';
import { BottomNavComponent } from '@ksp/shared/menu';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInvestigationDetailComponent , FormInvestigationAllegationComponent } from '@ksp/e-service/ethics/form';
import { PublishListComponent } from './publish-list/publish-list.component';
import { PublishConfirmationComponent } from './publish-confirmation/publish-confirmation.component';
import { PublishConfirmationListComponent } from './publish-confirmation-list/publish-confirmation-list.component';

export const routes: Routes = [
  {
    path: '', // กล่าวหา
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'confirmlist',
        component: PublishConfirmationListComponent,
      },
      {
        path: 'confirmation',
        component: PublishConfirmationComponent,
      },
      {
        path: 'confirmation/:id',
        component: PublishConfirmationComponent,
      },
      {
        path: 'list',
        component: PublishListComponent,
      },
      {
        path: 'detail',
        component: PublishReviewComponent,
      },
      {
        path: 'detail/:id',
        component: PublishReviewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatDialogModule,
    RouterModule.forChild(routes),
    AccusationRecordComponent,
    InquiryDetailComponent,
    InquiryResultComponent,
    BottomNavComponent,
    TopNavComponent,
    ReactiveFormsModule,
    FormInvestigationDetailComponent,
    FormInvestigationAllegationComponent
  ],

  declarations: [
    PublishReviewComponent,
    PublishConfirmationComponent,
    // PublishConfirmationListComponent
  ],
  exports: [PublishReviewComponent,
            PublishConfirmationComponent,
            // PublishConfirmationListComponent
          ],
})
export class EServiceEthicsPublishModule {}

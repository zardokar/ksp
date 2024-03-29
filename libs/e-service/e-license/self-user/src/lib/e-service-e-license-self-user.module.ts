import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import {
  EServiceRequestSearchComponent,
  EServiceUserSearchComponent,
} from '@ksp/shared/search';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import {
  FormCoordinatorInfoComponent,
  FormRequesterInfoComponent,
} from '@ksp/shared/form/school/register';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SelfUserListComponent } from './user-list/self-user-list.component';
import { RequestNoPipe, ThaiDatePipe } from '@ksp/shared/pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NewForeignUserListComponent } from './new-foreign-user-list/new-foreign-user-list.component';
import { NewForeignUserDetailComponent } from './new-foreign-user-detail/new-foreign-user-detail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const routes: Routes = [
  {
    path: '',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: 'current-user',
        component: SelfUserListComponent,
      },
      {
        path: 'user-detail',
        component: UserDetailComponent,
      },
      {
        path: 'user-detail/:id',
        component: UserDetailComponent,
      },

      {
        path: 'new-user-list',
        component: NewForeignUserListComponent,
      },
      {
        path: 'new-user-detail/:id',
        component: NewForeignUserDetailComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    TopNavComponent,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    EServiceUserSearchComponent,
    EServiceRequestSearchComponent,
    MatPaginatorModule,
    BottomNavComponent,
    LicenseCheckComponent,
    FormRequesterInfoComponent,
    FormCoordinatorInfoComponent,
    SharedFormOthersModule,
    RequestHeaderInfoComponent,
    ThaiDatePipe,
    MatDatepickerModule,
    RequestNoPipe,
    MatProgressSpinnerModule,
  ],
  declarations: [
    SelfUserListComponent,
    UserDetailComponent,
    NewForeignUserListComponent,
    NewForeignUserDetailComponent,
  ],
  exports: [NewForeignUserListComponent, NewForeignUserDetailComponent],
})
export class EServiceELicenseSelfUserModule {}

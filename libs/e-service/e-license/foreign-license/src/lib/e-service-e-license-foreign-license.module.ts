import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ForeignLicenseDetailComponent } from './foreign-license-detail/foreign-license-detail.component';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ForeignLicenseListComponent } from './foreign-license-list/foreign-license-list.component';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatDialogModule } from '@angular/material/dialog';
import { EServiceUiLicenseCheckModule } from '@ksp/e-service/ui/license-check';
import { BottomNavComponent } from '@ksp/shared/menu';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';

export const routes: Routes = [
  {
    path: '',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ForeignLicenseListComponent,
      },
      {
        path: 'detail',
        component: ForeignLicenseDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedFormOthersModule,
    MatDialogModule,
    RouterModule.forChild(routes),
    EServiceUiLicenseCheckModule,
    BottomNavComponent,
    TopNavComponent,
    MatTableModule,
    MatIconModule,
    RequestHeaderInfoComponent,
  ],
  declarations: [ForeignLicenseDetailComponent, ForeignLicenseListComponent],
})
export class EServiceELicenseForeignLicenseModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccusationSearchComponent } from './accusation-search/accusation-search.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {
  LicenseInfoComponent,
  LicenseTypeButtonGroupComponent,
} from '@ksp/shared/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    EServiceUiAccusationInfoModule,
    LicenseTypeButtonGroupComponent,
    LicenseInfoComponent,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
  ],
  declarations: [AccusationSearchComponent],
  exports: [AccusationSearchComponent],
})
export class EServiceDialogAccusationSearchModule {}

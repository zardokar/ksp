import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvisorPersonInfoComponent } from './advisor-person-info/advisor-person-info.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedUiAddRowButtonModule } from '@ksp/shared/ui/add-row-button';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    SharedUiAddRowButtonModule,
  ],
  declarations: [AdvisorPersonInfoComponent],
  exports: [AdvisorPersonInfoComponent],
})
export class SharedFormAdvisorPersonInfoModule {}

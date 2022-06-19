import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './list-page/list-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { EServiceUiAccusationSearchModule } from '@ksp/e-service/ui/accusation-search';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    EServiceUiAccusationSearchModule,
    MatDialogModule,
  ],
  declarations: [ListPageComponent],
  exports: [ListPageComponent],
})
export class EServiceEthicsListPageModule {}
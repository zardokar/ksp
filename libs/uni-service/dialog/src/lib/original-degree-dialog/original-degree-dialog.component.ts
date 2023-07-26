import { Component, Inject, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { providerFactory } from '@ksp/shared/utility';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@UntilDestroy()
@Component({
  selector: 'ksp-original-degree-dialog',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatDialogModule, MatDatepickerModule, MatInputModule],
  templateUrl: './original-degree-dialog.component.html',
  styleUrls: ['./original-degree-dialog.component.scss'],
  providers: providerFactory(OriginalDegreeDialogComponent),
})
export class OriginalDegreeDialogComponent {
  degreeData: any;
  disabledField = false;
  constructor(
    private fb: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<OriginalDegreeDialogComponent>
  ) {
    if (this.data) {
      this.degreeData = this.data;
      if (this.data.disableAll) {
        this.disabledField = true;
      }
    }
  }

  save() {
    this.dialogRef.close(this.degreeData);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';

@Component({
  selector: 'self-service-license-request-foreign',
  templateUrl: './license-request-foreign.component.html',
  styleUrls: ['./license-request-foreign.component.scss'],
})
export class LicenseRequestForeignComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  cancel() {
    this.router.navigate(['/', 'home']);
  }

  save() {
    const completeDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `Do you want to save and proceed?`,
        btnLabel: 'Save (Draft)',
        cancelBtnLabel: 'Save & Proceed',
      },
    });

    completeDialog.componentInstance.saved.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/license', 'payment-channel']);
      }
    });
  }
}

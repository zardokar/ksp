import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CompleteDialogComponent, ConfirmDialogComponent } from '@ksp/shared/ui/dialog';

@Component({
  selector: 'ksp-foreign-license-detail',
  templateUrl: './foreign-license-detail.component.html',
  styleUrls: ['./foreign-license-detail.component.scss'],
})
export class ForeignLicenseDetailComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  cancel() {
    this.router.navigate(['/', 'foreign-license', 'list'])
  }

  onConfirmed() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      height: '175px',
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และส่งใบคำขอ ใช่หรือไม่? `,

      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      height: '175px',
      width: '350px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,

        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'foreign-license', 'list']);
      }
    });
  }
}
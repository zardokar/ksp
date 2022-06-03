import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';

@Component({
  selector: 'ksp-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  title = [
    ['อนุมัติ', 'ไม่อนุมัติ'],
    ['ใช้งาน', 'ไม่ใช้งาน'],
  ];
  header = ['สถานะการใช้งาน'];

  pageType = 1;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.pageType = Number(res['type']);
      console.log('res = ', this.pageType);
    });
  }

  cancel() {
    if (this.pageType === 1) {
      this.router.navigate(['/', 'user-approvement']);
    } else if (this.pageType === 2) {
      this.router.navigate(['/', 'user-management']);
    }
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      height: '175px',
      width: '350px',
      data: {
        title: `คุณต้องการบันทึกข้อมูล
        ใช่หรือไม่? `,
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
      height: '200px',
      width: '350px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,

        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        if (this.pageType === 1) {
          this.router.navigate(['/', 'user-approvement']);
        } else if (this.pageType === 2) {
          this.router.navigate(['/', 'user-management']);
        }
      }
    });
  }
}
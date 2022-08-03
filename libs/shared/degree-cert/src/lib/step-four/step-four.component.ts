import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormMode } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';

@Component({
  selector: 'ksp-degree-cert-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css'],
})
export class DegreeCertStepFourComponent {
  @Input() mode: FormMode = 'edit';
  @Input() formType = 'a';

  constructor(public dialog: MatDialog, private router: Router) {}

  uploadFiles1 = [
    'หนังสือนำส่ง+แบบคำขอรับรองปริญญาฯ',
    'มคอ.2 ตั้งแต่หน้าปกถึงหน้าสุดท้าย ฉบับที่มีการปรับล่าสุด',
    'แบบรายงานข้อมูลเพื่อการรับรองปริญญาตรีทางการศึกษา',
    'รายงานการประชุมในการเห็นชอบหรืออนุมัติหลักสูตรจากสภาสถาบัน',
    'เอกสารการผ่าน สป.อว. (กรณีผ่านแล้ว)',
    'อื่นๆ (ถ้ามี) (pdf. ไม่เกิน 2 MB 1 ไฟล์) (ตามไฟล์ข้อ 3 หัวข้อ 2.1 หน่วยงานที่รับผิดชอบหลักสูตรผลิตครู)',
    'เอกสาร/หลักฐานอ้างอิงอื่นๆ ถ้ามี (1)',
    'เอกสาร/หลักฐานอ้างอิงอื่นๆ ถ้ามี (2)',
    'ข้อมูล/เอกสารหลักฐานที่สถาบันจัดส่งเพิ่มเติมตามมติคณะอนุกรรมการ (รอบที่ 1)',
  ];

  uploadFiles2 = [
    'หนังสือนำส่ง+แบบคำขอรับรองปริญญาฯ',
    'มคอ.2 ตั้งแต่หน้าปกถึงหน้าสุดท้าย ฉบับที่มีการปรับล่าสุด',
    'แบบประเมินมาตรฐานหลักสูตร มาตรฐานการผลิตและมาตรฐานบัณฑิต โดยมีรายละเอียดข้อมูลตามมาตรฐานและเกณฑ์การรับรอง พร้อมเอกสารประกอบ',
    'ตารางวิเคราะห์เนื้อหาสาระ/สมรรถนะ ในรายวิชาที่เทียบกับมาตรฐานความรู้และประสบการณ์วิชาชีพ',
    'คำสั่งแต่งตั้งคณะกรรมการพัฒนาหลักสูตร',
    'เอกสารรายงานการวิพากษ์หลักสูตร และการนำไปใช้ปรับปรุงแก้ไขหลักสูตร',
    'สำเนาสัญญาจ้างหรือทะเบียนประวัติหรือหลักฐานการขอปฏิบัติการสอน',
    'เอกสาร/หลักฐานอ้างอิงอื่นๆ ถ้ามี (1)',
    'ข้อมูล/เอกสารหลักฐานที่สถาบันจัดส่งเพิ่มเติมตามมติคณะอนุกรรมการ (รอบที่ 1)',
  ];

  uploadFiles3 = [
    'หนังสือนำส่ง+แบบคำขอรับรองปริญญาฯ',
    'มคอ.2 ตั้งแต่หน้าปกถึงหน้าสุดท้าย ฉบับที่มีการปรับล่าสุด',
    'แบบประเมินมาตรฐานหลักสูตร มาตรฐานการผลิตและมาตรฐานบัณฑิต โดยมีรายละเอียดข้อมูลตามมาตรฐานและเกณฑ์การรับรอง พร้อมเอกสารประกอบ',
    'ตารางวิเคราะห์เนื้อหาสาระ/สมรรถนะ ในรายวิชาที่เทียบกับมาตรฐานความรู้และประสบการณ์วิชาชีพ',
    'คำสั่งแต่งตั้งคณะกรรมการพัฒนาหลักสูตร',
    'เอกสารรายงานการวิพากษ์หลักสูตร และการนำไปใช้ปรับปรุงแก้ไขหลักสูตร',
    'รายงานการประชุมในการเห็นชอบหรืออนุมัติหลักสูตรจากสภาสถาบัน',
    'เอกสาร/หลักฐานอ้างอิงอื่นๆ ถ้ามี (1)',
  ];

  uploadFiles4 = [
    'หนังสือนำส่ง+แบบคำขอรับรองปริญญาฯ',
    'มคอ.2 ตั้งแต่หน้าปกถึงหน้าสุดท้าย ฉบับที่มีการปรับล่าสุด',
    'แบบประเมินมาตรฐานหลักสูตร มาตรฐานการผลิตและมาตรฐานบัณฑิต โดยมีรายละเอียดข้อมูลตามมาตรฐานและเกณฑ์การรับรอง พร้อมเอกสารประกอบ',
    'ตารางวิเคราะห์เนื้อหาสาระ/สมรรถนะ ในรายวิชาที่เทียบกับมาตรฐานความรู้และประสบการณ์วิชาชีพ',
    'คำสั่งแต่งตั้งคณะกรรมการพัฒนาหลักสูตร',
    'เอกสารรายงานการวิพากษ์หลักสูตร และการนำไปใช้ปรับปรุงแก้ไขหลักสูตร',
    'รายงานการประชุมในการเห็นชอบหรืออนุมัติหลักสูตรจากสภาสถาบัน',
    'เอกสาร/หลักฐานอ้างอิงอื่นๆ ถ้ามี (1)',
  ];

  uploadFiles5 = [
    'หนังสือนำส่ง+แบบคำขอรับรองปริญญาฯ',
    'มคอ.2 ตั้งแต่หน้าปกถึงหน้าสุดท้าย ฉบับที่มีการปรับล่าสุด',
    'แบบประเมินมาตรฐานหลักสูตร มาตรฐานการผลิตและมาตรฐานบัณฑิต โดยมีรายละเอียดข้อมูลตามมาตรฐานและเกณฑ์การรับรอง พร้อมเอกสารประกอบ',
    'ตารางวิเคราะห์เนื้อหาสาระ/สมรรถนะ ในรายวิชาที่เทียบกับมาตรฐานความรู้และประสบการณ์วิชาชีพ',
    'คำสั่งแต่งตั้งคณะกรรมการพัฒนาหลักสูตร',
    'เอกสารรายงานการวิพากษ์หลักสูตร และการนำไปใช้ปรับปรุงแก้ไขหลักสูตร',
    'รายงานการประชุมในการเห็นชอบหรืออนุมัติหลักสูตรจากสภาสถาบัน',
    'เอกสาร/หลักฐานอ้างอิงอื่นๆ ถ้ามี (1)',
  ];

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        content: `วันที่ : 10 ตุลาคม 2565
        เลขที่ใบคำขอ : 12234467876543 `,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอหรือรหัสเข้าใช้งาน
        ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วัน`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'degree-cert']);
      }
    });
  }
}

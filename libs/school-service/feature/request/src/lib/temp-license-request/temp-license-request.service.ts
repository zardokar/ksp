import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LicenseDetailService {
  educationInfo = [
    '1.สำเนาปริญญาบัตรหรือสำเนาหนังสือรับรอง',
    '2.สำเนาใบรายนงานผลการศึกษา',
    '3.สำเนาหลักฐานการเปลี่ยนชื่อฯ (ถ้ามี)',
    '4.สำเนาหนังสือรับรองการเทียบวุฒิฯ (ถ้ามี)',
    '5.สำเนาเอกสารคำแปลวุฒิ (ถ้ามี)',
  ];

  teachingInfo = [
    '1.ตารางสอนรายบุคคล',
    '2.สำเนาสัญญาจ้าง',
    '3.หน้งสือรับรองการจ้างต่อ (ถ้ามี)',
    '4.สำเนาคำสั่งให้ไปปฏิบัติหน้าที่สอนฯ (ถ้ามี)',
  ];

  reasonInfo = [
    '1.หนังสือบันทึกชี้แจงเหตุผลความจำเป็น (ถ้ามี)',
    '2.หลักฐานการพัฒนาตนเอง',
  ];

  evidenceFiles = [
    'หนังสือนำส่งจากสถานศึกษา (ฉบับจริงและวันที่ออกหนังสือไม่เกิน 30 วัน)',
    'สำเนาหนังสือแต่งตั้ง ผอ. หรือ รอง ผอ.รักษาราชการแทนจากต้นสังกัด (กรณีรักษาการผู้อำนวยการ)',
    'หนังสือรับรองการจ้างต่อ (กรณีที่สัญญาจ้างปัจจุบันที่เหลือระยะเวลาการจ้างน้อยกว่า 30 วัน)',
    'สำเนาคำสั่งให้ไปปฏิบัติการสอนในสถานศึกษาจากต้นสังกัด หรือสำเนาหนังสือส่งตัวรับตัวจากต้นสังกัดถึงสถานศึกษา (กรณี จ้างโดย สพป./สพม./ต้นสังกัด)',
    'หนังสือบันทึกชี้แจงเหตุผลความจำเป็นของสถานศึกษาและปัญหาการพัฒนาตนเองไม่ทันตามกำหนดระยะเวลา(กรณีได้รับอนุญาตฯ ครบตามกำหนดระยะเวลา)',
    'รูปถ่าย 1 นิ้ว',
  ];
}
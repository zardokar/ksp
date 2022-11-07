import { ApproveUniOption, ListData, UniApproveProcess } from '@ksp/shared/interface';

export const ApproveStepStatusOption: ApproveUniOption[] = [
  {
    name: 'เครบถ้วน และถูกต้อง',
    value: 1,
  },
  {
    name: 'ไม่ครบถ้วน และไม่ถูกต้อง',
    value: 2,
  },
];

export const EUniApproveProcess: UniApproveProcess[] = [
  // ขั้นตอนที่ 1 ตรวจสอบข้อมูลและเอกสาร ลำดับที่ 1
  {
    requestType: 3,
    processId: 1,
    processName: 'ตรวจสอบเอกสาร',
    status: [
      { id: 1, sname: 'ครบถ้วน และถูกต้อง', ename: 'ครบถ้วน และถูกต้อง' },
      { id: 2, sname: 'ขอแก้ไข / เพิ่มเติม', ename: 'ขอแก้ไข / เพิ่มเติม' },
    ],
  },
  // ขั้นตอนที่ 2 ตรวจสอบข้อมูลและเอกสาร ลำดับที่ 2
  {
    requestType: 3,
    processId: 2,
    processName: 'ตรวจสอบเอกสาร',
    status: [
      { id: 1, sname: 'รอการตรวจสอบ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการตรวจสอบ', ename: 'ผ่านการตรวจสอบ' },
      { id: 3, sname: 'ไม่ผ่านการตรวจสอบ', ename: 'ไม่ผ่านการตรวจสอบ' },
    ],
  },

  //ขั้นตอนที่ 3 ประเมินและบันทึกผลการประเมินสภาพจริง
  {
    requestType: 3,
    processId: 3,
    processName: 'สร้างใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
      { id: 2, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
      { id: 3, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
    ],
  },
  //ขั้นตอนที่ 4 พิจารณาจำนวนนักศึกษาที่รับเข้าศึกษาแต่ละปีการศึกษา เจ้าหน้าที่สามารถทำการเปลี่ยนแปลงจำนวนนักศึกษาที่ทางมหาวิทยาลัยยื่นได้
  {
    requestType: 3,
    processId: 1,
    processName: 'สร้างใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
      { id: 2, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
      { id: 3, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
    ],
  },
  //ขั้นตอนที่ 5 บันทึกผลส่งพิจารณาเพื่อรับรอง และพิจารณาเพื่อไม่รับรอง เจ้าหน้าที่สามารถทำการบันทึกสถานะคำขอได้ 2 รูปแบบ
  {
    requestType: 3,
    processId: 1,
    processName: 'สร้างใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
      { id: 2, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
      { id: 3, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
    ],
  },

  //ขั้นตอนที่ 6 บันทึกผลการพิจารณารับรอง
  {
    requestType: 3,
    processId: 1,
    processName: 'สร้างใบคำขอ',
    status: [
      { id: 1, sname: 'รับรอง', ename: 'รับรอง' },
      { id: 2, sname: 'ไม่รับรอง', ename: 'ไม่รับรอง' },
      {
        id: 3,
        sname: 'ให้สถาบันแก้ไข / เพิ่มเติม',
        ename: 'ให้สถาบันแก้ไข / เพิ่มเติม',
      },
      { id: 4, sname: 'ส่งคืนหลักสูตร', ename: 'ส่งคืนหลักสูตร' },
      { id: 5, sname: 'ยกเลิกการรับรอง', ename: 'ยกเลิกการรับรอง' },
    ],
  },
  //ขั้นตอนที่ 7 ออกรหัสรับรองปริญญาและประกาศนียบตรทางการศึกษา
  {
    requestType: 3,
    processId: 7,
    processName: 'สร้างใบคำขอ',
    status: [{ id: 1, sname: 'ครบถ้วนถูกต้อง', ename: 'ครบถ้วนถูกต้อง' }],
  },
];
export const UniAdmissionStatus: ListData[] = [
  {
    name: 'ส่งคืนและยกเลิก',
    label: 'ส่งคืนและยกเลิก',
    value: '0'
  },
  {
    name: 'รอตรวจสอบ',
    label: 'รอตรวจสอบ',
    value: '1'
  },
  {
    name: 'แก้ไข',
    label: 'แก้ไข',
    value: '2'
  },
  {
    name: 'ตรวจสอบเรียบร้อย',
    label: 'ตรวจสอบเรียบร้อย',
    value: '3'
  }
];
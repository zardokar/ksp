export enum SelfServiceRequestSubType {
  'ครู' = 1,
  'ผู้บริหารสถานศึกษา' = 2,
  'ผู้บริหารการศึกษา' = 3,
  'ศึกษานิเทศก์' = 4,
  'อื่นๆ' = 5,
}

export const DEFAULT_REQUEST_TYPE_LIST = [
  {
    order: 1,
    licenseType: 'ครู',
    // count: 0,
    // approve: 0,
    // unApprove: 0,
    // urgent: 0,
  },
  {
    order: 2,
    licenseType: 'ครูชาวต่างชาติ',
    count: 0,
    approve: 0,
    unApprove: 0,
    urgent: 0,
  },
  {
    order: 3,
    licenseType: 'KSP Bundit',
    count: 0,
    approve: 0,
    unApprove: 0,
    urgent: 0,
  },
  {
    order: 4,
    licenseType: 'ผู้บริหารสถานศึกษา',
    // count: 0,
    // approve: 0,
    // unApprove: 0,
    // urgent: 0,
  },
  {
    order: 5,
    licenseType: 'ผู้บริหารการศึกษา',
    // count: 0,
    // approve: 0,
    // unApprove: 0,
    // urgent: 0,
  },
  {
    order: 6,
    licenseType: 'ศึกษานิเทศก์',
    // count: 0,
    // approve: 0,
    // unApprove: 0,
    // urgent: 0,
  },
];

export const SelfRequestType = [
  { id: 1, name: 'ขอขึ้นทะเบียนใบอนุญาตประกอบวิชาชีพ' },
  { id: 2, name: 'ขอต่ออายุใบอนุญาตประกอบวิชาชีพ' },
  { id: 3, name: 'ขอเปลี่ยนแปลง/แก้ไขใบอนุญาตประกอบวิชาชีพ' },
  { id: 4, name: 'ขอใบแทนใบอนุญาตประกอบวิชาชีพ' },
  { id: 5, name: 'ขอหนังสือรับรองความรู้' },
  { id: 6, name: 'ขอยื่นเทียบเคียงความรู้' },
  { id: 30, name: 'ขอคืนเงินค่าธรรมเนียม' },
  { id: 40, name: 'ขอรับรางวัลคุรุสภา' },
  { id: 41, name: 'ขอรับรางวัลครูภาษาไทยดีเด่น' },
  { id: 42, name: 'ขอรับรางวัลครูผู้สอนดีเด่นตามกลุ่มสาระการเรียนรู้' },
  { id: 43, name: 'ขอรับรางวัลคุรุสดุดี' },
  { id: 44, name: 'ขอรับรางวัลครูอาวุโส' },
  { id: 45, name: 'ขอรับรางวัลผลงานวิจัยของคุรุสภา' },
];

export enum SelfServiceRequestType {
  'ขอขึ้นทะเบียนใบอนุญาตประกอบวิชาชีพ' = '01',
  'ขอต่ออายุใบอนุญาตประกอบวิชาชีพ' = '02',
  'ขอเปลี่ยนแปลง/แก้ไขใบอนุญาตประกอบวิชาชีพ' = '03',
  'ขอใบแทนใบอนุญาตประกอบวิชาชีพ' = '04',
  'ขอหนังสือรับรองความรู้' = '05',
  'ขอยื่นเทียบเคียงความรู้' = '06',
  'ขอคืนเงินค่าธรรมเนียม' = '30',
  'ขอรับรางวัลคุรุสภา' = '40',
  'ขอรับรางวัลครูภาษาไทยดีเด่น' = '41',
  'ขอรับรางวัลครูผู้สอนดีเด่นตามกลุ่มสาระการเรียนรู้' = '42',
  'ขอรับรางวัลคุรุสดุดี' = '43',
  'ขอรับรางวัลครูอาวุโส' = '44',
  'ขอรับรางวัลผลงานวิจัยของคุรุสภา' = '45',
}

export enum SelfServiceRequestForType {
  'ชาวไทย' = 0,
  'ชาวต่างชาติ' = 1,
}

export const SelfServiceSelfDevelopActivityTiess = [
  {
    value: 0,
    label: `มีวุฒิเพิ่มขึ้นในสาขาที่เกี่ยวข้องกับการประกอบวิชาชีพทางการศึกษา`,
  },
  {
    value: 1,
    label: `เข้ารับการอบรมและได้รับวุฒิบัตรแสดงความชำนาญการในการประกอบวิชาชีพจากคุรุสภา`,
  },
  {
    value: 2,
    label: `ผ่านการอบรมหลักสูตรที่เกี่ยวข้องกับการปฏิบัติงานในหน้าที่`,
  },
  {
    value: 3,
    label: `ได้เลื่อนวิทยฐานะ หรืออยู่ระหว่างการพิจารณาประเมินให้มีหรือเลื่อนวิทยฐานะ`,
  },
  {
    value: 4,
    label: `เป็นวิทยากรที่เป็นประโยชน์ต่อการจัดการเรียนรู้หรือการจัดการศึกษา`,
  },
  {
    value: 5,
    label: `เขียนตำรา หรือบทความ หรือผลงานทางวิชาการที่เป็นประโยชน์ต่อการจัดการเรียนรู้หรือการจัดการศึกษา`,
  },
  {
    value: 6,
    label: `สร้างนวัตกรรมที่ใช้ในการจัดการเรียนรู้หรือที่เป็นประโยชน์ต่อการศึกษา`,
  },
  {
    value: 7,
    label: `ทำวิจัยที่เป็นประโยชน์ต่อการจัดการเรียนรู้และการจัดการศึกษา`,
  },
  {
    value: 8,
    label: `ได้รับรางวัลจากคุรุสภาหรือของหน่วยงานทางการศึกษาอื่น`,
  },
  {
    value: 9,
    label: `เข้าฟังการบรรยาย อภิปราย ประชุมปฏิบัติการ ประชุมสัมมนา หรืออื่นๆ โดยมีการลงทะเบียนและมีหลักฐานแสดงการเข้าร่วมกิจกรรมดังกล่าว`,
  },
  {
    value: 10,
    label: `ศึกษาดูงานที่เกี่ยวข้องกับการประกอบวิชาชีพทางการศึกษา`,
  },
  {
    value: 11,
    label: `จัดทำผลงานหรือกิจกรรมที่เป็นประโยชน์ต่อการจัดการเรียนรู้หรือการจัดการศึกษา`,
  },
];

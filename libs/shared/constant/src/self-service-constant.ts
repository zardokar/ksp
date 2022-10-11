export enum SelfServiceRequestSubType {
  'ครู' = 1,
  'ผู้บริหารสถานศึกษา' = 2,
  'ผู้บริหารการศึกษา' = 3,
  'ศึกษานิเทศก์' = 4,
  'อื่นๆ' = 5,
}

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
    label: `การศึกษาให้มีวุฒิเพิ่มขึ้นในสาขาเกี่ยวข้องกับการประกอบวิชาชีพทางการศึกษา ทั้งในระดับปริญญา และระดับบัณฑิตศึกษา`,
    //ActivityAddDegreeComponent
  },
  {
    value: 1,
    label: `การเข้าฟังการบรรยาย การอภิปราย การประชุมวิชาการ การประชุมปฏิบัติการ การประชุมสัมมนา หรือการประชุมในรูปแบบอื่นๆที่คุรุใสภาให้การรับรอง`,
    //ActivitySeminarComponent
  },
  {
    value: 2,
    label: `การฝึกอบรมในหลักสูตรที่เกี่ยวข้องกับวิชาชีพ หรือวิชาการเฉพาะด้าน`,
  },
  {
    value: 3,
    label: `การเรียนรู้ด้วยตนเองในเรื่องที่เกี่ยวข้องกับวิชาชีพ หรือวิชาการเฉพาะด้าน จากบทความทางวิชาชีพ หรือวิชาการเฉพาะด้าน หรือการเรียนรู้ผ่านเทคโนโลยีสารสนเทศ เช่นบทความวิชาการ`,
  },
  {
    value: 4,
    label: `การศึกษาดูงานที่เกี่ยวข้องกับวิชาชีพทางการศึกษา ทั้งในประเทศ หรือต่างประเทศ`,
    //ActivityStudyTourComponent
  },
  {
    value: 5,
    label: `การทำวิจัยในเรื่องที่เป็นประโยชน์ต่อการจัดการเรียนรู้และการจัดการศึกษา `,
    //ActivityResearchComponent
  },
  {
    value: 6,
    label: `การสร้างสื่อการศึกษา พร้อมแบบทดสอบเพื่อการศึกษาหรือเรียนรู้ด้วยตนเอง ทั้งในรูปแบบเอกสาร และสื่ออิเล็กทรอนิกส์ เช่ย บทความ online , e-learning , E-book เป็นต้น`,
    //ActivityLearningMaterialComponent
  },
  {
    value: 7,
    label: `การเข้าร่วมกิจกรรมพัฒนาวิชาชีพ แบบชุมชนแห่งการเรียนรู้`,
  },
  {
    value: 8,
    label: `การเขียนบทความทางวิชาชีพ และได้รับการตีพิมพ์เผยแพร่ต่อสาธารณชน เช่น วารสารวิทยาจารย์ เป็นต้น`,
  },
  {
    value: 9,
    label: `การแต่งตำรา หรือหนังสือ ในเรื่องที่เกี่ยวข้องกับวิชาชีพ หรือวิชาการเฉพาะด้านที่เกี่ยวข้องกับวิชาชีพ`,
    //ActivityWriteBookComponent
  },
  {
    value: 10,
    label: `การสร้างผลงานทางวิชาการ เช่น ผลงานวิจัย ผลงานนวัตกรรมที่ใช้ในการเรียนรู้ หรือ ที่เป็นประโยชน์ต่อการศึกษา`,
  },
  {
    value: 11,
    label: `การเป็นวิทยากร ผู้บรรยาย ผู้อภิปราย หรือผู้อภิปรายร่วมในกิจกรรมที่เกี่ยวข้องกับวิชาชีพ หรือวิชาการเฉพาะด้าน`,
    //ActivityLectureRegisterComponent
  },
  {
    value: 12,
    label: `การเป็นครูพี่เลี้ยง ผู้บริหารพี่เลี้ยง หรือผู้ควบคุมการฝึกปรัสบการณ์วิชาชีพทางการศึกษาสำหรับนักศึกษาในหลักสูตรประกาศนียบัตรบัณฑิต หรือปริญญาทางการศึกษา`,
  },
  {
    value: 13,
    label: `การผ่านการประเมิน เพื่อให้มีหรือเลื่อน วิทยฐานะที่สูงขึ้น หรือผ่านการรับรองความชำนาญในการประกอบวิชาชีพตามหลักเกณฑ์ที่คุรุสภากำหนด`,
  },
  {
    value: 14,
    label: `การปฏิบัติการสอนดีเด่นจนได้รับรางวัล การได้รับคัดเลือกให้ได้รางวัลของคุรุสภา หรือรางวัลที่เป็นประโยชน์ต่อการจัดการศึกษา`,
  },
  {
    value: 15,
    label: `กิจกรรมอื่นๆ ที่คณะกรรมการรับรอง`,
  },
];

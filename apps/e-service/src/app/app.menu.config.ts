import { MenuConfig } from '@ksp/shared/interface';

export const ethicsMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'การกล่าวหา/กล่าวโทษ',
    path: '',
    isExpanded: false,
    subMenuName: 'ethics',
    subMenu: [
      {
        path: '/accusation',
        label: 'บันทีกการกล่าวหา/กล่าวโทษ',
      },
      {
        path: '/investigation',
        label: 'บันทีกการสืบสวนข้อเท็จจริง',
      },
      {
        path: '/inquiry',
        label: 'บันทีกการสอบสวน',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'เผยแพร่การกล่าวหา/กล่าวโทษ',
    path: '/publish/list',
    subMenuName: 'publish',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'รายงาน',
    path: '',
  },
];

export const standardMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรองปริญญาและประกาศนียบัตร',
    path: '',
    isExpanded: false,
    subMenuName: 'degree-cert',
    subMenu: [
      {
        path: `/degree-cert/list/1`,
        label: 'รายการใบคำขอรับรองปริญญาและประกาศนียบัตร',
      },
      {
        path: `/degree-cert/list/2`,
        label: 'ประเมินหลักสูตรและโครงสร้างหลักสูตร',
      },
      {
        path: `/degree-cert/list/3`,
        label: 'พิจารณาและออกใบรับรองปริญญาและประกาศนียบัตร',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอส่งรายชื่อผู้เข้าและผู้สำเร็จการศึกษา',
    path: '',
    isExpanded: false,
    subMenuName: 'gradute-list',
    subMenu: [
      {
        path: '/aa',
        label: 'รายการใบคำขอส่งรายชื่อผู้เข้าศึกษา',
      },
      {
        path: '/bb',
        label: 'รายการใบคำขอส่งรายชื่อผู้สำเร็จการศึกษา',
      },
      {
        path: '/cc',
        label: 'พิจารณารับข้อมูลผู้เข้าและผู้สำเร็จการศึกษา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอเทียบโอนความรู้',
    path: '',
    isExpanded: false,
    subMenuName: 'request-knowledge',
    subMenu: [
      {
        path: '/aa',
        label: 'รายการใบคำขอเทียบโอนความรู้',
      },
      {
        path: '/bb',
        label: 'บัญชีรายชื่อและนำเสนอขอเทียบโอนความรู้',
      },
      {
        path: '/cc',
        label: 'พิจารณารับรองและพิมพ์วุฒิบัตร',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรองคุณวุฒิทางการศึกษา',
    path: '',
    isExpanded: false,
    subMenuName: 'request-degree',
    subMenu: [
      {
        path: '/aa',
        label: 'รายการใบคำรับรองคุณวุฒิทางการศึกษา',
      },
      {
        path: '/bb',
        label: 'พิจารณารับรองคุณวุฒิทางการศึกษา',
      },
      {
        path: '/cc',
        label: 'บัญชีรายชื่อและพิมพ์หนังสือคุณวุฒิทางการศึกษา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'นำเข้าและบันทึกผลการทดสอบ',
    path: '/import-test',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'นำเข้าและบันทึกผลการประเมินสมรรถนะทางวิชาชีพครู',
    path: '/import-performance',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ทะเบียนข้อมูล',
    path: '',
    isExpanded: false,
    subMenuName: 'data',
    subMenu: [
      {
        path: '/aa',
        label: 'ทะเบียนรหัสรับรองปริญญาและประกาศนียบัตร',
      },
      {
        path: '/bb',
        label: 'ทะเบียนรายชื่อนักศึกษาเข้าเรียนและจบการศึกษา',
      },
      {
        path: '/cc',
        label: 'ทะเบียนผู้ผ่านการทดสอบ',
      },
      {
        path: '/cc',
        label: 'ทะเบียนผู้ผ่านการประเมินสมรรถนะทางวิชาชีพครู',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'รายงาน',
    path: '',
    isExpanded: false,
    subMenuName: 'report',
    subMenu: [
      {
        path: '/aa',
        label: 'รายงานยื่นใบคำขอ(แยกตามประเภท)',
      },
      {
        path: '/bb',
        label: ' รายงานรายชื่อปริญญาและประกาศนียบัตรที่ได้รับการรับรอง',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอรหัสเข้าใช้งานระบบ',
    path: '',
    isExpanded: false,
    subMenuName: 'user-approvement',
    subMenu: [
      {
        path: 'xxx',
        label: 'ระบบบริการสถาบันผลิตครู (Uni Service)',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ระบบบริหารจัดการผู้ใช้งาน',
    path: '',
    isExpanded: false,
    subMenuName: 'user-manage',
    subMenu: [
      {
        path: '/aa',
        label: 'ผู้ใช้งานระบบบริการสถาบันผลิตครู (Uni Service)',
      },
    ],
  },
];

//ใบอนุญาตต่างๆ
export const licenseMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอรับใบอนุญาตประกอบวิชาชีพ',
    path: '',
    isExpanded: false,
    subMenuName: 'license',
    subMenu: [
      {
        path: '/request-license/approve-list',
        label: 'รายการใบคำขอรับใบอนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/request-license/approve-detail',
        label: 'รับรองใบอนุญาตประกอบวิชาชีพ',
      },
    ],
  },
  /* {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอรับใบอนุญาตประกอบวิชาชีพ (ชาวต่างชาติ)',
    path: '',
    isExpanded: false,
    subMenuName: 'license-foreign',
    subMenu: [
      {
        path: '/license/list',
        label: 'รายการใบคำขอรับใบอนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/license/approve-list',
        label: 'รับรองใบอนุญาตประกอบวิชาชีพ',
      },
    ],
  }, */
  /* {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'สร้างเลขใบอนุญาตประกอบวิชาชีพ',
    path: 'xxx',
  }, */
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอต่ออายุใบอนุญาตประกอบวิชาชีพ',
    path: '',
    isExpanded: false,
    subMenuName: 'renew-thai',
    subMenu: [
      {
        path: '/renew-license/approve-list',
        label: 'รายการใบคำขอรับใบอนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/renew-license/approve-detail',
        label: 'รับรองใบอนุญาตประกอบวิชาชีพ',
      },
    ],
  },
  /* {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอต่ออายุใบอนุญาตประกอบวิชาชีพ(ชาวต่างชาติ)',
    path: '',
    isExpanded: false,
    subMenuName: 'temp-thai',
    subMenu: [
      {
        path: '/license/list',
        label: 'รายการใบคำขอรับใบอนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/license/approve-list',
        label: 'รับรองใบอนุญาตประกอบวิชาชีพ',
      },
    ],
  }, */
  /* {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'สร้างเลขในอนุญาตประกอบวิชาชีพ',
    path: '',
  }, */
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาตประกอบวิชาชีพ',
    path: '',
    isExpanded: false,
    subMenuName: 'temp-thai',
    subMenu: [
      {
        path: '/temp-license/list',
        label: 'ตรวจสอบใบคำขออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
        params: { subtype: 1 },
      },
      {
        path: '/temp-license/approve-list',
        label: 'พิจารณารับรองหนังสืออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
        //params: { subtype: 1 },
      },
    ],
  },
  /* {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาต (ชาวต่างชาติ)',
    path: '',
    isExpanded: false,
    subMenuName: 'temp-foreign',
    subMenu: [
      {
        path: '/temp-license/list',
        label: 'รายการใบคำขออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
        params: { subtype: 5 },
      },
      {
        path: '/temp-license/approve-list',
        label: 'พิจารณารับรองหนังสืออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
        params: { subtype: 5 },
      },
    ],
  }, */
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอเปลี่ยนแปลง/แก้ไขใบอนุญาต',
    path: '',
    isExpanded: false,
    subMenuName: 'edit-thai',
    subMenu: [
      {
        path: '/foreign-license/list',
        label: 'ตรวจสอบใบคำขอเลขคุรุสภาสำหรับชาวต่างชาติ',
      },
      {
        path: '/temp-license/approve-detail',
        label: 'พิจารณารับรองเลขคุรุสภาสำหรับชาวต่างชาติ',
      },
    ],
  },
  /* {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอเปลี่ยนแปลง/แก้ไขใบอนุญาต (ชาวต่างชาติ)',
    path: '',
    isExpanded: false,
    subMenuName: 'edit-foreign',
    subMenu: [
      {
        path: '/foreign-license/list',
        label: 'ตรวจสอบใบคำขอเลขคุรุสภาสำหรับชาวต่างชาติ',
      },
      {
        path: '/xxx',
        label: 'พิจารณารับรองเลขคุรุสภาสำหรับชาวต่างชาติ',
      },
    ],
  }, */
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอใบแทนใบอนุญาตประกอบวิชาชีพ',
    path: '',
    isExpanded: false,
    subMenuName: 'sub-license',
    subMenu: [
      {
        path: '/xxx',
        label: 'รายการใบคำขอ',
      },
      {
        path: '/temp-license/approve-detail',
        label: 'พิจารณา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอหนังสือรับรองความรู้',
    path: '',
    isExpanded: false,
    subMenuName: 'confirm',
    subMenu: [
      {
        path: '/xxx',
        label: 'รายการใบคำขอ',
      },
      {
        path: '/temp-license/approve-detail',
        label: 'พิจารณา',
      },
    ],
  },
  /* {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอเทียบเคียงความรู้',
    path: '',
    isExpanded: false,
    subMenuName: 'xxx',
    subMenu: [
      {
        path: '/xxx',
        label: 'รายการใบคำขอ',
      },
      {
        path: '/xxx',
        label: 'พิจารณา',
      },
    ],
  }, */
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอเลขคุรุสภาสำหรับชาวต่างชาติ',
    path: '',
    isExpanded: false,
    subMenuName: 'foreign-id',
    subMenu: [
      {
        path: '/foreign-license/list',
        label: 'ตรวจสอบใบคำขอเลขคุรุสภาสำหรับชาวต่างชาติ',
      },
      {
        path: '/temp-license/approve-detail',
        label: 'พิจารณารับรองเลขคุรุสภาสำหรับชาวต่างชาติ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'กิจกรรมพัฒนาตนเอง',
    path: '',
    isExpanded: false,
    subMenuName: 'activities',
    subMenu: [
      {
        path: '/xxx',
        label: 'รายการ',
      },
      {
        path: '/temp-license/approve-detail',
        label: 'พิจารณา',
      },
    ],
  },
  /* {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ข้อมูลลักษณะต้องห้ามของผู้ขอใบอนุญาตประกอบวิชาชีพ',
    path: '',
    isExpanded: false,
    subMenuName: 'forbidden',
    subMenu: [
      {
        path: '/xxx',
        label: 'บันทึก',
      },
      {
        path: '/xxx',
        label: 'พิจารณา',
      },
    ],
  }, */
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ทะเบียนข้อมูล',
    path: '',
  },
  /* {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'งานรับ-ส่งเอกสารใบอนุญาต',
    path: '',
  }, */
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'รายงาน',
    path: '',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอรหัสเข้าใช้งานระบบ',
    path: '',
    isExpanded: false,
    subMenuName: 'user-approvement',
    subMenu: [
      {
        path: '/approve-new-user',
        label: 'ระบบบริการด้วยตนเอง (self Service)',
      },
      {
        path: '/school/new-user',
        label: 'ระบบบริการหน่วยงานทางการศึกษา (School Service)',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/people.svg',
    label: 'บริหารจัดการผู้ใช้งาน',
    path: '',
    isExpanded: false,
    subMenuName: 'user-management',
    subMenu: [
      {
        path: '/manage-current-user',
        label: 'ผู้ใช้งานระบบบริการด้วยตนเอง (self Service)',
      },
      {
        path: '/school/current-user',
        label: 'ผู้ใช้งานระบบบริการหน่วยงานทางการศึกษา (School Service)',
      },
    ],
  },
];

export const professionalMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรางวัลคุรุสภา',
    path: '',
    subMenuName: 'reward1',
    subMenu: [
      {
        path: '/xxx',
        label: 'รายการ',
      },
      {
        path: '/xxx',
        label: 'พิจารณา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรางวัลครูภาษาไทยดีเด่น',
    path: '',
    subMenuName: 'reward2',
    subMenu: [
      {
        path: '/xxx',
        label: 'รายการ',
      },
      {
        path: '/xxx',
        label: 'พิจารณา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรางวัลครูผู้สอนดีเด่น',
    path: '',
    subMenuName: 'reward3',
    subMenu: [
      {
        path: '/xxx',
        label: 'รายการ',
      },
      {
        path: '/xxx',
        label: 'พิจารณา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรางวัลคุรุสดุดี',
    path: '',
    subMenuName: 'reward4',
    subMenu: [
      {
        path: '/xxx',
        label: 'รายการ',
      },
      {
        path: '/xxx',
        label: 'พิจารณา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรางวัลผลงานวิจัยของคุรุสภา',
    path: '',
    subMenuName: 'reward5',
    subMenu: [
      {
        path: '/xxx',
        label: 'รายการ',
      },
      {
        path: '/xxx',
        label: 'พิจารณา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรางวัลครูอาวุโส',
    path: '',
    subMenuName: 'reward6',
    subMenu: [
      {
        path: '/xxx',
        label: 'รายการ',
      },
      {
        path: '/xxx',
        label: 'พิจารณา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม',
    path: '',
    isExpanded: false,
    subMenuName: 'osoi',
    subMenu: [
      {
        path: '/one-school-one-innovation/list',
        label: 'รายการใบคำขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม',
      },
      {
        path: '/one-school-one-innovation/approve',
        label: 'พิจารณารางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'รายงาน',
    path: '',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ตั้งค่า',
    path: '',
  },
];

export const refundFeeMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'รายการชำระเงินค่าธรรมเนียม',
    path: '',
    isExpanded: false,
    subMenuName: 'pay',
    subMenu: [
      {
        path: '/xxx',
        label: 'รายการใบเสร็จรับเงิน',
      },
      {
        path: '/xxx',
        label: 'รายการใบนำส่งเงิน',
      },
      {
        path: '/xxx',
        label: 'รายการใบประกอบใบนำส่งเงิน',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'รายการขอคืนเงินค่าธรรมเนียม',
    path: '',
    isExpanded: false,
    subMenuName: 'refund',
    subMenu: [
      {
        path: '/refund/list',
        label: 'รายการใบขอคืนค่าธรรมเนียม',
      },
      {
        path: '/refund/detail',
        label: 'บัญชีรายชื่อและอนุมัติการคืนค่าธรรมเนียม',
      },
      {
        path: '/refund/approve',
        label: 'ตรวจสอบและบันทึกสถานะการคืนค่าธรรมเนียม',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'นำเข้าและบันทึกค่าธรรมเนียม',
    path: '',
    isExpanded: false,
    subMenuName: 'import',
    subMenu: [
      {
        path: '/xxx',
        label: 'นำเข้าและบันทึก (ธนาคารกรุงไทย)',
      },
      {
        path: '/xxx',
        label: 'นำเข้าและบันทึก (Counter Service) ',
      },
      {
        path: '/xxx',
        label: 'นำเข้าและบันทึก (ไปรษณีย์ไทย) ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'รายงาน',
    path: '',
  },
];

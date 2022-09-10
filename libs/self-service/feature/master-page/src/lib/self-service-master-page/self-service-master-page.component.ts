import { Component } from '@angular/core';
import { MenuConfig } from '@ksp/shared/interface';

@Component({
  templateUrl: './self-service-master-page.component.html',
  styleUrls: ['./self-service-master-page.component.scss'],
})
export class SelfServiceMasterPageComponent {
  menuConfig: MenuConfig[];

  constructor() {
    this.menuConfig = menu;
  }
}

export const menu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/home.svg ',
    label: 'หน้าแรก',
    path: 'home',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ยื่นใบคำขอ',
    path: '',
    subMenuName: 'request',
    subMenu: [
      {
        label: 'ขอขึ้นทะเบียนใบอนุญาตประกอบวิชาชีพ',
        path: 'license/teacher',
      },
      {
        label: 'ขอต่ออายุใบอนุญาตประกอบวิชาชีพ',
        path: 'renew-license/request',
      },
      /* {
        label: 'ขอเปลี่ยนแปลง/แก้ไขใบอนุญาตประกอบวิชาชีพ',
        path: 'license/edit',
      }, */
      {
        label: 'ขอใบแทนใบอนุญาตประกอบวิชาชีพ',
        path: 'substitute-license/request',
      },
      {
        label: 'ขอหนังสือรับรองความรู้',
        path: 'transfer-knowledge/request',
      },
      {
        label: 'ขอยื่นเทียบเคียงความรู้',
        path: 'compare-knowledge/request',
      },
      {
        label: 'ขอคืนเงินค่าธรรมเนียม',
        path: 'refund-fee/request',
      },
      {
        label: 'ขอรับรางวัลการยกย่องเชิดชูเกียรติ',
        path: 'license/xxx',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบอนุญาตประกอบวิชาชีพ',
    path: 'xxx',
  },
  {
    icon: 'assets/images/icon-sidenav/event.svg',
    label: 'กิจกรรมการพัฒนาตัวเอง',
    path: 'self-improvement/request',
  },
  {
    icon: 'assets/images/icon-sidenav/reward.svg',
    label: 'รางวัลของฉัน',
    path: 'reward/request',
  },
  {
    icon: 'assets/images/icon-sidenav/people.svg',
    label: 'ข้อมูลของฉัน',
    path: '',
    subMenuName: 'my-info',
    subMenu: [
      {
        label: 'ข้อมูลส่วนตัว',
        path: 'my-info/person-info',
      },
      {
        label: 'ที่อยู่',
        path: 'my-info/address-info',
      },
      {
        label: 'สถานที่ทำงาน',
        path: 'my-info/workplace-info',
      },
      {
        label: 'ข้อมูลการศึกษา',
        path: 'my-info/education-info',
      },
      {
        label: 'ข้อมูลประสบการณ์วิชาชีพ',
        path: 'my-info/profession-experience',
      },
      {
        label: 'ข้อมูลผลการประเมินสมรรถนะ',
        path: 'my-info/performance-result',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ประวัติการชำระเงินและใบเสร็จรับเงิน',
    path: 'my-info/payment-history',
  },
];

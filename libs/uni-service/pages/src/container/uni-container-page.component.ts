import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SelfServiceUiModule } from '@ksp/self-service/ui';
import { MenuConfig } from '@ksp/shared/interface';
import { SharedMenuModule, TopNavComponent } from '@ksp/shared/menu';
import { getCookie } from '@ksp/shared/utility';

@Component({
  selector: 'uni-service-container-page',
  templateUrl: './uni-container-page.component.html',
  styleUrls: ['./uni-container-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SelfServiceUiModule,
    SharedMenuModule,
    TopNavComponent,
  ],
})
export class UniContainerPageComponent implements OnInit {
  menuConfig: MenuConfig[] = [];
  header = '';
  subHeader = '';
  menu: MenuConfig[] = [
    {
      icon: 'assets/images/icon-sidenav/home.svg ',
      label: 'หน้าแรก',
      path: '/home',
      permission: '1',
    },
    {
      icon: 'assets/images/icon-sidenav/paper.svg',
      label: 'ยื่นแบบคำขอ',
      path: '',
      permission: '',
      subMenu: [
        {
          path: '/degree-cert',
          label: 'ขอรับรองปริญญาและประกาศนียบัตร',
          permission: '1',
        },
        {
          path: '/student-list',
          label: 'ขอยื่นรายชื่อผู้เข้าศึกษา และผู้สำเร็จการศึกษา',
          permission: '2',
        },
        {
          path: '/edit-degree-cert',
          label: 'ขอยื่นเปลี่ยนแปลงรายละเอียดปริญญาและประกาศนียบัตรทางการศึกษา',
          permission: '1',
        },
        {
          path: '/edit-student-list',
          label: 'ขอเปลี่ยนแปลงรายละเอียดรายชื่อผู้เข้าและผู้สำเร็จการศึกษา',
          permission: '2',
        },
        {
          path: '/foreign-student-id',
          label: 'ขอสร้างเลขประจำตัวคุรุสภาสำหรับนักศึกษาชาวต่างชาติ',
          permission: '2',
        },
      ],
      subMenuName: 'license',
      isExpanded: false,
    },
    {
      icon: 'assets/images/icon-sidenav/display.svg',
      label: 'ทะเบียนข้อมูล',
      path: '/degree-cert-list',
      permission: '1,2',
      // subMenu: [
      //   {
      //     path: '/xxx',
      //     label: 'ทะเบียนข้อมูลหลักสูตรที่รับรองปริญญาและประกาศนียบัตร',
      //     permission: '1,2',
      //   },
      //   {
      //     path: '/xxx',
      //     label: 'ข้อมูลรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา',
      //     permission: '1,2',
      //   },
      //   {
      //     path: '/xxx',
      //     label: 'ข้อมูลผลการทดสอบ',
      //     permission: '1,2',
      //   },
      //   {
      //     path: '/xxx',
      //     label: 'ข้อมูลผลการประเมินสมรรถนะ',
      //     permission: '1,2',
      //   },
      // ],
      subMenuName: 'data',
      isExpanded: false,
    },
    {
      icon: 'assets/images/icon-sidenav/file-earmark-text-fill.svg',
      label: 'รายงาน',
      path: '',
      permission: '',
      subMenuName: 'report',
      isExpanded: false,
      subMenu: [
        {
          label:
            'รายชื่อสถาบันที่ได้รับการรับรองปริญญาตรีทางการศึกษา (หลักสูตร 4 ปี) และปริญญาตรีทางการศึกษา (หลักสูตร 5 ปี)',
          path: '/report/uni-degree-report',
          params: { subtype: 1 }
        },
        {
          label:
            'รายชื่อสถาบันที่ได้รับการรับรองประกาศนียบัตรบัณฑิตวิชาชีพครู และประกาศนียบัตรบัณฑิตทางการบริหารการศึกษา',
          path: '/report/uni-degree-report',
          params: { subtype: 2 }
        },
        {
          label:
            'รายชื่อสถาบันที่ได้รับการรับรองปริญญาโททางการศึกษา (วิชาชีพครู และวิชาชีพบริหาร) และปริญญาเอกทางการศึกษา (วิชาชีพครู และวิชาชีพบริหาร)',
            path: '/report/uni-degree-report',
            params: { subtype: 3 }
        },
        {
          label:
            'รายงานหลักสูตร/ปริญญา ที่คุรุสภาให้การรับรอง (ขั้นสูง)',
          path: '/report/uni-degree-report',
          params: { subtype: 4 }
        },
        {
          label:
            'รายงานข้อมูลนักศึกษา',
          path: '/report/uni-report',
          params: { subtype: 1 }
        },
        {
          label:
            'รายงานรายชื่อผู้เข้าศึกษา',
          path: '/report/uni-report',
          params: { subtype: 2 }
        },
        {
          label:
            'รายงานรายชื่อผู้สำเร็จศึกษา',
          path: '/report/uni-report',
          params: { subtype: 3 }
        },
        {
          label:
            'รายงานสถิติยอดตามหลักสูตรและมหาวิทยาลัย',
          path: '/report/uni-report',
          params: { subtype: 4 }
        },
        {
          label:
            'รายงานสถิติจำนวนผู้เข้าศึกษา แยกตามระดับปริญญาและเลือกปีการศึกษา',
          path: '/report/uni-report',
          params: { subtype: 5 }
        },
        {
          label:
            'รายงานสถิติจำนวนผู้สำเร็จศึกษา แยกตามระดับปริญญาและเลือกปีการศึกษา',
          path: '/report/uni-report',
          params: { subtype: 6 }
        },
      ]
    },
    {
      label: 'ออกจากระบบ',
      path: '',
      permission: '',
    },
    /* {
      icon: 'assets/images/icon-sidenav/gear-fill.svg',
      label: 'ตั้งค่า',
      path: '',
    }, */
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const permissionright = getCookie('permission');
    this.menuConfig = this.menu.map((data) => {
      if (data.subMenu) {
        data.subMenu = data.subMenu.filter((data) => {
          return permissionright?.includes(data?.permission || '');
        });
      }
      return data;
    });
    this.route.data.subscribe((data) => {
      this.header = data['header'];
      this.subHeader = data['subHeader'];
    });
  }
}

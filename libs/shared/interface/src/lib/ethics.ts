import { Route } from '@angular/router';
import { ListData } from './input-type';
import { FileGroup } from './ksp-file';
import { MenuConfig } from './ksp-menu-config';
export type EthicsMode = 'accusation' | 'investigation' | 'inquiry' | 'publish' | 'confirmation';

export interface EthicsCustomRouteData {
  menuConfig: MenuConfig[];
  headerLabel: string;
  headerDetail?: string;
  ethicsMode?: EthicsMode;
}

export interface EthicsCustomRoute extends Route {
  data?: EthicsCustomRouteData;
}
export class Ethics {
  id?: string | null = null;
  ethicsno: string | null = null;

  processid: string | null = '1';

  accuserinfo: string | null = null;
  licenseinfo: string | null = null;
  licenseno: string | null = null;
  addressinfo: string | null = null;
  workplaceinfo: string | null = null;
  idcardno: string | null = '999999999';
  passportno: string | null = null;
  prefixth: string | null = null;
  firstnameth: string | null = null;
  lastnameth: string | null = null;
  prefixen: string | null = null;
  firstnameen: string | null = null;
  lastnameen: string | null = null;
  birthdate: string | null = null;
  sex: string | null = null;
  email: string | null = null;
  phone: string | null = null;
  accusationblackno: string | null = null;
  accusationtype: string | null = null;
  accusationincidentdate: string | null = null;
  accusationincidentplace: string | null = null;
  accusationcondemnationtype: string | null = null;
  accusationcondemnation: string | null = null;
  accusationissuedate: string | null = null;
  accusationdetail: string | null = null;
  accusationpunishmentdetail: string | null = null;
  accusationviolatedetail: string | null = null;
  accusationassignofficer: string | null = null;
  accusationassigndate: string | null = null;
  accusationfile: string | null = null;
  accusationconsideration: string | null = null;
  accusedinfo: string | null = null;
  accusationaction: string | null = null;

  investigationaccusedinformeddate: string | null = null;
  investigationaccusedclarifieddate: string | null = null;
  investigationorderno: string | null = null;
  investigationorderdate: string | null = null;
  investigationsubcommittee: string | null = null;
  investigationdate: string | null = null;
  investigationreportdate: string | null = null;
  investigationreport: string | null = null;
  investigationfile: string | null = null;
  investigationresult: string | null = null;

  investigationrecognizedate: string | null = null;
  investigationexplaindate: string | null = null;
  investigationnotificationdate: string | null = null;
  investigationaccusedrecognizedate: string | null = null;
  investigationaction: string | null = null;
  investigationnotificationdetail: string | null = null;
  investigationdetail: string | null = null;
  investigationevidencefile: string | null = null;

  considerationaction: string | null = null;
  considerationnotificationdate: string | null = null;
  considerationrecognizedate: string | null = null;
  considerationoverruledate: string | null = null;
  considerationcause: string | null = null;

  // allegation: string | null = null;
  // allegationinformdate: string | null = null;
  // allegationaccusedinformdate: string | null = null;

  licensesuspension: string | null = null;
  inquiryorderno: string | null = null;
  inquiryorderdate: string | null = null;
  inquirysubcommittee: string | null = null;
  inquiryexplaindate: string | null = null;
  inquiryjbdate: string | null = null;
  inquiryreport: string | null = null;
  inquiryfile: string | null = null;
  inquiryresult: string | null = null;
  inquerymeetinghistory: string | null = null;
  inquerylicensestatus: string | null = null;
  inquerylicensestatusnotificationdate: string | null = null;
  inquerylicensestatusaccusedrecognizedate: string | null = null;
  inquerylicensesuspendnotificationdate: string | null = null;
  inquerylicensesuspendrecognizedate: string | null = null;
  inquerynotificationdate: string | null = null;

  resultredno: string | null = null;
  resultblackno: string | null = null;
  resultcomitteeno: string | null = null;
  resultcomitteedate: string | null = null;
  resultcomitteefile: string | null = null;
  resulttoaccuserdate: string | null = null;
  resulttoaccuserfile: string | null = null;
  resulttoschooldate: string | null = null;
  resulttoschoolfile: string | null = null;
  resulttoaccuseddate: string | null = null;
  resulttoaccusedfile: string | null = null;
  resultdetail: string | null = null;
  resultstartsuspendlicensedate: string | null = null;
  resultendsuspendlicensedate: string | null = null;
  resulttoaccusednotificationdate: string | null = null;
  resultacademicname: string | null = null;
  resultaffiliationname: string | null = null;
  resulttoschoolnotificationdate: string | null = null;

  publishstatus: string | null = null;
  publishdate: string | null = null;
}

export const defaultEhicsMember: EhicsMember = {
  idcardno: null,
  accusertype: null,
  groupname: null,
  address: null,
  prefix: null,
  fullname: null,
  // firstname: null,
  // lastname: null,
  phone: null,
};

export const defaultSubcommittee: EhicsSubcommittee = {
  idcardno: null,
  idnumber: null,
  positioncommittee: null,
  prefix: null,
  firstname: null,
  lastname: null,
  position: null,
  bureau: null,
  bureauname: null,
};

export const defaultAccused: Ehicsaccused = {
  id: null,
  licenseno: null,
  identitynumber: null,
  usertype: null,
  titlethid: null,
  nameth: null,
  lastnameth: null,
  phonenumber: null,
  certificatestartdate: null,
  certificateenddate: null,
  bureau: null
};

export const defaultCondemnation: EhicsCondemnation = {
  condemnationtype:  null,
  condemnationdetail: null
};

export const defaultAccusationaction: EhicsAccusationaction = {
  self: null,
  profession: null,
  service: null,
  coworkers: null,
  society: null,
}

export const defaultMeeting:EhicsMeeting = {
  meetingtimes:  null,
  meetingdate: null,
  meetingreason:  null,
  meetingfile: null,
}

export interface EhicsMember {
  idcardno: string | null;
  accusertype: string | null;
  groupname: string | null;
  address: string | null;
  prefix: number | null;
  fullname : string | null;
  // firstname: string | null;
  // lastname: string | null;
  phone: string | null;
}
export interface EhicsSubcommittee {
  idcardno: string | null;
  idnumber: number | null;
  positioncommittee: string | null;
  prefix: string | null;
  firstname: string | null;
  lastname: string | null;
  position: string | null;
  bureau: string | null;
  bureauname: string | null;
}

export interface Ehicsaccused {
  id: string | null;
  licenseno: string | null;
  identitynumber: number | null;
  usertype: string | null;
  titlethid: string | null;
  nameth: string | null;
  lastnameth: string | null;
  phonenumber: string | null;
  certificatestartdate: string | null;
  certificateenddate: string | null;
  bureau: string | null;
}

export interface EhicsCondemnation {
  condemnationtype: string | null;
  condemnationdetail: string | null;
}

export interface EhicsAccusationaction {
  self: Boolean | null;
  profession: Boolean | null;
  service: Boolean | null;
  coworkers: Boolean | null;
  society: Boolean | null;
}

export interface EhicsMeeting {
  meetingtimes: string | null;
  meetingdate: string | null;
  meetingreason: string | null;
  meetingfile: string | null;
}

export const ACCUSATION_FILES: FileGroup[] = [
  { name: '1. เอกสารกล่าวหา/กล่าวโทษ', files: [] },
  { name: '2. สำเนาบัตรประชาชน	', files: [] },
];

export const columns = [
  'order',
  'id',
  'receiveDate',
  'blackNumber',
  'redNumber',
  'personId',
  'name',
  'process',
  // 'status',
  'lastUpdate',
  'edit',
  'view',
];
export interface AccusationList {
  order: number;
  id: string;
  receiveDate: string;
  blackNumber: string;
  redNumber: string;
  personId: string;
  name: string;
  process: string;
  // status: string;
  lastUpdate: string;
  edit: string;
  view: string;
}
export const decisions: ListData[] = [
  {
    label: 'ไม่มีมูล ยุติเรื่อง ยกข้อกล่าวหา',
    name: 'decisions',
    value: 0,
  },
  {
    label: 'มีมูล เป็นการประพฤติผิดจรรยาบรรณไม่ร้ายแรง วินิจฉัยโทษตักเตือน ตามข้อ 13/1',
    name: 'decisions',
    value: 1,
  },
  {
    label: 'มีมูล เป็นการประพฤติผิดจรรยาบรรณไม่ร้ายแรง วินิจฉัยโทษภาคทัณฑ์ ตามข้อ 13/1',
    name: 'decisions',
    value: 2,
  },
  {
    label: 'มีมูล เป็นการประพฤติผิด และแต่งตั้งคณะอนุกรรมการสอบสวน',
    name: 'decisions',
    value: 3,
  },
  {
    label: 'ความผิดปรากฏชัดแจ้งไม่ร้ายแรง วินิจโทษตักเตือน ตามข้อ 60/5',
    name: 'decisions',
    value: 4,
  },
  {
    label: 'ความผิดปรากฏชัดแจ้งไม่ร้ายแรง วินิจโทษภาคทัณฑ์ ตามข้อ 60/5',
    name: 'decisions',
    value: 5,
  },
  {
    label: 'ความผิดปรากฏชัดแจ้งร้ายแรง วินิจโทษพักใช้ ตามข้อ 60/5',
    name: 'decisions',
    value: 6,
  },
  {
    label: 'ความผิดปรากฏชัดแจ้งร้ายแรง วินิจโทษเพิกถอน ตามข้อ 60/6',
    name: 'decisions',
    value: 7,
  },
  // {
  //   label: 'มีมูลความผิด วินิจฉัยชี้ขาดความผิดเล็กน้อย',
  //   name: 'decisions',
  //   value: 1,
  // },
  // {
  //   label: 'ตักเตือน / ภาคภัณฑ์ (ต้องเลือกอย่างใดอย่างหนึ่งเสมอ)',
  //   name: 'decisions',
  //   value: 2,
  // },
  // {
  //   label: 'มีมูลความผิด นำเสนอคณะกรรมการตั้งคณะอนุกรรมการสอบสวน',
  //   name: 'decisions',
  //   value: 3,
  // },

];

export const EthicsProcesses: ListData[] = [
  {
    value: 1,
    label: 'บันทึกการกล่าวหา/กล่าวโทษ'
  },
  {
    value: 2,
    label: 'บันทึกสืบสวนข้อเท็จจริง'
  },
  {
    value: 3,
    label: 'บันทึกการสอบสวน'
  },
  {
    value: 4,
    label: 'ยืนยันการกล่าวหา/กล่าวโทษ'
  },
  {
    value: 5,
    label: 'เผยแพร่การกล่าวหา/กล่าวโทษ'
  }
]

export type EthicsKey = keyof Ethics;

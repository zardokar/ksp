import { ListData } from './input-type';

export class KspAccusationRequest {
    identity_no: string | null = null;
    prefix_th: string | null = null;
    first_name_th: string | null = null;
    last_name_th: string | null = null;
    prefix_en: string | null = null;
    first_name_en: string | null = null;
    last_name_en: string | null = null;
    gender_th: string | null = null;
    birth_date: string | null = null;
    email: string | null = null;
    phone_number: string | null = null;
}

export const accusationtypeList: ListData[] = [
    {
      label: 'ต่อตนเอง',
      name: 'self',
      // name: 'actions',
      value: 1,
    },
    {
      label: 'ต่อวิชาชีพ',
      name: 'profession',
      // name: 'actions',
      value: 2,
    },
    {
      label: 'ต่อผู้รับบริการ',
      name: 'service',
      // name: 'actions',
      value: 3,
    },
    {
      label: 'ต่อผู้ร่วมประกอบวิชาชีพ',
      name: 'coworkers',
      // name: 'actions',
      value: 4,
    },
    {
      label: 'ต่อสังคม',
      name: 'society',
      // name: 'actions',
      value: 5,
    }
  ];

export const accusationcondemnationtypeList: ListData[] = [
    {
      label: 'ปฏิบัติหน้าที่โดยมิชอบ',
      name: 'illegally',
      value: 1,
    },
    {
      label: 'ทำร้ายร่างกาย',
      name: 'mayhem',
      value: 2,
    },
    {
      label: 'ชู้สาว',
      name: 'sexual',
      value: 3,
    },
    {
      label: 'ความผิดเกี่ยวกับเพศ',
      name: 'sexoffences',
      value: 4,
    },
    {
      label: 'การพนันและสุรา',
      name: 'gamblingliquor',
      value: 5,
    },
    {
      label: 'ความผิดเกี่ยวกับยาเสพติด',
      name: 'narcotics',
      value: 6,
    },
    {
      label: 'ความผิดเกี่ยวกับทรัพย์',
      name: 'propertyoffense',
      value: 7,
    },
    {
      label: 'ละทิ้ง ละเว้น',
      name: 'omit',
      value: 8,
    },
    {
      label: 'ดูหมิ่น หมิ่นประมาท กล่าวถ้อยคำไม่เหมาะสม',
      name: 'defame',
      value: 9,
    },
    {
      label: 'ความผิดทางแพ่ง',
      name: 'civiloffense',
      value: 10,
    },
    {
      label: 'อื่นๆ',
      name: 'etc',
      value: 11,
    },
  ];
  

  export const officerassign: ListData[] = [
    {
      label: 'นายตุลย์ เรืองสมัย',
      name: 'officer',
      value: 1,
    },
    {
      label: 'นางสาวเพรชรัชต์ พงศ์พินิจ',
      name: 'officer',
      value: 2,
    },
    {
      label: 'นางสาวปวิชญา เผ่ารอด',
      name: 'officer',
      value: 3,
    },
    {
      label: 'นายภูริณัฐ พงศ์พินิจ',
      name: 'officer',
      value: 4,
    },
    {
      label: 'นายยศพัฒน์ เลิศวิทยา',
      name: 'officer',
      value: 5,
    },
  ];

  export const allegationList: ListData[] = [
    {
      label: 'กรณี 13/1 ไม่ร้ายแรง วินิจฉัยโทษตักเตือน',
      // name: 'investigationaction',
      value: 1,
    },
    {
      label: 'กรณี 13/1 ไม่ร้ายแรง วินิจฉัยโทษภาคทัณฑ์',
      // name: 'investigationaction',
      value: 2,
    },
    {
      label: 'กรณี 60/5 ไม่ร้ายแรง วินิจฉัยโทษตักเตือน',
      // name: 'investigationaction',
      value: 3,
    },
    {
      label: 'กรณี 60/5 ไม่ร้ายแรง วินิจฉัยโทษภาคทัณฑ์',
      // name: 'investigationaction',
      value: 4,
    },
    {
      label: 'กรณี 60/6 ร้ายแรง วินิจฉัยโทษพักใช้',
      // name: 'investigationaction',
      value: 5,
    },
    {
      label: 'กรณี 60/6 ร้ายแรง วินิจฉัยโทษเพิกถอน',
      // name: 'investigationaction',
      value: 6,
    },
  ];



  export const decisionsSelector = [
    {
      label: 'รับเรื่องพิจารณา และดำเนินการขั้นต่อไป',
      value: 1,
    },
    {
      label: 'ไม่รับเรื่องพิจารณาและจำหน่ายออก เนื่องจากอายุความเกิน 1 ปี',
      value: 2,
    },
    {
      label: 'ยุติเรื่องกรณีไม่มีหนังสืออนุญาต',
      value: 3,
    },
    {
      label: 'บัตรสนเทห์',
      value: 4,
    },
    {
      label: 'หนังสือร้องเรียนขาดสาระสำคัญ',
      value: 5,
    },
    {
      label:
        'เหตุเกิดก่อนข้อบังคับคุรุสภาว่าด้วยมาตรฐานวิชาชีพและจรรยาบรรณวิชาชีพ พ.ศ.2548',
      value: 6,
    },
    {
      label: 'อื่นๆ (ระบุด้วยตนเอง)',
      value: 7,
    },
  ];
  
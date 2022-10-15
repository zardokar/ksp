import {
  SchoolRequestProcess,
  SchoolRequestType,
  SelfRequestProcess,
} from '@ksp/shared/constant';
import { FileGroup, SchoolRequest } from '@ksp/shared/interface';
import moment from 'moment';

// return Thai date format,
export function stringToThaiDate(
  sDate: string,
  format = 'DD MMM YYYY'
): string {
  try {
    return moment(sDate).locale('th-TH').format(format);
  } catch (error) {
    return '-';
  }
}
// return Thai date format
export function thaiDate(date: Date): string {
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// format json data
// from [null,'true',null,'true',null,null] ===> ['s2','s4']
export function formatCheckboxData(input: any[], source: any[]) {
  const result = input
    .map((v, i) => (v ? source[i].value : null))
    .filter((v) => v !== null);
  //console.log('map data = ', result);
  //return JSON.stringify(result);
  return result;
}

// replace object value from empty --> null
export function replaceEmptyWithNull(input: any) {
  for (const [key, value] of Object.entries(input)) {
    if (value === '') {
      input[key] = null;
    }
  }
  return input;
}

export function formatDatePayload(input: any) {
  for (const [key, value] of Object.entries(input)) {
    if (key.includes('date') && input[key]) {
      input[key] = formatDate(new Date(input[key]).toISOString());
    }
  }
  return input;
}

/**
 *
 * @param input return correct format date to send to API
 * @returns
 */
export function formatDate(input: string | null | undefined) {
  if (input && input.length) {
    console.log('aa = ');
    return input.split('T')[0];
  } else {
    console.log('bb = ');
    return null;
  }
}

// replace object value from Undefined --> null
export function replaceUndefinedWithNull(input: any) {
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) {
      input[key] = null;
    }
  }
  return input;
}

// parse json with Thai characters support
export function parseJson(input: any) {
  if (input) {
    return JSON.parse(decodeURIComponent(escape(window.atob(input))));
  } else {
    return null;
  }
}

export function toLowercaseProp(input: any) {
  return Object.keys(input).reduce((destination: any, key) => {
    destination[key.toLowerCase()] = input[key];
    return destination;
  }, {});
}

export function checkProcess(processId: number, requestType = 3) {
  const process = SchoolRequestProcess.find((p) => {
    return p.processId === processId && p.requestType === requestType;
  });
  return process;
}

export function checkStatus(
  processId: number,
  statusId: number,
  requestType = 3
) {
  const process = checkProcess(processId, requestType);
  const status = process?.status.find((s) => {
    return s.id == statusId;
  });
  return status;
}

export function SelfCheckProcess(processId: number) {
  const process = SelfRequestProcess.find((p) => {
    return p.processId === processId;
  });
  return process;
}

export function SelfcheckStatus(processId: number, statusId: number) {
  //console.log('p = ', processId, ' s = ', statusId);
  const process = SelfCheckProcess(processId);
  const status = process?.status.find((s) => {
    return s.id == statusId;
  });
  return status;
}

export function checkRequestType(RequestTypeId: number) {
  return SchoolRequestType.find((s) => s.id === RequestTypeId)?.name;
}

// get file in base 64 format
export function getBase64(
  file: File
): Promise<FileReader['result'] | ProgressEvent<FileReader>> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onerror = (error) => rej(error);
  });
}

export function changeDate(
  input: Date | string | null | undefined
): string | null {
  if (input instanceof Date) {
    input = input.toISOString();
  }
  if (input && input.length) {
    return input.split('T')[0];
  } else {
    return input ?? null;
  }
}

export function mapFileInfo(fileGroups: any[]) {
  return fileGroups.map((file: any) => {
    const object = {
      fileid: file.fileid || null,
      filename: file.filename || null,
    };
    return object;
  });
}

export function mapMultiFileInfo(groups: FileGroup[]) {
  return groups.map((group) => {
    return group.files;
  });
}

export function jsonParse(object: string): string | null {
  try {
    return JSON.parse(object);
  } catch (e) {
    return null;
  }
}

export function jsonStringify(object: any): string {
  try {
    if (typeof object === 'string') return object;
    return JSON.stringify(object);
  } catch (e) {
    return '';
  }
}

export function applyClientFilter(data: SchoolRequest[], searchParams: any) {
  const { requesttype, ...param } = searchParams;
  return data.filter((d) => {
    const filter1 = param.requestno
      ? d.requestno?.includes(param.requestno)
      : true;

    const filter2 = param.subtype ? `${d.subtype}` === param.subtype : true;

    const filter3 = param.firstnameth
      ? d.firstnameth?.includes(param.firstnameth) ||
        d.lastnameth?.includes(param.firstnameth)
      : true;

    const filter4 = param.idcardno
      ? d.idcardno?.includes(param.idcardno)
      : true;

    const filter5 = param.passportno
      ? d.passportno?.includes(param.passportno)
      : true;

    const filter6 = param.currentprocess
      ? `${d.currentprocess}` === param.currentprocess
      : true;

    const filter7 = param.requeststatus
      ? `${d.requeststatus}` === param.requeststatus
      : true;

    return (
      filter1 && filter2 && filter3 && filter4 && filter5 && filter6 && filter7
    );
  });
}

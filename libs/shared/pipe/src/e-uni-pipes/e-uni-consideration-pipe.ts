import { Pipe, PipeTransform } from '@angular/core';
import { EUniApproveProcess } from '@ksp/shared/constant';
import _ from 'lodash';

@Pipe({
  name: 'eUniConsideration',
  pure: false,
  standalone: true,
})
export class EUniConsiderationPipe implements PipeTransform {
  transform(value: any) {
    if (['1', '2', '3'].includes(value?.process)) return '';
    let classStatus = 'verify__status';
    let status: any = _.find(EUniApproveProcess, {
      requestType: _.toNumber(value?.requestType),
      processId: _.toNumber(value?.process),
    });
    status = _.find(status?.status, { id: _.toNumber(value?.status) });
    if (!status) {
      classStatus = 'edit__status';
    }
    return `<span class="rounded-pill d-flex justify-content-center text-center ${classStatus} text-wrap">${
      status?.sname || 'แก้ไข'
    }</span>`;
  }
}

import { lastValueFrom } from 'rxjs';

import { ListData } from '@ksp/shared/interface'
import { Component, Input, OnInit, ViewChild } from '@angular/core'

import { FormBuilder, FormGroup } from '@angular/forms'

import { NFXUniReportService } from '@ksp/shared/service'
// ----------------------------------------------------------------------------------------
import { REPORT_HEADER_TABLE, REPORT_COLS } from '@ksp/shared/constant'
import { UniInfoService } from '@ksp/shared/service'
import { providerFactory } from '@ksp/shared/utility'
import { getCookie } from '@ksp/shared/utility';
import { getAdmissionDataTable } from './form-service-unireport.mapper'
import { GNXTableComponent } from '@ksp/shared/utility';
// ----------------------------------------------------------------------------------------
@Component({
  selector: 'uni-form-search-unireport'
  ,templateUrl: './form-search-unireport.component.html'
  ,styleUrls: ['./form-search-unireport.component.scss']
  ,providers: providerFactory(UniFormSearchUniReportComponent)
})

// ----------------------------------------------------------------------------------------
export class UniFormSearchUniReportComponent implements OnInit {

  @Input() uniUniversityOption: Array<any> = []
  @Input() reportType                      = ''

  @ViewChild('resulttable') resultTable : GNXTableComponent = new GNXTableComponent()
  // -------------------------------------------------------
  HEAD_LABEL                               = ''
  TABLE_COLS                               = []
  TABLE_STYLE                              = {
                                                'width' : 'max-content'
                                             }
  // -------------------------------------------------------
  reportdata     : any[any]                = [{}]
  current_uniid                            = ''
  current_unitype                          = ''
  universityList: ListData[]               = []
  universityTypeList: ListData[]           = []
  degreeLevelList: ListData[]              = []
  uniSearchFormGrp: FormGroup              = this.fb.group({
                                                             uni_id: ['']
                                                            ,uni_type: ['']
                                                            ,approve_code: ['']
                                                            ,degree_name: ['']
                                                          })

  // -------------------------------------------------------
  constructor(
               private fb: FormBuilder
              ,private uniInfoService: UniInfoService
             )
  {
    
  }
  // -------------------------------------------------------
  ngOnInit(): void {
    console.log( "UniFormSearchUniReportComponent", this.reportType )
    this.initFormData()
    this.getUniOptions()
  }
  // -------------------------------------------------------
  initFormData() {
    this.HEAD_LABEL       = REPORT_HEADER_TABLE[this.reportType]
    this.TABLE_COLS       = REPORT_COLS[this.reportType]

    this.current_uniid    = getCookie('uniId')
    this.current_unitype  = getCookie('uniType')
  }
  // -------------------------------------------------------
  async getUniOptions() {

    const university      = await lastValueFrom(this.uniInfoService.getUniuniversity())
    const universityTypes = await lastValueFrom(this.uniInfoService.getUniversityType())
    const degreeLevel     = await lastValueFrom(this.uniInfoService.getUniDegreelevel())

    this.universityList = university.datareturn.map((data: any) => {
      data.value = data.id

      if (data.campusname) {
        data.label = data.name + `, ${data.campusname}`;
      } else {
        data.label = data.name;
      }
      
      return data;
    })

    this.universityTypeList = universityTypes.map(( type: any ) => {
      type.value = type.id
      type.label = type.name

      return type
    })

    this.degreeLevelList = degreeLevel?.datareturn.map(({ id, name }: any) => ({
      value: id,
      label: name,
    }))

    this.patchForm()
  }
  // -------------------------------------------------------
  patchForm()
  {
    this.uniSearchFormGrp.controls['uni_id'].patchValue(this.current_uniid)
    this.uniSearchFormGrp.controls['uni_type'].patchValue(this.current_unitype)
  }
  // -------------------------------------------------------
  clear() {
    console.log( ' Clear Form ')
  }
  // -------------------------------------------------------
  async search(event : any) {
    console.log( ' Searching ')
    const resp : any[any] = await NFXUniReportService.searchAdmission( {
                                                                uni_id : this.uniSearchFormGrp.controls['uni_id'].value
                                                            })
    this.reportdata = getAdmissionDataTable(resp?.data.data)
    this.resultTable.updateTable({ data: this.reportdata})
  }
}
// ----------------------------------------------------------------------------------------
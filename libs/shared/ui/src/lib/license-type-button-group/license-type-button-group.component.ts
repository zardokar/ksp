import { CommonModule } from '@angular/common';
import { Component, Input,Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
@Component({
  selector: 'ksp-license-type-button-group',
  templateUrl: './license-type-button-group.component.html',
  styleUrls: ['./license-type-button-group.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
})
export class LicenseTypeButtonGroupComponent {

  @Input() selecttab                = ''
  @Output() clickLicenseTab      = new EventEmitter<string>()
  licenseButtons = [ 
    { label: 'หนังสืออนุญาตประกอบวิชาชีพ - ครู' , value: 'TEACHER'},
    { label: 'หนังสืออนุญาตประกอบวิชาชีพ - ผู้บริหารสถานศึกษา' , value: 'SCHOOL_ADMIN'},
    { label: 'หนังสืออนุญาตประกอบวิชาชีพ - ผู้บริหารการศึกษา' , value: 'EDUCATION_ADMIN'},
    { label: 'หนังสืออนุญาตประกอบวิชาชีพ - ศึกษานิเทศก์' , value: 'SUPERVISOR'}
  ];

  clickTabChange(value: any)
  {
    this.selecttab = value
    this.clickLicenseTab.emit(this.selecttab)
  }
}

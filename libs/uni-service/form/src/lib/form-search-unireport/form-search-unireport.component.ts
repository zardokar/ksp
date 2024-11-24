import { KspFormBaseComponent } from '@ksp/shared/interface'
import { Component, Input, OnInit } from '@angular/core'

import { providerFactory, validatorMessages } from '@ksp/shared/utility';

@Component({
  selector: 'uni-form-search-unireport'
  ,templateUrl: './form-search-unireport.component.html'
  ,styleUrls: ['./form-search-unireport.component.scss']
  ,providers: providerFactory(FormSearchUniReportComponent)
})

export class FormSearchUniReportComponent extends KspFormBaseComponent {
    
}
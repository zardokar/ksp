import { Component, OnInit } from "@angular/core"
import { UntilDestroy } from "@ngneat/until-destroy"
// ---------------------------------------------------------------------------
@UntilDestroy()
@Component({
  selector: 'ksp-uni-report-plate'
  ,templateUrl: './uni-report-plate.component.html'
  ,styleUrls: ['./uni-report-plate.component.scss']
})

// ---------------------------------------------------------------------------
export class UniReportPlateComponent implements OnInit 
{
    target_label                    = ''
  
    // --------------------------------------------

    // --------------------------------------------
    ngOnInit(): void {
        console.log( 'UniReportPlateComponent')
    }
    
}
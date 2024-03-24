import { Component } from '@angular/core';
import { UntilDestroy} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.scss'],
})
export class TestReportComponent {

}


import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccusationSearchComponent } from '@ksp/e-service/dialog/accusation-search';

@Component({
  selector: 'e-service-ethic-accusation-record',
  templateUrl: './accusation-record.component.html',
  styleUrls: ['./accusation-record.component.scss'],
})
export class AccusationRecordComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  @Input() hideAllButtons = false;
  @Input() hideContainer = false;
  @Input() hideTitle = false;

  next() {
    this.router.navigate(['/', 'ethics', 'accusation', 'decision']);
  }

  cancel() {
    this.router.navigate(['/', 'ethics', 'accusation']);
  }

  openSearchDialog() {
    this.dialog.open(AccusationSearchComponent, {
      height: '750px',
      width: '1250px',
    });

    /* dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    }); */
  }
}
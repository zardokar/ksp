import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UniversitySearchComponent } from '@ksp/shared/ui/university-search';

@Component({
  selector: 'school-service-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
})
export class CurrentUserComponent {
  foundUser = false;

  constructor(public router: Router, private dialog: MatDialog) {}

  openSearchDialog() {
    const dialog = this.dialog.open(UniversitySearchComponent, {
      height: '900px',
      width: '1200px',
    });

    // on submit
    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) this.foundUser = true;
    });
  }

  next() {
    this.router.navigate(['/', 'register', 'register']);
  }
}
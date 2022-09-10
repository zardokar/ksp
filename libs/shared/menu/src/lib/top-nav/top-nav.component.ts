import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolServiceFeatureLoginService } from '@ksp/school-service/feature/login';
import { deleteCookie, getCookie, thaiDate } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class TopNavComponent {
  today = thaiDate(new Date());
  firstName = getCookie('firstNameTh');
  lastName = getCookie('lastNameTh');
  constructor(
    private router: Router,
    private schoolServiceFeatureLoginService: SchoolServiceFeatureLoginService
  ) {}
  logout() {
    deleteCookie('schUserToken');
    this.router.navigate(['/']);
  }
}

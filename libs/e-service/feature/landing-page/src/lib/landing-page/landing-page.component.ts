import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'e-service-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  elicense() {
    this.router.navigate(['/', 'temp-license']);
  }

  standard() {
    this.router.navigate(['/', 'degree-cert']);
  }

  ethics() {
    this.router.navigate(['/', 'ethics', 'accusation']);
  }

  praise() {
    this.router.navigate(['/', '']);
  }

  fee() {
    this.router.navigate(['/', '']);
  }

  admin() {
    this.router.navigate(['/']);
  }
}

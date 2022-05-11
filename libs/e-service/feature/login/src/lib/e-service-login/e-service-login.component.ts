import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-e-service-login',
  templateUrl: './e-service-login.component.html',
  styleUrls: ['./e-service-login.component.css'],
})
export class EServiceLoginComponent {
  constructor(private router: Router) {}

  login() {
    this.router.navigate(['/', 'accusation', 'list']);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ksp-uni-warn-incorrect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uni-warn-incorrect.component.html',
  styleUrls: ['./uni-warn-incorrect.component.scss'],
})
export class UniWarnIncorrectComponent implements OnInit {
  @Input() details: string[] = [];

  constructor() {}

  ngOnInit(): void {}
}

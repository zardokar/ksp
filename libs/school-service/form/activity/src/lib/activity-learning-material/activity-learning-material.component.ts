import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-activity-learning-material',
  templateUrl: './activity-learning-material.component.html',
  styleUrls: ['./activity-learning-material.component.scss'],
})
export class ActivityLearningMaterialComponent {
  @Input() data: any;
}

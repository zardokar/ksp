import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniServiceContainerPageComponent } from '@ksp/uni-service/feature/container-page';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { GraduateListComponent } from './graduate-list/graduate-list.component';
import { ImportStudentComponent } from './import-student/import-student.component';

const routes: Routes = [
  {
    path: '',
    component: UniServiceContainerPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'graduate-list',
      },
      {
        path: 'graduate-list',
        component: GraduateListComponent,
      },
      {
        path: 'course-detail/:type',
        component: CourseDetailComponent,
      },
      {
        path: 'import-student/:type',
        component: ImportStudentComponent,
      },
      {
        path: '**',
        component: GraduateListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniServiceFeatureGraduateListRoutingModule {}

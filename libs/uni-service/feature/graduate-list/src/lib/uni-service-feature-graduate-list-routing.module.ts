import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniServiceContainerPageComponent } from '@ksp/uni-service/feature/container-page';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { ImportStudentListComponent } from './import-student-list/import-student-list.component';

const routes: Routes = [
  {
    path: '',
    component: UniServiceContainerPageComponent,
    children: [
      {
        path: 'course-search',
        component: CourseSearchComponent,
      },
      {
        path: 'course-detail',
        component: CourseDetailComponent,
      },
      {
        path: 'import-student',
        component: ImportStudentListComponent,
      },
      {
        path: '**',
        component: CourseSearchComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniServiceFeatureGraduateListRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { UniServiceFeatureGraduateListRoutingModule } from './uni-service-feature-graduate-list-routing.module';
import { ImportStudentComponent } from './import-student/import-student.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableModule } from 'primeng/table';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { SharedFeatureDegreeCertModule } from '@ksp/shared/feature/degree-cert';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [
    CommonModule,
    UniServiceFeatureGraduateListRoutingModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    TableModule,
    SharedFormOthersModule,
    MatSelectModule,
    MatOptionModule,
    SharedUiBottomMenuModule,
    SharedFeatureDegreeCertModule,
    MatIconModule,
    MatTableModule,
  ],
  declarations: [
    CourseSearchComponent,
    CourseDetailComponent,
    ImportStudentComponent,
  ],
  exports: [
    CourseSearchComponent,
    CourseDetailComponent,
    ImportStudentComponent,
  ],
})
export class UniServiceFeatureGraduateListModule {}

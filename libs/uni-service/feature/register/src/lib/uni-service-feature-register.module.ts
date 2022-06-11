import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UniServiceUiFormsModule } from '@ksp/uni-service/ui/forms';
import { UniServiceRegisterRequesterComponent } from './uni-service-register-requester/uni-service-register-requester.component';
import { UniServiceRegisterCoordinatorComponent } from './uni-service-register-coordinator/uni-service-register-coordinator.component';
import { UniServiceFeatureRegisterRoutingModule } from './uni-service-feature-register-routing.module';
import { UniServiceUiNavModule } from '@ksp/uni-service/ui/nav';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

@NgModule({
  imports: [
    CommonModule,
    UniServiceFeatureRegisterRoutingModule,
    RouterModule,
    UniServiceUiFormsModule,
    UniServiceUiNavModule,
    SharedFormOthersModule,
  ],
  declarations: [
    UniServiceRegisterRequesterComponent,
    UniServiceRegisterCoordinatorComponent,
  ],
  exports: [
    UniServiceRegisterRequesterComponent,
    UniServiceRegisterCoordinatorComponent,
  ],
})
export class UniServiceFeatureRegisterModule {}

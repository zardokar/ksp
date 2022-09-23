import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { File_UPLOAD_URLS, FileUploadUrls } from '@ksp/shared/form/file-upload';

const fileUrls: FileUploadUrls = {
  upload: '/kspuni/unirequestfilesinsert',
  download: '/kspuni/unirequestfileselectfile',
  delete: '/kspuni/unirequestfiledelete',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTooltipModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: File_UPLOAD_URLS,
      useValue: fileUrls,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

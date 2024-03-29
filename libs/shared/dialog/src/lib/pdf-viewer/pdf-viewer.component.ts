import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PDFDocument } from 'pdf-lib';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { KspCheckResult, KspFile } from '@ksp/shared/interface';
import { FileService } from '@ksp/shared/form/file-upload';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    NgxExtendedPdfViewerModule,
    LicenseCheckComponent,
    ReactiveFormsModule,
  ],
})
export class PdfViewerComponent implements OnInit {
  pdfBytes: any;
  pdfList: IPdf[] = [];
  index!: number | null;
  verifyChoice = [
    {
      name: 'รับเอกสารแล้ว',
      value: 'complete',
    },
    {
      name: 'ขอเอกสารเพิ่มเติม',
      value: 'incomplete',
    },
    {
      name: 'ส่งกลับเพื่อแก้ไข',
      value: 'return',
    },
  ];
  form = this.fb.group({
    checkResult: this.fb.array([]),
  });
  selected!: IPdf | null;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      group: string;
      files: KspFile[];
      checkresult: KspCheckResult[];
      systemType: string;
    },
    private fb: FormBuilder,
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) {}

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }
  ngOnInit(): void {
    this.addCheckResultArray(this.data.files.length);
    setTimeout(() => {
      //console.log(this.data.checkresult);
      this.checkResultFormArray.controls.forEach((form, index) =>
        form.patchValue(this.data.checkresult[index] ?? {})
      );
    }, 0);

    this.data.files = this.data.files.filter((file) => file.fileid);
    this.pdfList = this.setDefault(this.data.files.length);
    console.log('open')
    this.getAllFileData();
  }

  getFile(index: number) {
    const file = this.data.files[index];
    const id = file.fileid;
    console.log('get file',this.data);
    if (this.data.systemType == 'uni') {
      this.fileService.downloadUniFile({ id }).subscribe((res: any) => {
        const extension = this.pdfList[index].type;
        const src = atob(res?.filedata ?? '');
        if (extension == 'pdf') {
          this.downloading(src, index);
        } else {
          this.pdfList[index].src = src;
          this.pdfList[index].view = src;
          this.pdfList[index].loading = false;
        }
      });
    } else if (this.data.systemType == 'ksp') {
      this.fileService.eDownloadKspFile({ id }).subscribe((res: any) => {
        const extension = this.pdfList[index].type;
        const src = atob(res?.filedata ?? '');
        if (extension == 'pdf') {
          this.downloading(src, index);
        } else {
          this.pdfList[index].src = src;
          this.pdfList[index].view = src;
          this.pdfList[index].loading = false;
        }
      });
    } else if (this.data.systemType == 'sch') {
      this.fileService.eDownloadSchoolFile({ id }).subscribe((res: any) => {
        const extension = this.pdfList[index].type;
        const src = atob(res?.filedata ?? '');
        if (extension == 'pdf') {
          this.downloading(src, index);
        } else {
          this.pdfList[index].src = src;
          this.pdfList[index].view = src;
          this.pdfList[index].loading = false;
        }
      });
    } else {
      this.fileService.downloadFile({ id }).subscribe((res: any) => {
        const extension = this.pdfList[index].type;
        const src = atob(res?.filedata ?? '') || atob(res?.file ?? '');
        if (extension == 'pdf') {
          this.downloading(src, index);
        } else {
          this.pdfList[index].src = src;
          this.pdfList[index].view = src;
          this.pdfList[index].loading = false;
        }
      });
    }
  }
  async downloading(src: string, index: number) {
    const pdfDoc = await PDFDocument.load(src);
    const base64 = (await pdfDoc.saveAsBase64({ dataUri: true })) || '';
    this.pdfList[index].src =
      this.sanitizer.bypassSecurityTrustResourceUrl(base64);
    this.pdfList[index].view = await pdfDoc.save();
    this.pdfList[index].loading = false;
  }
  addCheckResultArray(count: number) {
    for (let i = 0; i < count; i++) {
      this.checkResultFormArray.push(this.fb.control([]));
    }
  }
  mappingFile(files: KspFile[]) {
    files.map((file) => {
      const id = file.fileid;
      return this.fileService.eDownloadSchoolFile({ id });
    });
  }
  setDefault(count: number) {
    const pdfList = [];
    for (let i = 0; i < count; i++) {
      pdfList.push({
        loading: true,
        type: this.getExtension(this.data.files[i]),
        src: this.sanitizer.bypassSecurityTrustResourceUrl(
          '/assets/images/empty.png'
        ),
        view: this.sanitizer.bypassSecurityTrustResourceUrl(
          '/assets/images/empty.png'
        ),
      });
    }
    return pdfList;
  }
  getExtension(file: KspFile) {
    const extension = file.filename.split('.')[1];
    return extension;
  }
  getAllFileData() {
    console.log(this.data)
    for (const index in this.data.files) {
      this.getFile(parseInt(index));
    }
  }
  selectFile(file: IPdf, index: number) {
    this.selected = file;
    this.index = null;
    setTimeout(() => {
      this.index = index;
    }, 0);
  }
}

export interface IPdf {
  loading: boolean;
  type: string;
  src: any;
  view: any;
}

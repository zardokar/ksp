import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';

import fontkit from '@pdf-lib/fontkit';
import { PDFDocument, PDFFont, PDFPage } from 'pdf-lib';
import { zutils } from '@ksp/shared/utility';
// ---------------------------------------------------------------------------
// 'assets/font/th_sarabun_new/THSarabunNew.ttf'
const DEFAULT_FONT_LOCATION = 'assets/font/ksp/ksp-regular.ttf'
// ---------------------------------------------------------------------------
@Component({
    templateUrl: './zng-viewer.component.html',
    styleUrls: ['./zng-viewer.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule
    ],
  })
// ---------------------------------------------------------------------------
export class ZNGViewerComponent implements OnInit 
{
    // ----------------------------------------------
    @ViewChild('zngviewer') viewer: ElementRef | undefined;
    // ----------------------------------------------
    pdfBytes                 = 'data:application/pdf;base64,'
    urlSafe: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfBytes)
    // ----------------------------------------------
    constructor(
        private sanitizer : DomSanitizer,
        @Inject(MAT_DIALOG_DATA)
        public data: {
                        fontSrc: string
                      pdfSrcUrl: string
                          input: any
        }
    ){

    }

    ngOnInit(): void {
       console.log(`ZNGViewerComponent Initializing`)
       this.loadPdf()
    }
    // ----------------------------------------------
    async loadPdf()
    {
        try{
            if(zutils.exist(this.data.pdfSrcUrl))
            {
                const existingPdfBytes = await fetch(this.data.pdfSrcUrl).then((res) =>
                                                res.arrayBuffer()
                                        );
                const pdfDoc = await PDFDocument.load(existingPdfBytes);
                const fontBytes = await fetch(
                    this.data.fontSrc || DEFAULT_FONT_LOCATION 
                ).then((res) => res.arrayBuffer());
                
                pdfDoc.registerFontkit(fontkit);
                //const customFont = await pdfDoc.embedFont(fontBytes, { subset: false });

                //this.pdfBytes = await pdfDoc.save();
                this.pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true })

                this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfBytes)
            }
        }catch(excp){
            console.log(`ERROR : ZNGViewerComponent.loadPdf -----------------------`)
            console.log(excp)
            console.log(`ZNGViewerComponent.loadPdf -------------------------------`)
        }
    }
}
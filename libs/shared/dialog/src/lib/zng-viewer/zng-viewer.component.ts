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
const DEFAULT_TEXTSTYLE = {
                            size: 14,
                            opacity: 1
}
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
                      pdfMapper: any[any]
                          input: any[any]
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
                const existingPdfBytes = await fetch(this.data.pdfSrcUrl).then( (res) =>  res.arrayBuffer()  )

                const pdfDoc = await PDFDocument.load(existingPdfBytes)
                const fontBytes = await fetch(
                    this.data.fontSrc || DEFAULT_FONT_LOCATION 
                ).then((res) => res.arrayBuffer())
                
                pdfDoc.registerFontkit(fontkit)

                const customFont = await pdfDoc.embedFont(fontBytes, { subset: false })
                const pages = pdfDoc.getPages()

                if( zutils.exist(this.data.pdfMapper) && this.data.pdfMapper.length > 0)
                {
                    this.data.pdfMapper.map( (item : any) => {

                        if(item.skip!== true)
                        {
                            const addsize = zutils.exist(item,'size_label') ? parseInt(item.size_label) : 0

                            const option = { 
                                x: item.options.x, 
                                y: item.options.y,
                                size: DEFAULT_TEXTSTYLE.size + addsize,
                                font: customFont,
                                opacity: DEFAULT_TEXTSTYLE.opacity
                            }

                            pages.map( page => {
                                if( zutils.exist(this.data.input, item.key) )
                                {
                                    const dataRender = this.data.input[item.key] || '';
                                    page.drawText(dataRender, option)
                                }
                            })
                        }
                    })
                }

                // for (const index in pages) {
                //     if (!input[index]) return;
                //     for (const param of input[index].text) {
                //       const dataRender = this.data.input[param.key] || '';
                //       pages[index].drawText(dataRender, {
                //         ...param.options,
                //         font: customFont,
                //       });
                //     }
                //     for (const param of input[index].svg) {
                //       if (this.data.input[param.key]) {
                //         pages[index].drawSvgPath(param.svgPath, {
                //           ...param.options,
                //         });
                //       }
                //     }
                //   }

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
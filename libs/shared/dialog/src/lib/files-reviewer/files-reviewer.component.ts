import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, EventEmitter, Inject, Input, Output, ElementRef, ViewChild } from '@angular/core';

import { FileGroup, KspFile } from '@ksp/shared/interface';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { FileService } from '@ksp/shared/form/file-upload';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { zutils } from '@ksp/shared/utility';

// ---------------------------------------------------------------------
@Component({
    selector: 'ksp-files-reviewer',
    templateUrl: './files-reviewer.component.html',
    styleUrls: ['./files-reviewer.component.scss'],
    standalone: true,
    imports: [CommonModule, MatDialogModule],
})
// ---------------------------------------------------------------------
export class FilesReviewerComponent {

    // -----------------------------------------------
    systemtype                                  = ''
    filetitle                                   = 'กรุณารอ Download เอกสาร'
    selectfileid                                = ''
    ifilecomment                                = ''
    iradresult                                  = 1
    isAccept                                    = true

    SYSTYPE    :{ [key: string]: string }       = {
                                                              'uni': 'uni',
                                                              'sch': 'sch',
                                                    'e-service-uni': 'uni',
                                                    'e-service-sch': 'sch'
                                               }
    ICONS_PATH :{ [key: string]: string }       = {
                                                    'pdf' : 'assets/images/SVG/icn_pdf.svg',
                                                    'jpg' : 'assets/images/SVG/icn_png.svg',
                                                    'png' : 'assets/images/SVG/icn_png.svg',
                                                    'null' : 'assets/images/ic_file_bdr.svg',
                                                'undefined' : 'assets/images/ic_file_bdr.svg'
                                            }
    THUMBLIST : { [key: string]: string }       = {}
    CLASSSTYLELIST : { [key: string]: string }  = {}
    // -----------------------------------------------
    result              : any = []
    files               : KspFile[]
    form                : FormGroup | any
    viewerSafe          : SafeResourceUrl | undefined
    // -----------------------------------------------
    @Output() confirmed = new EventEmitter<boolean>();
    
    // -----------------------------------------------
    constructor( 
                  private fb : FormBuilder,
                  private sanitizer: DomSanitizer,
                  private fileService : FileService,
                  private dialogRef: MatDialogRef<FilesReviewerComponent> ,
                  @Inject(MAT_DIALOG_DATA) public data: { selectfile: number, files: KspFile[], systemtype: string, checkresult: [] } ,
                )
    {
        this.form       = this.fb.group({
            radfilereview: ['1']
        })

        this.files      = data.files
        this.systemtype = data.systemtype

        if(data.checkresult && data.checkresult.length > 0){
            this.result = data.checkresult
        } 

        if(zutils.exist( data, 'files') && data.files.length > 0  ) 
        {
            this.initThumbnails( data.files )
            this.selectThumbnail( data.files[ data.selectfile || 0 ].fileid )
        }
    }
    // -----------------------------------------------
    initThumbnails(files : any[] )
    {
        files.map( fileobj => { 
            this.loadThumbnail( fileobj ) 
        })
    }

    // -----------------------------------------------
    selectThumbnail(fileid: any) {
        const file                      = this.files.find( file => file.fileid === fileid )
        const file_checked              = this.result.find( (res : any) => res.fileid === fileid )

        if( file_checked === undefined){
            this.ifilecomment           = ''
        }else{
            this.ifilecomment           = file_checked.comment
            this.iradresult             = file_checked.select_result

            if(this.iradresult === 1)
                this.isAccept           = true
            else
                this.isAccept           = false
        }

        this.CLASSSTYLELIST[fileid]     = 'file-block-overlay active'

        this.filetitle                  = file?.filename || ''
        this.loadFile( fileid as number )
    }

    // -----------------------------------------------
    loadThumbnail( fileitem : any )
    {
        try{
            const spfilename                    = fileitem?.filename.split('.')
            const ext                           = spfilename[ spfilename.length-1 ]
            this.THUMBLIST[fileitem?.fileid]    = this.ICONS_PATH[ext]
        }catch(excp){ /* Out of Index*/ }
    }
    // -----------------------------------------------
    confirmFile()
    {
        const file_checked = this.result.find( (res : any) => res.fileid === this.selectfileid )

        if( file_checked === undefined){
            this.result.push( {
                        fileid: this.selectfileid,
                 select_result: this.iradresult,
                       comment: this.ifilecomment
            })
        }else{
            file_checked.select_result      = this.iradresult
            file_checked.comment            = this.ifilecomment
        }

        if(this.iradresult === 1)
        {
            this.CLASSSTYLELIST[this.selectfileid]     = 'file-block-overlay accepted'
        }else{
            this.CLASSSTYLELIST[this.selectfileid]     = 'file-block-overlay reqmore'
        }

        console.log( this.result )
    }

    // -----------------------------------------------
    loadFile( fileid : number)
    {
        this.selectfileid           = `${fileid}`
        this.fileService.getKspXFile({ "fileid": fileid, "service": this.SYSTYPE[this.systemtype] }).subscribe((res: any) => {
            const respdata      = res?.data as any[]
            const targetdata    = respdata.find( (fileobj)  => fileobj?.fileid === fileid )
             this.viewerSafe    = this.sanitizer.bypassSecurityTrustResourceUrl(targetdata.filedata) 
          });
    }

    // -----------------------------------------------
    onEditComment(event: any)
    {
        this.ifilecomment           = event.target.value;
    }

    // -----------------------------------------------
    onCheckResultClick( event: any )
    {
        this.iradresult             = Number(event.target.value);
        if(this.iradresult === 1)
            this.isAccept = true
        else
            this.isAccept = false
    }
    // -----------------------------------------------
    writeFilename(filename: string)
    {
        return filename.length <= 10 ? filename : `${filename.slice(0,10)}...`
    }

    // -----------------------------------------------
    close()
    {
        this.dialogRef.close(this.result)
        this.confirmed.emit(true);
    }
    // -----------------------------------------------
    base64toBlob(filedata: any,mime='application/pdf')
    {
        const dataURI        = atob(filedata)
        const bytechar       = dataURI.replace(/^data[^,]+,/,'')
        const cleanbyte      = Uint8Array.from(bytechar, v => v.charCodeAt(0))
        return new Blob([cleanbyte],{type: mime})
    }
}
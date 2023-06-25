import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, EventEmitter, Inject, Input, Output, ElementRef, ViewChild } from '@angular/core';

import { FileGroup, KspFile } from '@ksp/shared/interface';
import { FileService } from '@ksp/shared/form/file-upload';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';


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
    systemtype          = ''
    filetitle           = 'กรุณารอ Download เอกสาร'
    selectfileid        = ''
    ifilecomment        = ''
    iradresult          = 0
    isAccept            = true

    // -----------------------------------------------
    result              : any = []
    files               : KspFile[]
    form                : FormGroup | any
    viewerSafe          : SafeResourceUrl | undefined
    // -----------------------------------------------
    @Output() confirmed = new EventEmitter<boolean>();

    // -----------------------------------------------
    
    // -----------------------------------------------
    constructor( 
                  private fb : FormBuilder,
                  private sanitizer: DomSanitizer,
                  private fileService : FileService,
                  private dialogRef: MatDialogRef<FilesReviewerComponent> ,
                  @Inject(MAT_DIALOG_DATA) public data: { selectfile: number, files: KspFile[], systemtype: string, checkresult: [] } ,
                )
    {
        this.form       = fb.group({
            radfilereview: ['1']
        })

        this.files      = data.files
        this.systemtype = data.systemtype

        console.log( data )
        if(data.checkresult && data.checkresult.length > 0){
            this.result = data.checkresult
        } 

        this.selectThumbnail( data.files[ data.selectfile || 0 ].fileid )
    }

    // -----------------------------------------------
    selectThumbnail(fileid: any) {

        console.log( this.form.get("radfilereview") )

        const file = this.files.find( file => file.fileid === fileid)
        const file_checked = this.result.find( (res : any) => res.fileid === fileid )

        if( file_checked === undefined){
            this.ifilecomment   = ''
        }else{
            this.ifilecomment   = file_checked.comment
            this.iradresult     = file_checked.select_result

            if(this.iradresult === 1)
                this.isAccept = true
            else
                this.isAccept = false
        }

        this.filetitle = file?.filename || ''
        this.loadFile( fileid as number )
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

        console.log( this.result )
    }

    // -----------------------------------------------
    loadFile( fileid : number)
    {
        this.selectfileid           = `${fileid}`

        if(this.systemtype === 'sch'){
            this.fileService.eDownloadSchoolFile({ id: fileid }).subscribe((res: any) => {
                const src           = atob(res?.filedata ?? '');
                this.viewerSafe     = this.sanitizer.bypassSecurityTrustResourceUrl(src) 
              });
        }else if(this.systemtype === 'uni'){
            this.fileService.eDownloadEUniFile({ id: fileid }).subscribe((res: any) => {
                const src           = atob(res?.filedata ?? '');
                this.viewerSafe     = this.sanitizer.bypassSecurityTrustResourceUrl(src) 
              });
        }else{
            this.fileService.eDownloadKspFile({ id: fileid }).subscribe((res: any) => {
                const src           = atob(res?.filedata ?? '');
                this.viewerSafe     = this.sanitizer.bypassSecurityTrustResourceUrl(src) 
              });
        }

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
    close()
    {
        this.dialogRef.close(this.result)
        this.confirmed.emit(true);
    }
}
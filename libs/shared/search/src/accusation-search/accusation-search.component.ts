import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  AccusationList,
  EthicsProcesses,
  columns,
  KspFormBaseComponent,
} from '@ksp/shared/interface';
import { EthicsService } from '@ksp/shared/service';
import { MatDialog } from '@angular/material/dialog';
import { jsonParse, providerFactory, thaiDate, zutils } from '@ksp/shared/utility';
// import localForage from 'localforage';

@Component({
  selector: 'ksp-ethics-accusation-search',
  templateUrl: './accusation-search.component.html',
  styleUrls: ['./accusation-search.component.scss'],
  providers: providerFactory(AccusationSearchComponent),
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatPaginatorModule,
  ],
})
export class AccusationSearchComponent
  extends KspFormBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  override form = this.fb.group({
    listNumber: [],
    eraBe: [],
    fromToDate: [],
    blackNumber: [],
    redNumber: [],

    accusedLicenseNumber: [],
    accusedPersonId: [],
    accusedFirstname: [],
    accusedLastname: [],

    accuserLicenseNumber: [],
    accuserPersonId: [],
    accuserFirstname: [],
    accuserLastname: [],

    ethicProcess: []

  });

  @Input() showAddButton = false;
  @Input() current_process = "";

  @Output() submited = new EventEmitter<boolean>();
  dataSource = new MatTableDataSource<AccusationList>();
  displayedColumns: string[] = columns;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: EthicsService,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {
    super();

    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges()
    this.dataSource.paginator = this.paginator;
    this.form.controls.ethicProcess.setValue(this.current_process as any)
  }
  onClickSearch() {

    const payload = {
      // ethicsno: '',
      accusationblackno: '',
      resultredno: '',
      firstnameth: '',
      lastnameth: '',
      idcardno: '',
      firstnameinfo: '',
      lastnamethinfo: '',
      idcardnoinfo: '',
      licensenoinfo: '',
      offset: '0',
      row: '10',
    };

    this.service.searchEthicssearch(payload).subscribe((res: any) => {
      const filterprocess : string = this.form.controls.ethicProcess.value || ''
      const dataresult : any = []
      res.forEach((item: any) => {
        // const json: any = jsonParse(item?.licenseinfo)
        item.licenseinfo = jsonParse(item?.licenseinfo)
        const process   = EthicsProcesses[ parseInt(item.processid) - 1 ]
        if( zutils.exist(process) !== false && parseInt(process.value) === parseInt(filterprocess) )
        {
          if( typeof item.licenseinfo == "string"){
            item.licenseinfo = jsonParse(item.licenseinfo)
          }  

          console.log(item.licenseinfo)
          for(let accused of item.licenseinfo){
            // console.log(accused)
            if(item.name == undefined){
              item.name             = accused?.nameth + " " + accused?.lastnameth
              item.idcardno         = accused?.identitynumber 
            }else{
              item.name             = item?.name + ", " + accused?.nameth + " " + accused?.lastnameth
              item.idcardno         = item?.idcardno + ", "  + accused?.identitynumber 
            }
            // if(accused?.nameth !== undefined){
            //   const splitname = json?.nameth.split(' ')
            //   item.firstnameth      = splitname[0]
            //   item.lastnameth       = splitname[1]
            // }

          }
          item.createdate       = thaiDate(new Date(`${item.createdate}`));
          item.updatedate       = thaiDate(new Date(`${item.updatedate}`));
          item.process          = `${ process.label }`
          dataresult.push(item)
        }
      });
      this.dataSource.data = dataresult;
    });
  }
  createNew() {
    this.router.navigate(['accusation', 'detail']);
  }
  onClickRow(row: any) {
    // console.log(row);
    this.submited.emit(row.id);
  }
  clear() {
    this.form.reset();
    this.dataSource.data = [];
  }

  // Modal log 
  
  // openUpdateLogDialog() {
  //   const dialogRef = this.dialog.open(InquiryConsiderRecordComponent, {
  //     height: '50vh',
  //     width: '50vw',
  //     position: {
  //       top: '25vh',
  //       right: '25vw',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log("after Close ::: ",result);
  //     if(result !== ""){
  //     // this.addConsiderRow(result)
  //     }
  //     // this.selectId = result
  //     // this.addressId = result
  //     // this.updateStatus = true
  //   });
  // }


}

import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { KspAccusationRequest } from '@ksp/shared/interface';
import {
  AddressService,
  EthicsService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'e-service-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss'],
})
export class AddressInfoComponent implements OnInit {
  @Input() identityNo  : string | undefined
  @Input() addressInfo  : any | undefined
  // @Input() changeUpdate : boolean | undefined

  selectedPerson  = new KspAccusationRequest()
  mapData = {
              address : "--",
              addressno : "--",
              addressmoo : "--",
              addressalley : "--",
              addressroad : "--",
              addresssubdistrictid : "--",
              addressdistrictid : "--",
              addressprovinceid : "--" ,
              addresszipcode : "--" 
          }

  prefixList$!: Observable<any>;
  bureaus$!: Observable<any>;
  provinces$!: Observable<any>;
  constructor(
    private service: EthicsService,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
  ) {

  }

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.bureaus$ = this.generalInfoService.getBureau();
    this.provinces$ = this.addressService.getProvinces();
    if(this.addressInfo){
      this.assignAddressInfo( this.addressInfo )
    }
    else{
      this.queryAddressInfo( this.addressInfo )
    }

  }

  queryAddressInfo(personalId: any){
    // console.log(personalId);
    this.service
    .searchSelfMyInfo({ identity_no: personalId?.identitynumber  }) //, ilicenseno: form.licenseno   ,identity_no: this.identityNo
    .subscribe((res) => {
      // console.log("License info :::" , res);
      const resArray  = res as []
      const person = resArray.find( (person : any) => { 
                    if( person.identitynumber == personalId?.identitynumber ){
                        this.assignAddressInfo(person)  
                    }
                    return person.identitynumber  === personalId?.identitynumber 
      }) 
    });
    
    return this.mapData
  }



  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit()
  }

  assignAddressInfo(addressInfo: any){
    // const GENDER = { '1': 'ชาย' , '2': 'หญิง', '3': 'อื่นๆ'}
    // console.log("In assignAddressInfo" , addressInfo);
    this.mapData.address = addressInfo.address !== null ? addressInfo.address : "--"
    this.mapData.addressno = addressInfo.addressno !== null ? addressInfo.addressno : "--"
    this.mapData.addressmoo = addressInfo.addressmoo !== null ? addressInfo.addressmoo : "--"
    this.mapData.addressalley = addressInfo.addressalley !== null ? addressInfo.addressalley : "--"
    this.mapData.addressroad = addressInfo.addressroad !== null ? addressInfo.addressroad : "--"
    this.mapData.addresssubdistrictid = addressInfo.addresssubdistrictid !== null ? addressInfo.addresssubdistrictid : "--"
    this.mapData.addressdistrictid = addressInfo.addressdistrictid !== null ? addressInfo.addressdistrictid : "--"
    this.mapData.addressprovinceid = addressInfo.addressprovinceid !== null ? addressInfo.addressprovinceid : "--"
    this.mapData.addresszipcode = addressInfo.addresszipcode !== null ? addressInfo.addresszipcode : "--"
    // this.changeUpdate == false
    
    return this.mapData
  }
}

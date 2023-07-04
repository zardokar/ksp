import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { KspAccusationRequest } from '@ksp/shared/interface';
import {
  AddressService,
  EthicsService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'e-service-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss'],
})

export class PersonInfoComponent implements OnInit {
  @Input() identityNo : string | undefined
  @Input() changeUpdate : boolean | undefined
  
  personSelected  = false;
  selectedPerson  = new KspAccusationRequest()
  dataSource: any
  mapData = {
                identityNo : "--",
                namefirstTH : "--",
                namelastTH : "--",
                namefirstEN : "--",
                namelastEN : "--",
                email : "--",
                phoneNumber : "--",
                birthDate : "--" ,
                genderId : "--" ,
                profileImage : "assets/images/profile.png"
            }
  prefixList$!: Observable<any>;
  bureaus$!: Observable<any>;
  provinces$!: Observable<any>;
  constructor(
    private service: EthicsService,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
  ) {
    console.log(this.selectedPerson);
  }


  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.bureaus$ = this.generalInfoService.getBureau();
    this.provinces$ = this.addressService.getProvinces();
    if(this.changeUpdate == true){
        this.service
        .searchSelfLicense({ identity_no: this.identityNo  }) //, ilicenseno: form.licenseno
        .subscribe((res) => {

          const resArray  = res as []
          const person = resArray.find( (person : any) => { 
                        if( person.identitynumber == this.identityNo ){
                            this.assignPersonInfo(person)  
                        }
                        return person.identitynumber  === this.identityNo 
          }) 
          console.log(person);
        });
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit()
  }

  assignPersonInfo(person_data: any)
  {
    const GENDER = { '1': 'ชาย' , '2': 'หญิง', '3': 'อื่นๆ'}
    
    this.mapData.identityNo = person_data.identitynumber !== undefined ? person_data.identitynumber : "--"
    this.mapData.namefirstTH = person_data.nameth !== undefined ? person_data.nameth : "--"
    this.mapData.namelastTH = person_data.lastnameth !== undefined ? person_data.lastnameth : ""
    this.mapData.namefirstEN = person_data.nameen !== undefined ? person_data.nameen : "--"
    this.mapData.namelastEN = person_data.lastnameen !== undefined ? person_data.lastnameen : ""
    this.mapData.email = person_data.email !== undefined ? person_data.email : "--"
    this.mapData.phoneNumber = person_data.phonenumber !== undefined ? person_data.phonenumber : "--"
    this.mapData.birthDate = person_data.birthdate !== undefined ? person_data.birthdate : "--"
    this.mapData.genderId = person_data.genderid !== undefined ? GENDER[ (person_data.genderid as keyof typeof  GENDER) ] : "--"
    this.mapData.profileImage = person_data.profileimage !== null ? person_data.profileimage : `assets/images/profile.png`
    this.changeUpdate == false
    
    return person_data.identitynumber === this.identityNo 
  }

}

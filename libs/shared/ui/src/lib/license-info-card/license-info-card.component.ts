
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { zdtform } from '@ksp/shared/utility';
// ----------------------------------------------------
import { environment } from '@ksp/shared/environment';
// ----------------------------------------------------
const SEARCH_LIC_URL                 = `${environment.shortApiUrl}/kspx/ethic/es_licenseinfosearch.php`
// ----------------------------------------------------
@Component({
    selector: 'ksp-license-info-card',
    templateUrl: './license-info-card.component.html',
    styleUrls: ['./license-info-card.component.css'],
    standalone: true,
    imports: [CommonModule],
})
// ----------------------------------------------------
export class LicenseInfoCardComponent {
    // -------------------------------------------------
    license                             = {
                                            certificateno         : '-',
                                            idcardno          : '-',
                                            licensetype       : '-',
                                            fullname_th       : '-',
                                            fullname_en       : '-',
                                            birthdate         : '-',
                                            licensestart      : '-',
                                            licenseexpire     : '-'
    }

    licenses : any[any]                 = {
                                            'TEACHER'         : [],
                                            'SCHOOL_ADMIN'    : [],
                                            'EDUCATION_ADMIN' : [],
                                            'SUPERVISOR'      : []
    }

    licTHmap : any                      = {
                                            'TEACHER'         : 'หนังสืออนุญาตประกอบวิชาชีพ  - ครู',
                                            'SCHOOL_ADMIN'    : 'หนังสืออนุญาตประกอบวิชาชีพ - ผู้บริหารสถานศึกษา',
                                            'EDUCATION_ADMIN' : 'หนังสืออนุญาตประกอบวิชาชีพ - ผู้บริหารการศึกษา',
                                            'SUPERVISOR'      : 'หนังสืออนุญาตประกอบวิชาชีพ - ศึกษานิเทศก์'
    }

    // -------------------------------------------------
    @Input() selectedata : any          = null
    @Input()  changeTab  : any          = null
    @Output() selectTab                 = new EventEmitter<string>()
    // -------------------------------------------------
    ngOnChanges(changes: SimpleChanges) {
        if( this.changeTab === '' && this.license.certificateno === '-')
            this.onSetupComponent()
        else{
            this.mapLicenseInfoCard(this.licenses[this.changeTab][0])
            this.selectTab.emit(this.changeTab)
        }
    }
    // -------------------------------------------------
    async onSetupComponent()
    {
        if( this.selectedata && this.selectedata!== null && this.selectedata.id  )
        {
            const resplic : any[any] = await searchAllLicense(this.selectedata.id)

            if(  resplic.data.datareturn.length > 0)
            {
                resplic.data.datareturn.map( (lic : any) => {
                    lic.licenseexpiredate   = zdtform.convertDateForm(lic.certificateenddate, 'th', 'be', 'DD MMMM YYYY')
                    lic.licensestartdate    = zdtform.convertDateForm(lic.certificatestartdate, 'th', 'be', 'DD MMMM YYYY')
                })
                resplic.data.datareturn     = resplic.data.datareturn.sort( (a : any, b: any) => (a.licenseexpiredate > b.licenseexpiredate ? -1 : 1) )
                this.assignTabData( resplic.data.datareturn )

                const currentTab            = this.changeTab || 'TEACHER'

                this.mapLicenseInfoCard(this.licenses[currentTab][0])
                this.selectTab.emit(currentTab)
            }
        }
        
    }
    // -------------------------------------------------
    assignTabData(data: any[any])
    {
        const keys                  = Object.keys(this.licenses)
        const today                 = new Date()
        keys.map( (key : any) => {
            this.licenses[key]      = data.filter( (lic: any) => { return lic.usertype === key && new Date(lic.certificateenddate) >= today })   
        })
    }

    // -------------------------------------------------
    mapLicenseInfoCard(data: any[any])
    {
        try{
            this.license.certificateno  = data.certificateno
            this.license.idcardno       = this.selectedata.identitynumber
            this.license.licensetype    = this.licTHmap[data.usertype]
            this.license.fullname_th    = `${this.selectedata.nameth} ${this.selectedata.lastnameth}`
            this.license.fullname_en    = `${this.selectedata.nameen} ${this.selectedata.lastnameen}`
            this.license.birthdate      = zdtform.convertDateForm(this.selectedata.birthdate, 'th', 'be', 'DD MMMM YYYY')
            this.license.licensestart   = data.licensestartdate
            this.license.licenseexpire  = data.licenseexpiredate
        }catch(excp){
            this.license.certificateno  = '-'
        }

    }

}

function searchAllLicense(id: string)
{
    return new Promise( (resolve) => {
        resolve(axios.post(SEARCH_LIC_URL, { id: id }))
    })
}
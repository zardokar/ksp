import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// --------------------------------------------------------------------------------------------------------------------------
const GTABLE_THEME = {

    basic:{
            tablestyle: { 
                                     'border' : '1px solid #595f64',
                               'border-radius': '8px',
                                   'transform': 'translate3d(0,0,0)',
                             'border-collapse': 'collapse'
                        },

            headstyle:  { 
                                    'border':  '1px solid #595f64',
                                 'textAlign':  'center'
                        },

            cellstyle:  `
                         border:  1px solid #595f64;
                         text-align:  left; 
                        `
    },
    noborder:{
            tablestyle: {
                                   'border':    '0px solid #595f64',
                             'borderRadius':    '0px',
                                'transform': 'translate3d(0,0,0)',
                           'borderCollapse': 'collapse'
                        },
            headstyle:  { 
                                    'border':  '0px solid #595f64',
                                 'textAlign':  'center'
                        },
            cellstyle:  {   
                                    'border':  '0px solid #595f64',
                                 'textAlign':  'center'
                         }
    }
}
// --------------------------------------------------------------------------------------------------------------------------
export interface GTableConfigStruc
{
    tablename?               : string

    hasno?                   : boolean
    autofit?                 : boolean

    colclass?                : string
    rowclass?                : []

    tablestyle?              : any

    headcol?                 : any[any]
    headstyle?               : any
    headextra?               : []
    headcolclass?            : []
    headrowclass?            : []
    headcolonclick?          : []

    cellstyle?               : any

    tr_style?                : any
    tr_headstyle?            : any
    tr_bodystyle?            : any

    thname?                  : string 
    tdname?                  : string
    theme?                   : string
}
// --------------------------------------------------------------------------------------------------------------------------
export interface iPropsGTable
{
    data                    : any[]
    theme                   : string
    config                  : GTableConfigStruc
}
// --------------------------------------------------------------------------------------------------------------------------
@Component({
    selector: 'ksp-gnx-table',
    templateUrl: './GNXTable.component.html',
    styleUrls: ['./GNXTable.component.scss'],
    standalone: true,
    imports: [
      CommonModule
    ]
})
// --------------------------------------------------------------------------------------------------------------------------
export class GNXTableComponent
{
    config      : GTableConfigStruc
    data        : any[any]
    datakeys    : any[any]
    headcol     : any[any]
    tablestyle  : any[any]
    headstyle   : any[any]
    cellstyle   : string

    constructor(  )
    {
        this.data             = []
        this.config           = this.assign({})
        this.cellstyle        = this.config.cellstyle
    }

    assign(iconfig : GTableConfigStruc)
    {
        iconfig.tablename       = iconfig.tablename || "GRXTABLE"
        iconfig.thname          = iconfig.thname    || "GTH_"
        iconfig.tdname          = iconfig.tdname    || "GTD_"
        iconfig.autofit         = iconfig.autofit   || true

        iconfig.theme           = iconfig.theme     || 'basic'
        iconfig.tr_headstyle    = { ...iconfig.tr_style, ...iconfig.tr_headstyle }
        iconfig.tr_bodystyle    = { ...iconfig.tr_style, ...iconfig.tr_bodystyle }

        this.tablestyle         = iconfig.tablestyle || GTABLE_THEME[iconfig.theme as keyof typeof GTABLE_THEME].tablestyle
        this.headstyle          = iconfig.headstyle  || GTABLE_THEME[iconfig.theme as keyof typeof GTABLE_THEME].headstyle
        this.cellstyle          = iconfig.cellstyle  || GTABLE_THEME[iconfig.theme as keyof typeof GTABLE_THEME].cellstyle

        return iconfig
    }
}
// --------------------------------------------------------------------------------------------------------------------------
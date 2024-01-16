import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// --------------------------------------------------------------------------------------------------------------------------
const GTABLE_NAME  = 'GNXTABLE'
const GATBLE_TH    = 'GTH_'
const GATBLE_TD    = 'GTD_'
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
                                 'text-align':  'center'
                        },

            cellstyle:  {   
                            'border':  '1px solid #595f64',
                         'text-align':  'left'
                        }
                        ,
            tr_headstyle : {}
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
                         },
            tr_headstyle : ''
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

    coldata?                 : any[any]
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
    data?                    : any[]
    theme?                   : string
    config?                  : GTableConfigStruc
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
export class GNXTableComponent implements OnInit
{
    config      : GTableConfigStruc
    data        : any[any]
    datakeys    : any[any]
    tablestyle  : any[any]
    headstyle   : any[any]
    cellstyle!  : string

    @Input() dataCols : any[] = []
    @Input() dataRows? : any[any] = []
    @Input() TableStyle?:  any = {}

    constructor()
    {
        this.config           = {}
    }

    ngOnInit(): void {
        this.updateTable({})
    }

    updateTable(props : iPropsGTable)
    {
        this.data              = []
        this.assign(props?.config as GTableConfigStruc)

        this.datakeys          = this.dataRows.length > 0 ? Object.keys( this.dataRows[0] ) : []

        if( props && props.data)
        {
            this.data          = props.data as any[any]
            this.datakeys      = this.data.length > 0 ? Object.keys( this.data[0] ) : []
        }
    }

    assign(iconfig : GTableConfigStruc = {} )
    {
        iconfig.tablename       = iconfig?.tablename ?? GTABLE_NAME
        iconfig.thname          = iconfig?.thname ?? GATBLE_TH
        iconfig.tdname          = iconfig?.tdname ?? GATBLE_TD
        iconfig.autofit         = iconfig?.autofit ?? true

        iconfig.theme           = iconfig.theme     || 'basic'

        iconfig.tr_headstyle    = { ...iconfig.tr_style, ...iconfig.tr_headstyle }
        iconfig.tr_headstyle    = Object.keys(iconfig.tr_headstyle).length === 0 ? GTABLE_THEME[iconfig.theme as keyof typeof GTABLE_THEME]?.tr_headstyle : iconfig.tr_headstyle

        iconfig.tr_bodystyle    = { ...iconfig.tr_style, ...iconfig.tr_bodystyle }


        this.tablestyle         = iconfig.tablestyle || GTABLE_THEME[iconfig.theme as keyof typeof GTABLE_THEME].tablestyle
        this.tablestyle         = { ...this.tablestyle , ...this.TableStyle }

        this.headstyle          = iconfig.headstyle  || GTABLE_THEME[iconfig.theme as keyof typeof GTABLE_THEME].headstyle
        this.cellstyle          = iconfig.cellstyle  || GTABLE_THEME[iconfig.theme as keyof typeof GTABLE_THEME].cellstyle

        this.config             = iconfig

        return iconfig
    }

    setConfig(iconfig : GTableConfigStruc)
    {
        this.config             = this.assign(iconfig)
    }

    setData(data : any[any])
    {
        this.data               = data
        this.datakeys           = this.data.length > 0 ? Object.keys( this.data[0] ) : []
    }
}

// --------------------------------------------------------------------------------------------------------------------------
export const GNXTable = new GNXTableComponent()
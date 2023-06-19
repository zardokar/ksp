import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
// ---------------------------------------------------------------------------------------------------
@Component({
    selector: 'ksp-doc-reviewer',
    templateUrl: './doc-reviewer.component.html',
    styleUrls: ['./doc-reviewer.component.css'],
    standalone: true,
    imports: [CommonModule]
})
// ---------------------------------------------------------------------------------------------------
export class DocReviewerComponent {

  // ------------------------------------------------------------------


}

// ---------------------------------------------------------------------------------------------------
function getCheckResultClassName() { return 'input_fchkres' }
function getPrefixCheckFileInput() { return 'inp_fchk_' } 
// ---------------------------------------------------------------------------------------------------

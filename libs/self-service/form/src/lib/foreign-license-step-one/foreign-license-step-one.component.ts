import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

function checkAllValidator(): any {
  return (form: FormArray) => {
    const checkAll = form.controls.every((item) => !!item.value);

    if (!checkAll) {
      return { checkall: true };
    }

    return null;
  };
}

@Component({
  selector: 'self-service-foreign-license-step-one',
  templateUrl: './foreign-license-step-one.component.html',
  styleUrls: ['./foreign-license-step-one.component.scss'],
  providers: providerFactory(ForeignLicenseStepOneComponent),
})
export class ForeignLicenseStepOneComponent
  extends KspFormBaseComponent
  implements OnInit
{
  rules = [
    `Teaching License Application Form (Form KS. 01)`,
    `Copy of educational certificate along with official transcript`,
    `Copy of teaching license/ certificate from abroad (If any)`,
    `Original official degree confirmation letter for graduates of institution or an originalofficial transcript or original of statement of
    professional standing (as the case may be)`,
    `Copy of translation of non-English or Thai documents
    - Any document not in English or Thai, it must be accompanied by an official Thai
    translation, prepared and certified as correct by an official translator. The Council considers an official translator to be a certified
    translator, a certified court interpreter, an authorized government official, or an official translation from a professional translation
    service or an appropriate language department at any university).`,
    `Copy of documentary evidence of passing professional certification in accordance with the professional standards ofthe Teachers'
    Council of Thailand (If any)`,
    `Original of Professional Experience Evaluation Form
    - The evaluator group must be between 3 and 5 people. These people must include
    an educational institution administrator, a teacher in the institution, or other related persons (e.g. educational supervisor or
    specialist in learning management).
    These persons will evaluate together as a group.
    - This form must be completed and signed by all evaluators; including attached with photocopies of their current professional
    licenses that are certified as true copies of the original.`,
    `Copy of the applicant's passport, particularly the photo page and the latest update current school NON-B Visa
    - In case of holding visa type “NON-O”, please attach a copy of individual official documents having relationship with Thai people
    such as birth certificate, marriage certificate or other
    related documents.).`,
    `Copy of all used paged of Thai Work Permit
    - The work place stated on applicant's Work Permit must be the same educational
    institution stated on Professional Experience Evaluation Form. Period of working experience shall be counted as one consecutive year
    from the date the work permit issued until the date of application`,
    `Copy of Certificate of Name/Surname Change, Certificate of Marriage/Divorce, or related document, in case of name, or surname
    discrepancy between that appears on the degree certificate and that appears on the passport`,
    `Two 1 X 1.25 inch half-length, full face photographs in which the applicant is facing
    the camera directly; wearing formal clothing without hat and sunglasses; taken against plain, blue or white background and taken
    within the last six months (Do not wear a t-shirt or tank top, no smile)
    - Scanned Polaroid and photographs printed on an inkjet printer are unacceptable. - One photograph will be glue to the application
    form in the designated space
    and place another one in a small zippered plastic bag and staple it to the form.`,
    `Payment receipt for registration fee: 500 Baht`,
  ];

  override form = this.fb.group({
    checkDocuments: this.fb.array([], checkAllValidator()),
  });

  override set value(value: any) {
    Object.keys(value).forEach((key) => {
      const control = this.form.get(key) as FormArray;
      if (value[key]?.length) {
        value[key].forEach((value: any, index: any) => {
          control.at(index)?.patchValue(value);
        });
      }
    });

    this.onChange(value);
    this.onTouched();
  }

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.rules.forEach((rule) =>
      this.form.controls.checkDocuments.push(this.fb.control(false))
    );
  }
}

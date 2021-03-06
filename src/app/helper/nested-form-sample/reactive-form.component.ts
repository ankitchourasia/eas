import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'eas-reactive-form',
  template: `
    <div class='card-body' style='background-color: #e2f2d1'>
      <div [formGroup]="sampleForm" nalJalNestedForm #form3="ngForm">
        <h3>Reactive form</h3>
        <eas-form-status formName="form-3" [isFormValid]="form3.valid"></eas-form-status>
        <input type="text" class='form-control-sm' name="text3" formControlName="input3">

        <div class='card-body' style='background-color: #fff2d1'>
          <ngForm nalJalNestedForm #form31="ngForm" required>
            <eas-form-status formName="form-3.1" [isFormValid]="form31.valid"></eas-form-status>
            <input type="text" class='form-control-sm' name="text31" ngModel required>
          </ngForm>
        </div>

      </div>
    </div>  
  `,
})
export class ReactiveFormComponent implements OnInit {

  private sampleForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.sampleForm = this.formBuilder.group({
      input3: ['', Validators.required],
    });
  }

}

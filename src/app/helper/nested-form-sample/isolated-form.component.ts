import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eas-isolated-form',
  template: `
  <div class='card-body' style='background-color: #aaa2d1'>
    <div ngForm nalJalNestedForm rootNestedForm="true" #form4="ngForm">
      <h3>Isolated form</h3>
      <eas-form-status formName="form-4" [isFormValid]="form4.valid"></eas-form-status>
      <input type="text" class='form-control-sm' name="text4" ngModel required>

      <div class='card-body' style='background-color: #bbb2d1'>
        <div ngForm nalJalNestedForm #form41="ngForm">
          <eas-form-status formName="form-4.1" [isFormValid]="form41.valid"></eas-form-status>
          <input type="text" class='form-control-sm' name="text41" ngModel required>
        </div>
      </div>  

    </div>
  </div>
  `,
})
export class IsolatedFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

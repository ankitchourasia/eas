import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eas-root-form',
  template: `
    <div class='card-body' style='background-color: #f2f2f2'>
      <form nalJalNestedForm #form1="ngForm">
        <eas-form-status formName="form-1" [isFormValid]="form1.valid"></eas-form-status>
        <input type="text" class='form-control-sm' name="text1" ngModel required>
        <eas-nested-form></eas-nested-form>
      </form>
    </div>
  `,
})
export class RootFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'eas-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ErrorsComponent implements OnInit {

  private static readonly errorMessages = {
    'required': () => 'This field is required',
    'minlength': (params) => 'The minimum length is: ' + params.requiredLength,
    'maxlength': (params) => 'The maximum length is: ' + params.requiredLength,
    'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
    'min': (params) => 'The minimum value is: ' + params.requiredMin,
    'max': (params) => 'The maximum value is: ' + params.requiredMax,
    // 'validateEqual':(params) => 'Input value mismatch with compare value',
    'compareEqual':(params) => 'Compare input mismatch',
  };

  @Input()
  public control: AbstractControlDirective | AbstractControl;
  
  constructor() { }

  ngOnInit() {
  }

  shouldShowErrors(): boolean {
    return this.control && this.control.errors && (this.control.dirty || this.control.touched);
  }
 
  listOfErrors(): string[] {
    // if(this.control.errors && this.control.errors.required){
    //   Object.keys(this.control.errors).forEach((element)=>{
    //     if(element !=='required'){
    //       delete this.control.errors[element];
    //     }
    //   });
    // }
    return Object.keys(this.control.errors).map(field => this.getMessage(field, this.control.errors[field]));
  }
 
  private getMessage(type: string, params: any) {
    if(ErrorsComponent.errorMessages[type]){
      return ErrorsComponent.errorMessages[type](params);
    }
  }

}






// :: Example how to use <eas-error></eas-error> selector for showing errors
    
//  login = {};

// <form (ngSubmit)="loginFormSubmitted()" #loginForm="ngForm">
//   <div class="form-group">
//       <label for="username" class="required">Username</label>

//       <!--ngModel is used within form tag, either the name attribute must be set or the form control must be define as standalone in ngModelOptions-->
//       <input [ngClass]="{'is-valid': !username.errors && (username.dirty || username.touched),'is-invalid': username.errors && (username.dirty || username.touched)}"
//        type="text" class="form-control form-control-md" [ngModel]="login.username" (ngModelChange)="login.username=$event"
//        [ngModelOptions]="{standalone:true}" id="username" placeholder="Enter username" #username="ngModel" maxlength="30" minlength="5" required>
//       
//       <!-- this is for required, pattern, minlenght, maxlenth, min and max only-->
//       <eas-error [control]="username"></eas-error>
//   </div>
//  </form>

//  <!--Submit the form from out the form-->
//  <div class="form-group text-center">
//     <button type="submit" class="btn btn-success btn-md  mx-sm-3" (click)="loginForm.ngSubmit.emit()" [disabled]="!loginForm.form.valid || loading">login</button>
//     <button type="reset" class="btn btn-danger btn-md  mx-sm-3" (click)="resetButtonClicked()" [disabled]="loading">clear</button>
//  </div>

// <eas-loader [show]="loading" size="3x"></eas-loader>

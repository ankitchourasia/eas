import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'eas-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoaderComponent implements OnInit {

  size: any = "2x || sm";
  show: boolean = true;
  message: string = "Please wait...";
  constructor() { }

  ngOnInit() { }

  @Input("size")
  set setSize(size : any){
    this.size = size;
  }

  @Input("show")
  set setShow(show : boolean){
    this.show = show;
  }

  @Input("message")
  set setMessage(message : string){
    this.message = message;
  }

}













// :: Example how to use <eas-loader></eas-loader> selector for showing loading with custom msg.
    
//  login = {};

// <form (ngSubmit)="loginFormSubmitted()" #loginForm="ngForm">
//   <div class="form-group">
//       <label for="username" class="required">Username</label>
//      <!--ngModel is used within form tag, either the name attribute must be set or the form control must be define as standalone in ngModelOptions-->
//       <input [ngClass]="{'is-valid': !username.errors && (username.dirty || username.touched),'is-invalid': username.errors && (username.dirty || username.touched)}"
//         type="text" class="form-control form-control-md" [ngModel]="login.username" (ngModelChange)="login.username=$event"
//         [ngModelOptions]="{standalone:true}" id="username" placeholder="Enter username" #username="ngModel" maxlength="30" minlength="5" required>
      
//       <eas-error [control]="username"></eas-error>
//   </div>
// </form>

// <!--Submit the form from out the form-->
// <div class="form-group text-center">
//     <button type="submit" class="btn btn-success btn-md  mx-sm-3" (click)="loginForm.ngSubmit.emit()" [disabled]="!loginForm.form.valid || loading">login</button>
//     <button type="reset" class="btn btn-danger btn-md  mx-sm-3" (click)="resetButtonClicked()" [disabled]="loading">clear</button>
// </div>

// <eas-loader [show]="loading" size="3x"></eas-loader>
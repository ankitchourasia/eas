import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalResources } from 'app/utility/global.resources';
import { LoginService } from '@eas-services/login/login.service';

@Component({
  selector: 'eas-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private globalResources: GlobalResources, private loginService : LoginService) { }

  ngOnInit() {
  }

  user : any = {};
  loading : boolean;

  processLoginForm(loginForm){
    console.log(this.user);
    this.loginService.authenticate(this.user).subscribe(success =>{
      console.log(success);
      this.router.navigate(["/admin"]);
    }, error =>{
      console.log(error);
    });

    // if (this.globalResources.validateForm(loginForm)) {
    //   this.router.navigate(['/admin']);
    // }
  }
}

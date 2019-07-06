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

  processLoginForm(){
    console.log(this.user);
    this.loginService.authenticate(this.user).subscribe((success) =>{
      if(success.status === 200){
        sessionStorage.setItem('userDetails', JSON.stringify(success.json()));
        this.router.navigate(["/admin"]);
      }
    }, error =>{
      console.log(error);
      alert("Invalid credentials");
    });

    
  }

  loginClicked(loginForm){
    if (this.globalResources.validateForm(loginForm)) {
      this.processLoginForm();
    }
  }

}

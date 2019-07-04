import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalResources } from 'src/app/utility/global.resources';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private globalResources: GlobalResources) { }

  ngOnInit() {
  }

  user : any = {};
  loading : boolean;

  processLoginForm(loginForm){
    console.log(this.user);
    if (this.globalResources.validateForm(loginForm)) {
      this.router.navigate(['/admin']);
    }
  }
}

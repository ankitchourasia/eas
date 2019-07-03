import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  user : any = {};
  loading : boolean;

  processLoginForm(){
    console.log(this.user);
    this.router.navigate(['/admin']);
  }
}

import { Component, OnInit } from '@angular/core';
import { sidebarTransition, sidebarAnimate, mainContainerAnimate } from 'app/animations/sidebar-animation';

@Component({
  selector: 'eas-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [ sidebarTransition, sidebarAnimate, mainContainerAnimate ],
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  menuState:string = 'in';

  toggleMenu(){
    this.menuState = this.menuState === 'in' ? 'out' : 'in';
  }

}

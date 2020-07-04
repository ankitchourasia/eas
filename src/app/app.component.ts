import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'eas-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eas';
  loading = false;
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof (RouteConfigLoadStart || NavigationStart): {
          this.loading = true;
          break;
        }

        case event instanceof (RouteConfigLoadEnd || NavigationEnd || NavigationCancel || NavigationError):{
          this.loading = false;
          break;
        }

        default: {
          this.loading = false;
          break;
        }
      }
    });
  }
}

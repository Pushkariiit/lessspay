import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Onboarding';
  app_shared_display: boolean = false;
  constructor(private router: Router) {
    router.events.subscribe((val: any) => {
      if (window.location.pathname === '/') {
        this.app_shared_display = false;
      }
      else {
        this.app_shared_display = true;
      }
    });
  }

}

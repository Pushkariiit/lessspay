import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private afAuth: AngularFireAuth, private router:Router) {}

  logout() {
    this.afAuth.signOut().then(()=>{
      this.router.navigate(['/'])
    });
  }
}

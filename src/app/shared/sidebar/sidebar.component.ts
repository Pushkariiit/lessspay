import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigatetoReport(){
    this.router.navigate(['/report']);
  }
  navigatetoVendors(){
    this.router.navigate(['/vendors']);
  }
  navigatetoSurveyor(){
    this.router.navigate(['/admin-surveyor']);
  }
  navigatetoTvc(){
    this.router.navigate(['/tvc']);
  }
  navigatetoDashboard(){
    this.router.navigate(['/']);
  }
}

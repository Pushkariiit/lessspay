import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup; // Declare loginForm as FormGroup

  constructor(private auth: AngularFireAuth, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  async login() {
    try {
      const { email, password } = this.loginForm.value;
      await this.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/dashboard']);
      // Successful login
      console.log("Login Successful");
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
    }
  }

  
}

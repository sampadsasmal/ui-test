import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AppService } from './app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  signinForm: FormGroup;
  isLoggedin = false;
  userName: string;
  constructor( private router: Router,
               private appService: AppService) { }

  ngOnInit() {
    this.appService.passData$.subscribe(data => {
      this.isLoggedin = data;
    });
    if (localStorage.getItem('userData') !== null ) {
      this.isLoggedin = true;
      const obj = JSON.parse(localStorage.getItem('userData'));
      this.userName = obj.username;
      console.log(this.userName);
    } else {
      this.isLoggedin = false;
    }
  }

  logout() {
    const obj = JSON.parse(localStorage.getItem('userData'));
    this.appService.logoutUser(obj.key).subscribe(res => {
      localStorage.removeItem('userData');
      this.isLoggedin = false;
      this.router.navigate(['/signin']);
    });

  }
}

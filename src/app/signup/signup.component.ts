import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signinForm: FormGroup;
  constructor( private router: Router,
               private snackBar: MatSnackBar,
               private appService: AppService,
               private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get fetchData() { return this.signinForm.controls; }

  onSubmit() {
    if (this.signinForm.invalid) {
      return;
    }
    const data = {
      username: this.signinForm.value.username,
      credential: this.signinForm.value.password
    };

    this.appService.signinUser(data).subscribe(
      (res) => {
        if (res.errorBean == null) {
          this.router.navigate(['dashboard']);
          localStorage.setItem('userData', JSON.stringify(res));
          this.appService.passData(true);
          this.snackBar.open('logged in Successfully', 'Done', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else {
          this.snackBar.open(res.errorBean.dataBean[0].value, 'close', {
            duration: 2000
          });
        }
      },
      (err) => {
        // this.loading = false;
        this.snackBar.open('something went wrong', 'close', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    );
  }

}

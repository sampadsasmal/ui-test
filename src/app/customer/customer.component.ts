import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup;
  constructor(
    private appService: AppService ,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  get fetchData() { return this.customerForm.controls; }

  onSubmit() {
    if (this.customerForm.invalid) {
      return;
    }

    const data = {
      customerName: this.customerForm.value.name,
      customerAge: this.customerForm.value.age,
      customerAddress: this.customerForm.value.address,
    };
    this.appService.customerDetailsAdd(data).subscribe(
      (res) => {
        this.snackBar.open('Data submitted successfully', 'Done');
        this.customerForm.reset();
      },
      (err) => {
        this.snackBar.open('Error occerd!!', 'Close');
      }
    );
  }

}

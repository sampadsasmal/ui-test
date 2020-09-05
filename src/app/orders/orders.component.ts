import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  items: any;
  loader = true;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getCustomerDetails().subscribe(data => {
     this.items = data;
     this.loader = false;
    });
  }

}

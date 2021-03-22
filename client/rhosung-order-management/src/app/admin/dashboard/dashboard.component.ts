import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/email.service';
import { ItemService } from 'src/app/item.service';
import { OrderService } from 'src/app/order.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orderList:any[] = [];
  currDate:Date = new Date();
  constructor(
    private _userService:UserService,
    private _itemService:ItemService,
    private _orderService:OrderService,
    private _emailService:EmailService
  ) { 

  }

  sendStatusEmail(to:string, status:string){
    this._emailService.sendStatusEmail(to, status).then((resolve)=>{
      if(resolve == null){
        alert("Failed to send email!");
      }else{
        alert(resolve);
      }
    })
  }

  getStatus(date:any){
    let currDate = new Date();
    var orderDate;

    if(date instanceof Date){
      orderDate = date;
    }else{
      orderDate = new Date(date);
    }

    let timeDiff = currDate.getTime() - orderDate.getTime();
    let dayDiff = timeDiff / (1000 * 3600 * 24);

    console.log(dayDiff);
    if(dayDiff < 1){
      return "In Progress";
    }else if(dayDiff < 2){
      return "Dispatched";
    }else{
      return "Delivered";
    }
  }

  ngOnInit(): void {
    this._orderService.getOrders().subscribe((data)=>{
      for(let o of data){
        let user = JSON.parse(o.user);
        let item = JSON.parse(o.item);
        console.log("parsed user", user);
        console.log("parsed item", item);
        this.orderList.push({user:user, item:item, date:o.date})
      }
      console.log(this.orderList);
    })
  }

}

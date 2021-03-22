import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { OrderService } from '../order.service';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})

export class OrderFormComponent implements OnInit {
  orderForm:FormGroup;
  itemList:[];
  selectedItem:any|null;
  errorMsg:string;
  submitted:boolean;
  constructor(
    private _formBuilder:FormBuilder, 
    private _itemService:ItemService, 
    private _orderService:OrderService,
    private router:Router
  ) 
  {
    this.orderForm = _formBuilder.group({
        userName: ['',[Validators.required]],
        userEmail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        userAddress: ['', [Validators.required]],

      },
      {
        updateOn:'change'
      }
    )
    this.itemList = [];
    this.errorMsg = "";
    this.submitted = false;
    this.selectedItem = null;
  }

  setSelected(item:any){
    console.log(item);
    this.selectedItem = item;
  }

  orderSubmit(){
    if(this.orderForm.invalid || this.selectedItem == null){
      this.errorMsg = "Please type in correct information.";
      return;
    }else{
      this.errorMsg = "";

      let name = this.orderForm.get('userName')?.value;
      let email = this.orderForm.get('userEmail')?.value;
      let address = this.orderForm.get('userAddress')?.value;

      let user = {
        name: name,
        email: email,
        address: address
      }

      let item = this.selectedItem;

      console.log(user, item);

      this._orderService.postOrder(user,item).then((resolve)=>{
        console.log(resolve);
        if(resolve === undefined){
          this.errorMsg = "Order rejected. Please try again.";
        }else{
          alert("Order successfully placed!");
          this.router.navigate(['/success']);

        }
      })
    }
  }

  ngOnInit(): void {
    this._itemService.getItems().subscribe({
      next: data => {
        console.log(data);
        this.itemList = data;
      },
      error: error => {
        
      }
    })
  }

}

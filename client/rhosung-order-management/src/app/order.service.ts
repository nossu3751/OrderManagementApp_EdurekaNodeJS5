import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from './item.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url:string;
  constructor(private http:HttpClient, private _itemService:ItemService, private _userService:UserService) { 
    this.url = "http://localhost:8002/order";
  }

  getOrders():Observable<any>{
    return this.http.get(this.url);
  }

  postOrder(user:any,item:any):Promise<any>{
    let itemId = item._id;
    return new Promise((resolve)=>{
      this._userService.getUser(user).then((userData)=>{
        if(userData === undefined){
          this._userService.postUser(user).then((postedUser)=>{
            let order = {
              userId:postedUser._id,
              itemId:itemId
            }
            this.http.post(this.url, order).subscribe((data)=>{
              resolve(data);
            })
          })
        }else{
          let order = {
            userId:userData._id,
            itemId:itemId
          };
          this.http.post(this.url, order).subscribe((data)=>{
            resolve(data);
          })
        }
      })
    })
  }
}

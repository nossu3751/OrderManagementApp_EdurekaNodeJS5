import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url:string;
  constructor(private http:HttpClient) { 
    this.url = "http://localhost:8002/item"
  }

  getItems():Observable<any>{
    return this.http.get(this.url);
  }

  postItems(item:any):Promise<any>{
    return new Promise((resolve)=>{
      this.http.post(this.url, item).subscribe({
        next: data => {
          console.log("successfully posted!");
          resolve(data);
        },
        error: error => {
          console.log(error);
          resolve(error);
        }
      })
    })
  }
}

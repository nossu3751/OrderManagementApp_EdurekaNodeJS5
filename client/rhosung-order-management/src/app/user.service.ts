import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string;
  constructor(private http:HttpClient) { 
    this.url = "http://localhost:8002/user"
  }

  getUsers():Observable<any>{
    return this.http.get(this.url);
  }

  getUserById(id:string):Promise<any>{
    return new Promise((resolve)=>{
      this.getUsers().subscribe((data)=>{
        let targetUser = data.find(
          (u:any)=>(
            u.id === id
          )
        );
        if(targetUser === undefined){
          resolve(null);
        }else{
          resolve(targetUser);
        }
      })
    })
  }

  getUser(user:any):Promise<any>{
    return new Promise((resolve)=>{
      this.getUsers().subscribe((data)=>{
        let targetUser = data.find(
          (u:any) => (
            u.name === user.name && u.email === user.email
          )
        );
        if(targetUser === undefined || targetUser == null){
          resolve(undefined);
        }else{
          resolve(targetUser);
        }
      })
    })
  }

  postUser(user:any):Promise<any>{
    return new Promise((resolve)=>{
      this.http.post(this.url, user).subscribe((data)=>{
        resolve(data);
      })
    })
  }
}


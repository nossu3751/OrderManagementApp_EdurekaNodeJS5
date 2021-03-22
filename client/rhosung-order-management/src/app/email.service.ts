import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url:string;
  constructor(private http:HttpClient) { 
    this.url = "http://localhost:8002/email"
  }

  sendStatusEmail(to:string, status:string):Promise<any>{
    return new Promise((resolve)=>{
      let msg = {
        to: to,
        from: 'rhosungpark@gmail.com',
        subject: 'Your packages status',
        text: `Your package is currently ${status}.`
      }
  
      this.http.post(this.url, msg).subscribe((data)=>{
        resolve(`Email sent to ${to}!`);
      },(error)=>{
        resolve(null);
      })

    })
  }
}

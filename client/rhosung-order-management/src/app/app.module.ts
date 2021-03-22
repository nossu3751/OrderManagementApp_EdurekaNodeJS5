import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';


const ROUTES: Routes = [
  {path:'', component:OrderFormComponent},
  {path:'success', component:OrderSuccessComponent},
  {path:'admin', component:DashboardComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    OrderFormComponent,
    OrderSuccessComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule, routingcomponents } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
// import{Service1Service} from './service1.service';
import { Service1Service } from './service1.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BuyclassComponent } from './buyclass/buyclass.component';
import { TableComponent } from './buyclass/table/table.component';
import { TableRowComponent } from './buyclass/table-row/table-row.component';

import { RegisterdataComponent } from './registerdata/registerdata.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { ToastrModule } from 'ngx-toastr';
import { ChatComponent } from './chat/chat.component';
import { GroupchatComponent } from './groupchat/groupchat.component';

// import '~ngx-toastr/toastr.css';
 
// // bootstrap style toast 
// // or import a bootstrap 4 alert styled design (SASS ONLY) 
// // should be after your bootstrap imports, it uses bs4 variables, mixins, functions 
// import '~ngx-toastr/toastr-bs4-alert';
 
// // if you'd like to use it without importing all of bootstrap it requires 
// import '~bootstrap/scss/functions';
// import '~bootstrap/scss/variables';
// import '~bootstrap/scss/mixins';
// import '~ngx-toastr/toastr-bs4-alert';

const myRoots: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' , canActivate: 
  [AuthGuard]},
  { path: '/register', component: RegisterComponent },
  { path: '/login', component: LoginComponent},
  { path: '/Welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  { path: '/buyclass', component: BuyclassComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    routingcomponents,
    RegisterComponent,
    WelcomeComponent,
    LoginComponent,
    BuyclassComponent,
    TableComponent,
    TableRowComponent,
    RegisterdataComponent,
    ChatComponent,
    GroupchatComponent,
   
  
   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,CommonModule,ToastrModule

  ],
  providers: [Service1Service,AuthService,AuthGuard],
  bootstrap: [AppComponent,]
  
})
export class AppModule { }



import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BuyclassComponent } from './buyclass/buyclass.component';
import { RegisterdataComponent } from './registerdata/registerdata.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import 'node_modules/ngx-toastr/toastr.css';
import { GroupchatComponent } from './groupchat/groupchat.component';


const routs:Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'welcome',component:WelcomeComponent, canActivate:[AuthGuard]},
  {path:'buyclass',component:BuyclassComponent,canActivate:[AuthGuard]},
  {path:"registerdata",component:RegisterdataComponent},
  {path :"groupchat",component:GroupchatComponent},
  {path:'chat',component:ChatComponent,},
  


];
@NgModule({
  imports:[RouterModule.forRoot(routs),CommonModule,BrowserAnimationsModule, ToastrModule.forRoot(),],
  exports: [ RouterModule ,CommonModule,BrowserAnimationsModule, ToastrModule, ],

})
  

export class AppRoutingModule {}
export const routingcomponents = [RegisterComponent,LoginComponent,WelcomeComponent,BuyclassComponent,RegisterdataComponent,ChatComponent]

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import {LoadingService} from './loading/loading.service';
import {AlertService} from './alert/alert.service';
import {UserService} from './users/user.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {DataTableModule} from 'angular-6-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PostsComponent,
    AlertComponent,
    HeaderComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LoadingService, AlertService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

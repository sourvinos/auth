import { WeatherComponent } from './weather/weather.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTablesModule } from 'angular-datatables';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { JwtInterceptor } from './helpers/jwt.Interceptor';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'
import { MomentModule } from 'angular2-moment'

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        AccessDeniedComponent,
        WeatherComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ModalModule.forRoot(),
        MomentModule,
        NgIdleKeepaliveModule.forRoot(),
        DataTablesModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = []

@NgModule({
    imports: [RouterModule.forRoot([
        { path: '', component: HomeComponent, pathMatch: 'full' },
        { path: "home", component: HomeComponent },
        { path: 'products', loadChildren: './products/products.module#ProductsModule' },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'weather', component: WeatherComponent, canActivate: [AuthGuardService] },
        { path: 'access-denied', component: AccessDeniedComponent },
        { path: '**', redirectTo: '/home' }
    ])],
    exports: [RouterModule]
})

export class AppRoutingModule { }

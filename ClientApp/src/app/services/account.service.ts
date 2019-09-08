import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class AccountService {

    // Variables
    private baseUrlRegister: string = "/api/account/register";
    private baseUrlToken: string = "/api/token/auth";

    private UserName = new BehaviorSubject<string>(localStorage.getItem('username'));
    private UserRole = new BehaviorSubject<string>(localStorage.getItem('userRole'));

    private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());

    // Constructor
    constructor(private http: HttpClient, private router: Router) { }

    // Method - Register
    register(username: string, password: string, email: string) {

        return this.http.post<any>(this.baseUrlRegister, { username, password, email }).pipe(map(result => {
            return result;
        }, (error: any) => {
            return error;
        }));

    }

    // Helper: Called from jwt.interceptor.ts
    getNewRefreshToken(): Observable<any> {

        let username = localStorage.getItem('username');
        let refreshToken = localStorage.getItem('refreshToken');

        const grantType = "refresh_token";

        return this.http.post<any>(this.baseUrlToken, { username, refreshToken, grantType }).pipe(
            map(result => {
                if (result && result.authToken.token) {
                    this.loginStatus.next(true);
                    localStorage.setItem('loginStatus', '1');
                    localStorage.setItem('jwt', result.authToken.token);
                    localStorage.setItem('username', result.authToken.username);
                    localStorage.setItem('expiration', result.authToken.expiration);
                    localStorage.setItem('userRole', result.authToken.roles);
                    localStorage.setItem('refreshToken', result.authToken.refresh_token);
                }
                return <any>result;
            })
        );

    }

    // Login
    login(username: string, password: string) {

        const grantType = "password";

        return this.http.post<any>(this.baseUrlToken, { username, password, grantType }).pipe(
            map(result => {
                if (result && result.authToken.token) {
                    this.loginStatus.next(true);
                    localStorage.setItem('loginStatus', '1');
                    localStorage.setItem('jwt', result.authToken.token);
                    localStorage.setItem('username', result.authToken.username);
                    localStorage.setItem('expiration', result.authToken.expiration);
                    localStorage.setItem('userRole', result.authToken.roles);
                    localStorage.setItem('refreshToken', result.authToken.refresh_token);
                    this.UserName.next(localStorage.getItem('username'));
                    this.UserRole.next(localStorage.getItem('userRole'));
                }
                return result;
            })
        );
    }

    // Logout
    logout() {

        this.loginStatus.next(false);

        localStorage.removeItem('jwt');
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
        localStorage.removeItem('expiration');
        localStorage.setItem('loginStatus', '0');

        this.router.navigate(['/login']);

    }

    // Private
    private checkLoginStatus(): boolean {

        var loginCookie = localStorage.getItem("loginStatus");

        if (loginCookie == "1") {
            if (localStorage.getItem('jwt') != null || localStorage.getItem('jwt') != undefined) {
                return true;
            }
        }

        return false;

    }

    // Property
    get isLoggedIn() {
        return this.loginStatus.asObservable();
    }

    // Property
    get currentUserName() {
        return this.UserName.asObservable();
    }

    // Property
    get currentUserRole() {
        return this.UserRole.asObservable();
    }

}

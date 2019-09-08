import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { AccountService } from '../services/account.service'

@Injectable({ providedIn: 'root' })

export class AuthGuardService implements CanActivate {

    // Constructor
    constructor(private acct: AccountService, private router: Router) { }

    // Method
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.acct.isLoggedIn.pipe(take(1), map((loginStatus: boolean) => {
            const destination: string = state.url
            const productId = route.params.id

            if (!loginStatus) {
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
                return false
            }

            switch (destination) {
                case '/products':
                case '/products/' + productId:
                    {
                        if (localStorage.getItem("userRole") === "Customer" || localStorage.getItem("userRole") === "Admin" || localStorage.getItem("userRole") === "Moderator") {
                            return true
                        }
                    }
                case '/products/update':
                    {
                        if (localStorage.getItem("userRole") === "Customer" || localStorage.getItem("userRole") === "Moderator") {
                            this.router.navigate(['/access-denied'])
                            return false
                        }

                        if (localStorage.getItem("userRole") === "Admin") {
                            return true
                        }

                    }
                case '/weather':
                    return true
                default:
                    return false
            }

        }))

    }

}

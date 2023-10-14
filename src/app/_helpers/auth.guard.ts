import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AccountService } from '@app/_services';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

    constructor(private router: Router, private accountService: AccountService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user) {
            return true;
        }

        this.router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}})
        return false;
    }


}
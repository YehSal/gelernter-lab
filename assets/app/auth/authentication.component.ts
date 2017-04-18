import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
    selector: 'app-authentication',
    template: `
        <div class="eight wide column">
            <div class="ui raised segment">
                <header class="spacing">
                    <nav>
                        <ul class="nav nav-tabs">
                            <li routerLinkActive="active">
                                <a [routerLink]="['signup']">Sign up</a>
                            </li>
                            <li routerLinkActive="active" *ngIf="!isLoggedin()">
                                <a [routerLink]="['signin']">Sign in</a>
                            </li>
                            <li routerLinkActive="active" *ngIf="isLoggedin()">
                                <a [routerLink]="['logout']">Log out</a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div class="row spacing">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
        <div class="grey column"></div>
    `
})

export class AuthenticationComponent {
    constructor(private authService: AuthService) {}

    isLoggedin() {
        return this.authService.isLoggedin();
    }
}

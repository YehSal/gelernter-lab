import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    selector: 'app-logout',
    template: `
        <div class="row">
            <div class="column">
                <br>
                <button class="btn btn-danger" (click)="onLogout()">Log out</button>
            </div>
        </div>
    `
})

export class LogoutComponent {
    constructor(private authService: AuthService, private router: Router) {}

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
    }
}

import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
        <header class="row">
            <ul class="nav nav-pills">
                <li routerLinkActive="active">
                    <a [routerLink]="['/contents']">Contents</a>
                </li>
                <li routerLinkActive="active">
                    <a [routerLink]="['/auth']">Authentication</a>
                </li>
            </ul>
        </header>
    `
})

export class HeaderComponenet {

}

import { Component } from '@angular/core';

@Component({
    selector: 'app-contents',
    template: `
        <div class="row">
            <app-content-input></app-content-input>
        </div>
        <hr>
        <div class="row">
            <app-content-list></app-content-list>
        </div>
    `

})

export class ContentsComponent {

}

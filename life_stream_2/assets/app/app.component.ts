import { Component, Input } from '@angular/core';

import { ContentService } from './contents/content.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [ContentService]
})

export class AppComponent {

}

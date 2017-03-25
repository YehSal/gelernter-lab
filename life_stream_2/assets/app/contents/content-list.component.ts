
import { Component, OnInit } from '@angular/core';

import { Content } from './content.model';
import { ContentService } from './content.service';

@Component({
    selector: 'app-content-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-content
                [content]="content"
                *ngFor="let content of contents"></app-content>
        </div>
    `,
})

export class ContentListComponent implements OnInit {
    contents: Content[];

    constructor(private contentService: ContentService) {}

    ngOnInit() {
        this.contentService.getMessages()
            .subscribe(
                (contents: Content[]) => {
                    this.contents = contents
                }
            );
    }
}

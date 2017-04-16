
import { Component, OnInit } from '@angular/core';

import { Content } from './content.model';
import { ContentService } from './content.service';

@Component({
    selector: 'app-content-list',
    templateUrl: './content-list.component.html',
    styles: [`
        .container {
            overflow: scroll;
            white-space: nowrap;
            height: 400px;
            width: 1000px;
        }
    `]
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
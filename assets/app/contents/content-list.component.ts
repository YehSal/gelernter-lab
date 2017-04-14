
import { Component, OnInit } from '@angular/core';

import { Content } from './content.model';
import { ContentService } from './content.service';

@Component({
    selector: 'app-content-list',
    templateUrl: './content-list.component.html'
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
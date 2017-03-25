
import { Component, Input } from '@angular/core';

import { Content } from './content.model';
import { ContentService } from './content.service';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12-px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})

export class ContentComponent {
    @Input() content: Content;

    constructor(private contentService: ContentService) {}

    onEdit() {
        this.contentService.editMessage(this.content)
    }

    onDelete() {
        this.contentService.deleteMessage(this.content)
            .subscribe(
                result => console.log(result)
            );
    }
}

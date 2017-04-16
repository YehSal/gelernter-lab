
import { Component, Input, OnInit } from '@angular/core';

import { Content } from './content.model';
import { ContentService } from './content.service';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styles: [`
        
        :host {
            display: inline-block;
            *display: inline; /*For IE7*/
            *zoom:1; /*For IE7*/
            vertical-align: top;
            width: 250px;
            white-space: normal;
        }
        .container {
            height: 250px;
            width: 250px;
        }
        .author {
            display: block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
        .img-thumbnail {
            display: block;
            width:  150px;
            height: 150px;
            margin: auto;
        }

        /* Grow */
        .hvr-grow {
            display: inline-block;
            vertical-align: middle;
            transform: translateZ(0);
            box-shadow: 0 0 1px rgba(0, 0, 0, 0);
            backface-visibility: hidden;
            -moz-osx-font-smoothing: grayscale;
            transition-duration: 0.3s;
            transition-property: transform;
        }

        .hvr-grow:hover,
        .hvr-grow:focus,
        .hvr-grow:active {
            transform: scale(1.1);
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
                result => console.log(result),
                error => console.log(error)
            );
    }

    belongsToUser() {
        return localStorage.getItem('userId') == this.content.userId;
    }
}

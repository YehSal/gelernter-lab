
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
        .textcenter {
            text-align:center;
        }
        .container {
            height: 250px;
            width: 250px;
        }
        .author {
            display: block;
            font-style: italic;
            font-size: 12px;
            text-align: center;
            width: 80%;
        }
        .config {
            font-size: 12px;
            width: 19%;
        }
        .img-thumbnail {
            display: block;
            width:  150px;
            height: 150px;
            margin: auto;
        }
        .panel{

        }
        .panel-default{

        }

        /* Grow */
        .hvr-grow {
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

    // onDownload(uri, name) {
    //     var link = document.createElement("a");
    //     link.download = this.content.name;
    //     link.href = this.content.file;
    //     link.click();
    // }

    belongsToUser() {
        return localStorage.getItem('userId') == this.content.userId;
    }
}

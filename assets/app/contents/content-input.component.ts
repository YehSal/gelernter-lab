import { Component, OnInit } from '@angular/core';

import { ContentService } from './content.service';
import { Content } from './content.model';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-content-input',
    templateUrl: './content-input.component.html',
})

export class ContentInputComponent implements OnInit {
    content: Content;

    constructor(private contentService: ContentService) {}

    onSubmit(form: NgForm) {
        if (this.content) {
            // edit
            this.content.name = form.value.name;
            this.contentService.updateMessage(this.content)
                .subscribe(
                    result => console.log(result)
                );
            this.content = null;
        } else {
            const content = new Content(form.value.name, 'Yehia');
            this.contentService.addMessage(content)
                .subscribe(
                    data => console.log(data),
                    error => console.log(error)
                );
        }
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.content = null;
        form.resetForm();
    }

    ngOnInit() {
        this.contentService.contentIsEdit.subscribe(
            (content: Content) => this.content = content
        );
    }
}

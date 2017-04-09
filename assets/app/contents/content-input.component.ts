import { Component, OnInit } from '@angular/core';

import { ContentService } from './content.service';
import { Content } from './content.model';
import { NgForm } from '@angular/forms';
import { FileUploader } from "ng2-file-upload";

const URL = 'http://localhost:3001/upload';

@Component({
    selector: 'app-content-input',
    templateUrl: './content-input.component.html',
})

export class ContentInputComponent implements OnInit {
    content: Content;

    public uploader: FileUploader = new FileUploader({url: URL});

    constructor(private contentService: ContentService) {
    }

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
            this.uploader.uploadAll();
            this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                response = JSON.parse(response);
                const content = new Content(form.value.name, 'User');
                content.tags = form.value.tags;
                content.file = response.obj.path;
                this.contentService.addMessage(content)
                    .subscribe(
                        data => console.log(data),
                        error => console.log(error)
                    );
                form.resetForm();
            };
        }
    }

    onClear(form: NgForm) {
        this.content = null;
        form.resetForm();
        this.uploader.clearQueue();
    }

    ngOnInit() {
        this.contentService.contentIsEdit.subscribe(
            (content: Content) => this.content = content
        );
    }
}




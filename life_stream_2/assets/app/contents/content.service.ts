import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

import { Content } from "./content.model";

@Injectable()

export class ContentService {
    private contents: Content[] = [];
    contentIsEdit = new EventEmitter<Content>();

    constructor(private http: Http){}

    addMessage(message: Content) {
        this.contents.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/content', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getMessages() {
        return this.http.get('http://localhost:3000/content')
            .map((response: Response) => {
                const contents = response.json().obj;
                let transformedContents: Content[] = [];
                for (let content of contents) {
                    transformedContents.push(new Content(content.name, 'Dummy', content.id, null));
                }
                this.contents = transformedContents;
                return transformedContents;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    updateMessage(content: Content) {

    }

    editMessage(content: Content) {
        this.contentIsEdit.emit(content);
    }

    deleteMessage(message: Content) {
        this.contents.splice(this.contents.indexOf(message), 1);
    }
}

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
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/content', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const content = new Content(result.obj.name, 'Dummy', result.obj._id, null);
                this.contents.push(content);
                return content;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getMessages() {
        return this.http.get('http://localhost:3000/content')
            .map((response: Response) => {
                const contents = response.json().obj;
                let transformedContents: Content[] = [];
                for (let content of contents) {
                    transformedContents.push(new Content(content.name, 'Dummy', content._id, null));
                }
                this.contents = transformedContents;
                return transformedContents;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    updateMessage(content: Content) {
        const body = JSON.stringify(content);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://localhost:3000/content/' + content.contentId, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));

    }

    editMessage(content: Content) {
        this.contentIsEdit.emit(content);
    }

    deleteMessage(content: Content) {
        this.contents.splice(this.contents.indexOf(content), 1);
        return this.http.delete('http://localhost:3000/content/' + content.contentId)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}
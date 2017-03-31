import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

import { Content } from "./content.model";
import { ErrorService } from "../errors/error.service";

@Injectable()

export class ContentService {
    private contents: Content[] = [];
    contentIsEdit = new EventEmitter<Content>();

    constructor(private http: Http, private errorService: ErrorService){}

    addMessage(message: Content) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/content' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const content = new Content(
                    result.obj.name,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id);
                this.contents.push(content);
                return content;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getMessages() {
        return this.http.get('http://localhost:3000/content')
            .map((response: Response) => {
                const contents = response.json().obj;
                let transformedContents: Content[] = [];
                for (let content of contents) {
                    transformedContents.push(new Content(
                        content.name,
                        content.user.firstName,
                        content._id,
                        content.user._id
                    ));
                }
                this.contents = transformedContents;
                return transformedContents;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateMessage(content: Content) {
        const body = JSON.stringify(content);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('http://localhost:3000/content/' + content.contentId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    editMessage(content: Content) {
        this.contentIsEdit.emit(content);
    }

    deleteMessage(content: Content) {
        this.contents.splice(this.contents.indexOf(content), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete('http://localhost:3000/content/' + content.contentId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}

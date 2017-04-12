import { EventEmitter } from "@angular/core";

import { Error } from './error.model';

export class ErrorService {
    errorOccurred = new EventEmitter<Error>();

    handleError(error: any) {
        console.log("Error handled");
        // const errorData = new Error(error.title, error.message);
        // this.errorOccurred.emit(errorData);
    }

}
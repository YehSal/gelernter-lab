import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContentComponent } from "./content.component";
import { ContentListComponent } from "./content-list.component";
import { ContentInputComponent } from "./content-input.component";
import { ContentsComponent } from "./contents.component";
import { ContentService } from "./content.service";
import { FileDropDirective, FileSelectDirective} from "ng2-file-upload";


@NgModule({
    declarations: [
        ContentComponent,
        ContentListComponent,
        ContentInputComponent,
        ContentsComponent,
        FileSelectDirective,
        FileDropDirective
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [ContentService]
})

export class ContentModule {

}

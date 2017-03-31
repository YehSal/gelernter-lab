import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ContentModule } from './contents/content.module';
import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponenet } from "./header.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";



@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponenet,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        ContentModule
    ],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})

export class AppModule {

}

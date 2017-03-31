import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ContentModule } from './contents/content.module';

import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponenet } from "./header.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";



@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponenet,
    ],
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        ContentModule
    ],
    bootstrap: [AppComponent],
    providers: [AuthService]

})

export class AppModule {

}

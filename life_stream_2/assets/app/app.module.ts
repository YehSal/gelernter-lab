import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from "./app.component";
import { ContentComponent } from "./contents/content.component";
import { ContentListComponent } from "./contents/content-list.component";
import { ContentInputComponent } from "./contents/content-input.component";
import { ContentsComponent } from "./contents/contents.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponenet } from "./header.component";
import { routing } from "./app.routing";
import { LogoutComponent } from "./auth/logout.component";
import { SigninComponent } from "./auth/signin.component";
import { SignupComponent } from "./auth/signup.component";
import { AuthService } from "./auth/auth.service";



@NgModule({
    declarations: [
        AppComponent,
        ContentComponent,
        ContentListComponent,
        ContentInputComponent,
        ContentsComponent,
        AuthenticationComponent,
        HeaderComponenet,
        LogoutComponent,
        SigninComponent,
        SignupComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule
    ],
    bootstrap: [AppComponent],
    providers: [AuthService]

})

export class AppModule {

}

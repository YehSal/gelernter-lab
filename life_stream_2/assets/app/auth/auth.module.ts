import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { LogoutComponent } from "./auth/logout.component";
import { SigninComponent } from "./auth/signin.component";
import { SignupComponent } from "./auth/signup.component";
import { authRouting } from "./auth.routing";

@NgModule({
    declarations: [
        LogoutComponent,
        SigninComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        authRouting

    ],
    providers: [AuthService]
})

export class AuthModule {

}

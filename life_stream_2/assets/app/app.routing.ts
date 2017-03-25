import { Routes, RouterModule } from "@angular/router";

import { ContentsComponent } from "./contents/contents.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes"

const APP_ROUTES: Routes =  [
    { path: '', redirectTo: '/contents', pathMatch: 'full' },
    { path: 'contents', component: ContentsComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);

import { Routes, RouterModule } from "@angular/router";

import { ContentsComponent } from "./contents/contents.component";
import { AuthenticationComponent } from "./auth/authentication.component";

const APP_ROUTES: Routes =  [
    { path: '', redirectTo: '/contents', pathMatch: 'full' },
    { path: 'contents', component: ContentsComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);

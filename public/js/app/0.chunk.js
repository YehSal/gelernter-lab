webpackJsonp([0],{

/***/ 985:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(87);
var forms_1 = __webpack_require__(433);
var auth_routing_1 = __webpack_require__(990);
var logout_component_1 = __webpack_require__(986);
var signin_component_1 = __webpack_require__(987);
var signup_component_1 = __webpack_require__(988);
var AuthModule = (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        core_1.NgModule({
            declarations: [
                logout_component_1.LogoutComponent,
                signin_component_1.SigninComponent,
                signup_component_1.SignupComponent,
            ],
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                auth_routing_1.authRouting
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;


/***/ },

/***/ 986:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(434);
var auth_service_1 = __webpack_require__(281);
var LogoutComponent = (function () {
    function LogoutComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    LogoutComponent.prototype.onLogout = function () {
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
    };
    LogoutComponent = __decorate([
        core_1.Component({
            selector: 'app-logout',
            template: "\n        <div class=\"col-md-8 col-md-offset-2\">\n            <button class=\"btn btn-danger\" (click)=\"onLogout()\">Log out</button>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof auth_service_1.AuthService !== 'undefined' && auth_service_1.AuthService) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
    ], LogoutComponent);
    return LogoutComponent;
    var _a, _b;
}());
exports.LogoutComponent = LogoutComponent;


/***/ },

/***/ 987:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(433);
var router_1 = __webpack_require__(434);
var user_model_1 = __webpack_require__(989);
var auth_service_1 = __webpack_require__(281);
var SigninComponent = (function () {
    function SigninComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    SigninComponent.prototype.onSubmit = function () {
        var _this = this;
        var user = new user_model_1.User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(function (data) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            _this.router.navigateByUrl('/');
        }, function (error) { return console.error(error); });
        this.myForm.reset();
    };
    SigninComponent.prototype.ngOnInit = function () {
        var email_domain = 'yale.edu';
        this.myForm = new forms_1.FormGroup({
            email: new forms_1.FormControl(null, [
                forms_1.Validators.required,
                forms_1.Validators.pattern('^[A-Za-z0-9._%+-]+@' + email_domain + '$'),
            ]),
            password: new forms_1.FormControl(null, forms_1.Validators.required),
        });
    };
    SigninComponent = __decorate([
        core_1.Component({
            selector: 'app-signin',
            template: __webpack_require__(991)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof auth_service_1.AuthService !== 'undefined' && auth_service_1.AuthService) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
    ], SigninComponent);
    return SigninComponent;
    var _a, _b;
}());
exports.SigninComponent = SigninComponent;


/***/ },

/***/ 988:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(433);
var auth_service_1 = __webpack_require__(281);
var user_model_1 = __webpack_require__(989);
var SignupComponent = (function () {
    function SignupComponent(authService) {
        this.authService = authService;
    }
    SignupComponent.prototype.onSubmit = function () {
        var user = new user_model_1.User(this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstName, this.myForm.value.lastName);
        this.authService.signup(user)
            .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
        this.myForm.reset();
    };
    SignupComponent.prototype.ngOnInit = function () {
        var email_domain = 'yale.edu';
        this.myForm = new forms_1.FormGroup({
            firstName: new forms_1.FormControl(null, forms_1.Validators.required),
            lastName: new forms_1.FormControl(null, forms_1.Validators.required),
            email: new forms_1.FormControl(null, [
                forms_1.Validators.required,
                forms_1.Validators.pattern('^[A-Za-z0-9._%+-]+@' + email_domain + '$'),
            ]),
            password: new forms_1.FormControl(null, forms_1.Validators.required),
        });
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            template: __webpack_require__(992)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof auth_service_1.AuthService !== 'undefined' && auth_service_1.AuthService) === 'function' && _a) || Object])
    ], SignupComponent);
    return SignupComponent;
    var _a;
}());
exports.SignupComponent = SignupComponent;


/***/ },

/***/ 989:
/***/ function(module, exports) {

"use strict";
"use strict";
var User = (function () {
    function User(email, password, firstName, lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return User;
}());
exports.User = User;


/***/ },

/***/ 990:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var router_1 = __webpack_require__(434);
var signup_component_1 = __webpack_require__(988);
var signin_component_1 = __webpack_require__(987);
var logout_component_1 = __webpack_require__(986);
var AUTH_ROUTES = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signup', component: signup_component_1.SignupComponent },
    { path: 'signin', component: signin_component_1.SigninComponent },
    { path: 'logout', component: logout_component_1.LogoutComponent }
];
exports.authRouting = router_1.RouterModule.forChild(AUTH_ROUTES);


/***/ },

/***/ 991:
/***/ function(module, exports) {

module.exports = "<div class=\"col-md-8 col-md-offset-2\">\n    <form [formGroup]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n        <div class=\"form-group\">\n          <label for=\"email\"></label>\n          <input type=\"email\" class=\"form-control\" id=\"email\" placeholder=\"Email\" formControlName=\"email\">\n          <p class=\"help-block\">Help text here.</p>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"password\"></label>\n          <input type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\" formControlName=\"password\">\n          <p class=\"help-block\">Help text here.</p>\n        </div>\n        <button [disabled]=\"!myForm.valid\" class=\"btn btn-primary\" type=\"submit\">Submit</button>\n    </form>\n</div>\n";

/***/ },

/***/ 992:
/***/ function(module, exports) {

module.exports = "<div class=\"col-md-8 col-md-offset-2\">\n    <form [formGroup]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n        <div class=\"form-group\">\n          <label for=\"firstName\"></label>\n          <input type=\"text\" class=\"form-control\" id=\"firstName\" placeholder=\"First Name\" formControlName=\"firstName\">\n          <p class=\"help-block\">Help text here.</p>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"lastName\"></label>\n          <input type=\"text\" class=\"form-control\" id=\"lastName\" placeholder=\"Last Name\" formControlName=\"lastName\">\n          <p class=\"help-block\">Help text here.</p>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"email\"></label>\n          <input type=\"email\" class=\"form-control\" id=\"email\" placeholder=\"Email\" formControlName=\"email\">\n          <p class=\"help-block\">Help text here.</p>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"password\"></label>\n          <input type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\" formControlName=\"password\">\n          <p class=\"help-block\">Help text here.</p>\n        </div>\n        <button [disabled]=\"!myForm.valid\" class=\"btn btn-primary\" type=\"submit\">Submit</button>\n    </form>\n</div>\n";

/***/ }

});
//# sourceMappingURL=0.chunk.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var http_2 = require("@angular/http");
var environment_1 = require("../environment");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.userURL = environment_1.environment.userUrl;
    }
    UserService.prototype.getAll = function () {
        return this.http.get(this.userURL + "/all")
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.login = function (username, password) {
        console.log("username :: " + username);
        console.log("password :: " + password);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var param = new http_2.URLSearchParams();
        param.set('username', username);
        param.set('password', password);
        var options = new http_1.RequestOptions({ headers: headers, params: param });
        return this.http.get(this.userURL + "/login/", options)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getPolicyDetails = function (id) {
        return this.http.get(this.userURL + "/userPolicy/" + id)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.register = function (user) {
        console.log('user is :: ' + JSON.stringify(user));
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(this.userURL + "/register", JSON.stringify(user), options)
            .map(function (res) { return res.json(); });
    };
    // private helper methods
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
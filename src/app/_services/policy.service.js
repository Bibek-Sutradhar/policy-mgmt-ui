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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
var http_2 = require("@angular/http");
var environment_1 = require("../environment");
var PolicyService = /** @class */ (function () {
    function PolicyService(_http) {
        this._http = _http;
        this.policyURL = environment_1.environment.policyUrl;
    }
    PolicyService.prototype.getAllPolicies = function () {
        return this._http.get(this.policyURL + "/all")
            .map(function (res) { return res.json(); });
    };
    PolicyService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    PolicyService.prototype.savePolicy = function (policy) {
        console.log("id :: " + policy.id);
        console.log("policyName :: " + policy.policyName);
        console.log("policyDetails :: " + policy.policyDetails);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var param = new http_2.URLSearchParams();
        param.set('id', policy.id.toString());
        param.set('policyName', policy.policyName);
        param.set('policyDetails', policy.policyDetails);
        var options = new http_1.RequestOptions({ headers: headers, params: param });
        console.log(param);
        return this._http.get(this.policyURL + "/policy/addOrUpdate", options)
            .map(function (response) { return response.json(); });
    };
    PolicyService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], PolicyService);
    return PolicyService;
}());
exports.PolicyService = PolicyService;
//# sourceMappingURL=policy.service.js.map
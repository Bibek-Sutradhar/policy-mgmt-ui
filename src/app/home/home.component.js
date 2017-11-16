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
var index_1 = require("../_services/index");
var policy_service_1 = require("../_services/policy.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(userService, policyService) {
        this.userService = userService;
        this.policyService = policyService;
        this.users = [];
        //User: any = {};
        this.policies = [];
        this.userPolicies = [];
        this.policyDetails = 'Policy Details';
        this.pageTitle = 'Available Policies';
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.loadAllUsers();
        this.getPolicies();
        this.getPolicyDetails();
    };
    HomeComponent.prototype.loadAllUsers = function () {
        // this.userService.getAll().subscribe(users => { this.users = users; });
    };
    HomeComponent.prototype.getPolicies = function () {
        var _this = this;
        console.log("current user role is::", this.currentUser.role);
        this.policyService.getAllPolicies()
            .subscribe(function (policies) { return _this.policies = policies; }, function (error) { return _this.errorMessage = error; });
    };
    HomeComponent.prototype.getPolicyDetails = function () {
        var _this = this;
        console.log("current user role is::", this.currentUser.role);
        this.userService.getPolicyDetails(this.currentUser.id)
            .subscribe(function (userPolicies) { console.log(userPolicies); _this.userPolicies = userPolicies; }, function (error) { console.log(error); _this.errorMessage = error; });
    };
    HomeComponent.prototype.editPolicy = function (policy) {
        console.log('edit policy start: ' + policy.policyName);
        policy.isBeingEdited = true;
        console.log('editing policy now: ' + policy.policyName);
    };
    HomeComponent.prototype.savePolicy = function (policy) {
        console.log('Policy Name is save: ' + policy.policyName);
        console.log('Policy details in save: ' + policy.policyDetails);
        this.policyService.savePolicy(policy)
            .subscribe(function (r) {
            policy.policyUpdateMsg = r;
            policy.isBeingEdited = false;
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'home.component.html',
            styleUrls: ['home.component.css']
        }),
        __metadata("design:paramtypes", [index_1.UserService, policy_service_1.PolicyService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map
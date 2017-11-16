import { Component, OnInit } from '@angular/core';


import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { IPolicy } from '../_models/index';
import {PolicyService} from "../_services/policy.service";
import {IPolicyDetails} from "../_models/policyDetails";


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    //User: any = {};
    policies: IPolicy[]=[];
    userPolicies: IPolicyDetails [] = [];

    policyDetails: string = 'Policy Details';

    pageTitle: string = 'Available Policies';
    errorMessage: string;

    constructor(private userService: UserService, private policyService: PolicyService) {

    }

    ngOnInit() : void {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.loadAllUsers();
        this.getPolicies();
        this.getPolicyDetails();
    }
    private loadAllUsers() {
       // this.userService.getAll().subscribe(users => { this.users = users; });
    }

    getPolicies() {

        console.log("current user role is::",this.currentUser.role);
        this.policyService.getAllPolicies()
            .subscribe(
                policies => this.policies = policies,
                error => this.errorMessage = <any>error);
    }

    getPolicyDetails() {
        console.log("current user role is::",this.currentUser.role);
        this.userService.getPolicyDetails(this.currentUser.id)
            .subscribe(
                userPolicies => {console.log(userPolicies);this.userPolicies = userPolicies},
                error => {console.log(error);this.errorMessage = <any>error});
    }

    editPolicy(policy: IPolicy) {
        console.log('edit policy start: ' + policy.policyName);
        policy.isBeingEdited = true;
        console.log('editing policy now: ' + policy.policyName);
    }
    savePolicy(policy: IPolicy) {
        console.log('Policy Name is save: ' + policy.policyName);
        console.log('Policy details in save: ' + policy.policyDetails);
        this.policyService.savePolicy(policy)
            .subscribe(r => {
                policy.policyUpdateMsg = r;
                policy.isBeingEdited = false;
            });
    }
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import {UserService} from "../_services/user.service";


import {error} from "util";

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    user: any={};
    loading = false;
    returnUrl: string;
    getData: string;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService
        ){}


    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.userService.login(this.model.username, this.model.password)
            .subscribe(
                data => {

                    const user = data;
                    console.log('User in login' + user.username);
                    if(data){
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        console.log('User value is '+user)  ;
                        console.log('current user from local storage: '+localStorage.getItem('currentUser'));
                       this.router.navigate(['/home']);
                    }

                },
                error=> {
                    //console.log(error.json());
                    this.alertService.error('You are not a registered user. Register to login.');
                    this.loading = false;
                }
            )
        /*this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });*/
    }
}

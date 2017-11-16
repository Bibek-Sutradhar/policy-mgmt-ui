import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { URLSearchParams} from '@angular/http';

import { User } from '../_models/index';
import {IPolicyDetails} from '../_models/policyDetails';

import { environment} from '../../environments/environment';

@Injectable()
export class UserService {

    private userURL = environment.userUrl;
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(`${this.userURL}/all`)
            .map((response: Response) => response.json());
    }

    login(username: string, password: string ): Observable<User> {
        console.log('username :: ' + username);
        console.log('password :: ' + password);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const param = new URLSearchParams();
        param.set('username', username);
        param.set('password', password);
        const options = new RequestOptions({ headers: headers, params: param });
            return this.http.get(`${this.userURL}/login/` , options)
            .map((response: Response) => response.json());
    }

    getPolicyDetails(id: number): Observable<IPolicyDetails[]> {

        return this.http.get(`${this.userURL}/userPolicy/` + id)
            .map((res: Response) => res.json());

    }

    register(user: User): Observable<User> {

        console.log('user is :: ' + JSON.stringify(user));

        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        const options = new RequestOptions({ headers: headers});
        return this.http.put(`${this.userURL}/register`, JSON.stringify(user), options)
            .map((res: Response) => res.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

    /*responseHandler(r: any): User {

        const respUser = r.retCd === '0' ? r.user : null;
        const user = r.retCd === '0'  ? <User> ({
            userName: r.user.userName,
            role: r.user.role,
            firstName: r.user.firstName,
            lastName: r.user.lastName,
           // policies: r.user.policies
        }) : <User> ({
            userError: r.user.
        });
        return user;
    }*/
}

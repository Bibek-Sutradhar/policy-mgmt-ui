import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IPolicy} from '../_models/policy';
//import { HttpErrorResponse } from "@angular/common/http";
//import {error} from "util";
import 'rxjs/add/operator/map';
import { URLSearchParams} from '@angular/http';

import {environment} from '../../environments/environment';

@Injectable()
export class PolicyService {

    private policyURL = environment.policyUrl;

    constructor(private _http: Http) {

    }

    getAllPolicies(): Observable<IPolicy[]> {

        return this._http.get(`${this.policyURL}/all`)
            .map((res: Response) => res.json());

    }

     handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    savePolicy(policy: IPolicy) {
        console.log('id :: ' + policy.id);
        console.log('policyName :: ' + policy.policyName);
        console.log('policyDetails :: ' + policy.policyDetails);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const param = new URLSearchParams();
        param.set('id', policy.id.toString());
        param.set('policyName', policy.policyName);
        param.set('policyDetails', policy.policyDetails);
        const options = new RequestOptions({ headers: headers, params: param });
        console.log(param);
        return this._http.get(`${this.policyURL}/policy/addOrUpdate` , options)
            .map((response: Response) => response.json());
    }
}

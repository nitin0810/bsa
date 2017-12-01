import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpResponse, HttpHeaders } from '@angular/common/http';
// import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class CustomHttpService {

    constructor(private httpClient: HttpClient) { }

    getAccessToken() {

        let userId = localStorage.getItem('isStudent') === "true" ? "gulf_student:riddhi" : "gulf_management:riddhi";

        return !localStorage.getItem('access_token') ? 'Basic ' + btoa(userId) : 'Bearer ' + localStorage.getItem('access_token') || '';
    }

    addHeaders(optionalHeaders?: HttpHeaders) {

        let requestHeaders = new HttpHeaders().set('Authorization', this.getAccessToken());
        if (optionalHeaders) {
            for (const header of optionalHeaders.keys()) {
                requestHeaders = requestHeaders.append(header, optionalHeaders.get(header));
            }
        }
        return requestHeaders;
    }



    get(url: string, options?: HttpHeaders) {

        let headers = this.addHeaders(options);
        return this.httpClient.get(url, { headers: headers, observe: 'response' })
            .map(this.extractData)
            .catch(this.handleError);
    }




    extractData(res: any) {

        console.log('inside extract data', res);


        /**
        * res.json() raises exception if body is not a valid json or body is not present in response
        * that's why it is written in try block
        * */
        // console.log(res);

        try {
            return res.json();
        } catch (error) {
            return res.status;
        }
    }

    handleError(error: any) {
        console.log('inside handle error');

        console.log(error);
        let err: any = {};
        if (error instanceof Response) {

            let body;
            try {
                body = error.json();
            } catch (error) {
                body = '';
            }

            let errMsg = body.error || 'Internal server error, Try again later ';
            err.status = error.status;
            err.msg = errMsg;

            if (error.status === 0) {
                err.status = 0;
                err.msg = 'No Internet, Check Your connection Or Try again';
            }
        }
        else {
            err = error.message ? error.message : error.toString();
        }

        return Observable.throw(err);
    }

}

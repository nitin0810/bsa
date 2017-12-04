import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class GeneralService {

    constructor(private http: CustomHttpService) { }

    getMyCoursesPageInfo() {

       return this.http.get('/category');
    }

    storeCoursesDetails(coursesDetails:Array<any>){

        localStorage.setItem('coursesDetails',JSON.stringify(coursesDetails));
    }
}
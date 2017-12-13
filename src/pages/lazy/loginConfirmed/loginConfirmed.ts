import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyCoursesPage } from '../../non-lazy/myCourses/myCourses';

@IonicPage()
@Component({
    selector: 'loginConfirm',
    templateUrl: './loginConfirmed.html',
    styles: [
        `ion-icon{
    font-size:100px;
        }
        ion-card{
        background: #2196F3;   
        }`
    ]
})

export class LoginConfirmedPage {

    constructor(
        private nav: NavController,
        private navParam: NavParams,
    ) {
    }

    continueAsStudent() {
        this.nav.setRoot(MyCoursesPage);

    }


}

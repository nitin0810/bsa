import { Component } from '@angular/core';
import { IonicPage,NavController, ViewController, NavParams } from 'ionic-angular';
import {  } from 'ionic-angular/navigation/view-controller';
// import { MyCoursesPage } from '../myCourses/myCourses';

@IonicPage()
@Component({
    selector: 'signedIn',
    templateUrl: './signedIn.html',
    styles: [`ion-icon{
    font-size:100px;
        }
        ion-card{
        background: #2196F3;   
        }`]
})

export class SignedInPage {
    myParam: any;

    constructor(
        private nav: NavController,
         private navParam: NavParams,
         private viewCtrl:ViewController
    ) {
        this.myParam = navParam.get('myParam');
    }

    continueAsStudent() {
        // this.nav.setRoot(MyCoursesPage);
        // this.nav.popToRoot();
    }

    dismiss(){
        this.viewCtrl.dismiss();
    }
}

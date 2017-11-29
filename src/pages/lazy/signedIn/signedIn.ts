import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'signedIn',
    templateUrl: './signedIn.html',
    styles: [
        `ion-icon{
    font-size:100px;
        }
        ion-card{
        background: #2196F3;   
        }`
    ]
})

export class SignedInPage {
    myParam: any;

    constructor(
        private nav: NavController,
        private navParam: NavParams,
        private viewCtrl: ViewController
    ) {
        this.myParam = navParam.get('myParam');
    }

    continueAsStudent() {
        this.nav.setRoot(adfasd);
        // this.nav.popToRoot();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

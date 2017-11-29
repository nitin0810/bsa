import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'registerWithEmail',
    templateUrl: 'registerWithEmail.html'
})

export class RegisterWithEmailPage {

    constructor(
        private navParam: NavParams,
        private nav: NavController) {
    }


    signUp(registerText) {
        this.nav.push("LoginConfirmedPage",{'myParam':registerText});
    }

}

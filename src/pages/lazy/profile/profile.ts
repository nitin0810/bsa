import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { WelcomePage } from '../../non-lazy/welcome/welcome';

@IonicPage()
@Component({
    selector: 'profile',
    templateUrl: 'profile.html',
    styles:[
        `
        .circle-text{
            border-radius: 50%;
            border: 1px solid gray;
            width: 30px;
            height: 30px;
            padding: 6px;
            text-align: center;
            font-size: 12px;
        }
        `
    ]
})

export class ProfilePage {
    constructor(
        private nav: NavController
    ) { }

    openWelcomePage() {
        this.nav.setRoot(WelcomePage);
        localStorage.clear();
    }

}

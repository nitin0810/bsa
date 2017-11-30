

import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
    selector: 'no-internet',
    template: `
    <ion-header>
        <ion-navbar>
         <button ion-button menuToggle>
            <ion-icon name="menu"></ion-icon>
            </button>
        <ion-title>No Internet</ion-title>
        </ion-navbar>
    </ion-header>
         <ion-content>
            <ion-list class="no-comment">
                <ion-icon name="cloud"></ion-icon>
                <br>NO INTERNET CONNECTION
            </ion-list>
            <button ion-button color="light" icon-start class="csCenter">
                <ion-icon name="refresh"></ion-icon>Tap to retry
            </button>
        </ion-content>
            `,
    styles: [` `]
})

export class NoInternet {

    constructor(public menuCtrl: MenuController) {
        this.menuCtrl.enable(false);
    }
}
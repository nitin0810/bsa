import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, NavController } from 'ionic-angular';
import { SignedInPage } from '../signedIn/signedin';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

@IonicPage()
@Component({
    selector: 'registerWithEmail',
    templateUrl: 'registerWithEmail.html'
})

export class RegisterWithEmailPage {
    myParam: any;

    constructor(
        private viewCtrl: ViewController,
        private navParam: NavParams,
        private modalCtrl: ModalController) {
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    signUp(registerText) {
        const modal = this.modalCtrl.create("SignedInPage", { 'myParam': registerText });
        modal.present();
    }

}

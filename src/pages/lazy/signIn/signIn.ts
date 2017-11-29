import { Component } from '@angular/core';
import { IonicPage, ViewController, ModalController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'signIn',
    templateUrl: 'signIn.html'
})
export class SignInPage {

    constructor(
        private viewCtrl: ViewController,
        private navCtrl: NavController,
        private modalCtrl: ModalController,
        private params: NavParams) {

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    openForgetPasswordModal() {
        // let myModal = this.modalCtrl.create(ForgetPasswordPage);
        // myModal.present();
    }

    signIn(loginText) {
        this.navCtrl.push("LoginConfirmedPage",{'myParam':loginText});
    }
}

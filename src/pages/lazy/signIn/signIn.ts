import { Component } from '@angular/core';
import { IonicPage, ViewController, ModalController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'login',
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
        const modal =this.modalCtrl.create("SignedInPage", { 'myParam': loginText });
        modal.present();
    }
}

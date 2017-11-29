import { Component } from '@angular/core';
import { IonicPage, ModalController,ViewController, NavController, App, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'register',
  templateUrl: 'register.html'
})

export class RegisterPage {
  myParam: any;

  constructor(public viewCtrl: ViewController,public modalCtrl:ModalController, params: NavParams) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  signUp(registerText){
      const modal = this.modalCtrl.create("SignedInPage",{ 'myParam': registerText });
      modal.present();
  }

  openRegisterWithEmail(){
    
    const modal = this.modalCtrl.create("RegisterWithEmailPage");
    modal.present();
  }

}

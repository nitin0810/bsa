import { Component } from '@angular/core';
import { IonicPage,  NavController,  NavParams,MenuController } from 'ionic-angular';
import { MyCoursesPage } from '../../non-lazy/myCourses/myCourses';

@IonicPage()
@Component({
  selector: 'register',
  templateUrl: 'register.html'
})

export class RegisterPage {

  constructor(
    public params: NavParams,
    private nav: NavController,
    private menuCtrl:MenuController
  ) {
    this.menuCtrl.enable(false);
    
   }



  signUp(registerText) {

    // this.nav.push("LoginConfirmedPage",{'myParam':registerText});
  }

  openRegisterWithEmail() {

    // this.nav.push("RegisterWithEmailPage");
  }


}

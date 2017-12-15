import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomService } from '../../../services/custom.service';
import { AuthService } from '../../../services/auth.service';
import {  } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
    selector: 'signIn',
    templateUrl: 'signIn.html',
    styles:[`h3{color:#2296f3}`]
})
export class SignInPage {

    loginForm: FormGroup;
    icon: String = "eye";
    pswdInputType: string;

    constructor(
        private navCtrl: NavController,
        private menu:MenuController,
        // private events:Events,
        public formBuilder: FormBuilder,
        private customService: CustomService,
        private authService: AuthService
    ) {
        this.menu.enable(false);
        
    }

    ngOnInit() {

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {

        this.customService.showLoader("Authenticating...");
        this.authService.login(this.loginForm.value)
            .subscribe((res: any) => {
                this.loggedInSuccesfully(res);
            }, (err) => {

                this.loginFailed(err);
            });
    }


    public loggedInSuccesfully(res) {

        this.authService.saveToken(res.data.access_token);
        this.authService.saveUserDetails(res.data.userDetails);
        this.customService.hideLoader();
        this.navCtrl.push("LoginConfirmedPage");
        // this.events.publish('user:login');
        // this.setNotificationToken();
    }


    public loginFailed(err) {

        this.customService.hideLoader();
        if (err.status == 400) {

            this.customService.showToast("Invalid credentials, Enter correct Information.");
        } else {

            this.customService.showToast(err.msg);
        }
    }

    openForgetPasswordModal() {
        // let myModal = this.modalCtrl.create(ForgetPasswordPage);
        // myModal.present();
    }

    signIn(loginText) {
        this.navCtrl.push("LoginConfirmedPage", { 'myParam': loginText });
    }
}

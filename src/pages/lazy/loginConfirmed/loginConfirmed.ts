import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController, Platform } from 'ionic-angular';
import { MyCoursesPage } from '../../non-lazy/myCourses/myCourses';
import { WelcomePage } from '../../non-lazy/welcome/welcome';



@IonicPage()
@Component({
    selector: 'loginConfirm',
    templateUrl: './loginConfirmed.html',
    styles: [
        `ion-icon{
    font-size:100px;
        }
        ion-card{
        background: #2196F3;   
        }`
    ]
})

export class LoginConfirmedPage {


    unregisterBackButtonActionForAndroid: any;

    constructor(
        private nav: NavController,
        private menu: MenuController,
        private alertCtrl: AlertController,
        private platform: Platform
    ) {

        this.menu.enable(false);
    }

    continueAsStudent() {

        this.nav.setRoot(MyCoursesPage);
    }

    ionViewDidLoad() {

        if (this.platform.is('android')) {

            this.unregisterBackButtonActionForAndroid = this.platform.registerBackButtonAction(() => {

                this.alertCtrl.create({
                    title: 'Logout',
                    message: 'You will be logged out by going back.',
                    buttons: [
                        {
                            text: 'Logout',
                            role: 'cancel',
                            handler: () => {
                                this.nav.setRoot(WelcomePage);
                            }
                        },
                        {
                            text: 'Cancel',
                            handler: () => {
                            }
                        }
                    ]
                });
            });
        }
    }


    ionViewWillLeave() {
        // Unregister the custom back button action for this page
        this.unregisterBackButtonActionForAndroid && this.unregisterBackButtonActionForAndroid();
    }


}

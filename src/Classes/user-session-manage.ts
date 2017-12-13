import { AlertController, Events, App, MenuController } from 'ionic-angular';
import { AuthService } from '../services/auth.service';
import { NetworkService } from '../services/network.service';
import { MyCoursesPage } from '../pages/non-lazy/myCourses/myCourses';
import { WelcomePage } from '../pages/non-lazy/welcome/welcome';
import { NoInternet } from '../pages/non-lazy/no-internet/no-internet.component';

export class UserSessionManage {

    selectedPage: string;
    rootPage: any;
    // userName: string;
    // userImage: string;

    constructor(
        public events: Events,
        public appCtrl: App,
        public authService: AuthService,
        public alertCtrl: AlertController,
        public networkService: NetworkService,
        public menu: MenuController) {

        this.handleEvents();
        this.networkService.checkNetworkStatus();
        this.hasLoggedIn();
    }

    public handleEvents() {
        this.events.subscribe('user:login', () => {
            this.login();
        });
        this.events.subscribe('session:expired', () => {
            this.sessionExpired();
        });
        this.events.subscribe('user:logout', () => {
            this.logout();
        });
        this.events.subscribe("offline", () => {
            this.offline();
        });
        this.events.subscribe("online", () => {
            this.online();
        });
        this.events.subscribe("user:image", () => {
            this.imageUpdate();
        });
    }
    

    public hasLoggedIn() {

        if (this.authService.isLoggedIn()) {
            this.rootPage = MyCoursesPage;
        } else {
            this.rootPage = WelcomePage;
        }
    }

    public login() {
        this.appCtrl.getRootNavs()[0].setRoot(MyCoursesPage);
        this.menu.enable(true);
        this.imageUpdate();
    }

    public imageUpdate() {

        // this.userImage = localStorage.getItem('picUrl');
        // this.userName = localStorage.getItem('name') || '';
    }

    public logout() {

        localStorage.clear();
        this.appCtrl.getRootNavs()[0].setRoot(WelcomePage);
    }

    public offline() {
        if (this.authService.isLoggedIn()) {

            this.appCtrl.getRootNavs()[0].setRoot(NoInternet);
        }
    }

    public online() {
        if (this.authService.isLoggedIn()) {
            this.login();
        } else {
            this.logout();
        }
    }


    public sessionExpired() {

        let alert = this.alertCtrl.create({
            title: 'Session Expired',
            message: "You're already logged in some other device. You may again login.",
            enableBackdropDismiss: false,
            buttons: [{
                text: 'Logout',
                handler: () => {
                    this.events.publish("user:logout");
                }
            }]
        });
        alert.present();
    }


}



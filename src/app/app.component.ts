import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, App, AlertController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/non-lazy/welcome/welcome';
import { MyCoursesPage } from '../pages/non-lazy/myCourses/myCourses';

import { UserSessionManage } from '../Classes/user-session-manage';
import { AuthService } from '../services/auth.service';
import { NetworkService } from '../services/network.service';

@Component({
  templateUrl: 'app.html'
})

export class MyApp extends UserSessionManage {

  @ViewChild(Nav) nav: Nav;

  pages: Array<{ title: string, component: any, icon: any }>;
userName:string;

  constructor(
    public events: Events,
    public appCtrl: App,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public networkService: NetworkService,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public menu: MenuController
  ) {

    super(events, appCtrl, authService, alertCtrl, networkService,menu);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });

    this.setSideMenuContent();
    // console.log(JSON.parse(localStorage.getItem('userInfo')));
    
    this.userName = JSON.parse(localStorage.getItem('userInfo'))?  JSON.parse(localStorage.getItem('userInfo')).fullName:'';
  }

  setSideMenuContent() {

    this.pages = [
      { title: 'My Courses', component: MyCoursesPage, icon: 'http://www.clker.com/cliparts/s/M/E/S/m/F/stack-of-paperbacks-md.png' },
      // { title: 'Categories', component: 'CourseCategoriesPage', icon: 'http://icons.iconarchive.com/icons/zerode/plump/256/Folder-Office-icon.png' },
      // { title: 'New Courses' , component: 'SidebarNewCoursesPage', icon: 'http://www.iconarchive.com/download/i85595/graphicloads/100-flat/new.ico'},
      { title: 'My Profile', component: 'ProfilePage', icon: 'http://files.softicons.com/download/toolbar-icons/blue-bits-icons-by-icojam/ico/1_001.ico' },
      { title: 'Log Out', component: WelcomePage, icon: 'http://www.iconarchive.com/download/i86072/graphicloads/100-flat-2/outside.ico' }
    ];
  }

  openPage(page) {
    if (page.title === "Log Out") {
      this.events.publish('user:logout');
    } else {
      this.nav.setRoot(page.component);
    }


  }
}


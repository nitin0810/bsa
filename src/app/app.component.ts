import { Component, ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/non-lazy/welcome/welcome';
import { MyCoursesPage } from '../pages/non-lazy/myCourses/myCourses';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = WelcomePage;
  pages: Array<{title: string, component: any, icon:any}>;
  

  constructor(
    private platform: Platform, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
  ) {




    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.setSideMenuContent();
  }

  setSideMenuContent(){

    this.pages = [
      { title: 'Categories', component: 'CourseCategoriesPage', icon: 'http://icons.iconarchive.com/icons/zerode/plump/256/Folder-Office-icon.png' },
      { title: 'My Courses', component: 'sidebarSubscribedCoursesPage', icon: 'http://www.clker.com/cliparts/s/M/E/S/m/F/stack-of-paperbacks-md.png' },
      { title: 'New Courses' , component: 'SidebarNewCoursesPage', icon: 'http://www.iconarchive.com/download/i85595/graphicloads/100-flat/new.ico'},
      { title: 'My Profile', component: 'ProfilePage', icon: 'http://files.softicons.com/download/toolbar-icons/blue-bits-icons-by-icojam/ico/1_001.ico' },
      { title: 'Log Out' , component: WelcomePage, icon: 'http://www.iconarchive.com/download/i86072/graphicloads/100-flat-2/outside.ico'}
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    (page.title==="Log Out" || page.title==="Categories" ) && this.nav.setRoot(page.component);
  }
}


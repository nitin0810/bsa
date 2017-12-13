import { Component } from '@angular/core';
import { NavController,MenuController} from 'ionic-angular';
import { MyCoursesPage } from '../myCourses/myCourses';



@Component({
    selector: 'welcome',
    templateUrl: 'welcome.html',
    styles: [`
  ion-content{
      background-image: url('assets/images/girl_boy_study.jp');
      background-size:cover;
  }
  .instructor{
      width:100px !important;
  }
  .swiper-pagination-bullet-active{
      background: white !important;
  }
  .icon{
    font-size:30px;
  }
  `]
})

export class WelcomePage {

    constructor(
         public navCtrl: NavController,
         private menuCtrl:MenuController
        ) { 
            this.menuCtrl.enable(false);
            
        }

    openRegisterPage() {
        this.navCtrl.push("RegisterPage");
    }

    openLoginPage() {
        this.navCtrl.push("SignInPage");
        
    }

    openAllCoursesPage() {
        
        // this.navCtrl.push(AllCoursesPage);
    }
}

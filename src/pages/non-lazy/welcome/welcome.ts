import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';



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

    constructor(public modalCtrl: ModalController, public navCtrl: NavController) { }

    openRegisterPage() {
        const modal = this.modalCtrl.create("RegisterPage");
        modal.present();
    }

    openLoginPage() {
        const modal = this.modalCtrl.create("LoginModule");
        modal.present();
    }

    openAllCoursesPage() {
        // this.navCtrl.push(AllCoursesPage);
    }
}

import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';


@IonicPage()
@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.html',
  styles: [
    `
    .header-toolbar{
      
          .title{
              font-weight:bold;
          }
      }   
      .circle-text{
          border-radius: 50%;
          border: 1px solid gray;
          width: 30px;
          height: 30px;
          padding: 6px;
          text-align: center;
          font-size: 12px;
      }
      progress{
        width:85%;
        margin-bottom: -5px;
    }
    ion-list{
        white-space: initial;
    }
    `
  ]
})

export class CourseDetailPage {

  course: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
    this.course = this.navParams.get('course');
  }

  openTopicPage() {

  }

}

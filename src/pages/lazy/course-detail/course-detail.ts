import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { GeneralService } from '../../../services/general.service';


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
  selectedChapter: any; // chapter of the selected topic, used for the same purpose as above


  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private generalService: GeneralService
  ) {

    this.course = this.navParams.get('course');
    this.generalService.storeTopicwiseData(this.course);
  }

  openTopicPage(topic: any, chapter: any) {

    let tempPage: string = this.generalService.getTemplatePageName(topic.pages[0].template);
    this.selectedChapter = chapter;
    this.navCtrl.push(tempPage, { 'topicId': topic.topicId });
  }

  /**update the course progress and read-status of it's topics, whenever this page is opened after reading some topic */
  ionViewWillEnter() {

    /**no need to update the progress, when this page is pushed from mycourses page */
    if (!this.selectedChapter) { return; }

    /**update courseProgress  */
    this.course.courseProgress = this.generalService.getCourseProgressById(this.course.courseId).courseProgress;
    this.course.topicViewed = this.generalService.getCourseProgressById(this.course.courseId).topicViewed;
    this.course.totalTopics = this.generalService.getCourseProgressById(this.course.courseId).totalTopics;


    /**update topics read status  */
    let topic: any;
    for (let i = 0; i < this.selectedChapter.topics.length; i++) {

      topic = this.selectedChapter.topics[i];
      topic.read = this.generalService.topicWiseData[topic.topicId].read;
    }
  }

}

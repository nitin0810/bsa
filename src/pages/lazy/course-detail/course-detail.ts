import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, IonicPage, Navbar,Platform,NavParams } from 'ionic-angular';
import { GeneralService } from '../../../services/general.service';
import { TopicCacheService } from '../../../services/topicCache.service';


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

export class CourseDetailPage implements OnInit{
  @ViewChild(Navbar) navBar: Navbar;

  course: any;
  selectedChapter: any; // chapter of the selected topic, used for the same purpose as above
  unregisterBackButtonActionForAndroid:any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private platform:Platform,
    private generalService: GeneralService,
    private topicCacheService: TopicCacheService,

  ) {

    this.course = this.navParams.get('course');
    this.generalService.storeTopicwiseData(this.course);
  }

  ngOnInit(){
 
    this.overrideBackBtnFunctionality();
  }

  openTopicPage(topic: any, chapter: any) {

    if (!(topic.pages && topic.pages.length != 0)) { return; } // to be removed in future when all chapters' data is available
    let tempPage: string = this.generalService.getTemplatePageName(topic.pages[0].template);
    this.selectedChapter = chapter;
    this.navCtrl.push(tempPage, { 'topicId': topic.topicId });
  }

  /**update the course progress & read-status of it's topics whenever this page is opened after reading some topic */
  ionViewWillEnter() {

    /**no need to update the progress, when this page is pushed from mycourses page */
    if (!this.selectedChapter) { return; }

    /**update courseProgress  */
    this.course.courseProgress = this.generalService.getCourseProgressById(this.course.courseId).courseProgress;
    this.course.topicViewed = this.generalService.getCourseProgressById(this.course.courseId).topicViewed;
    this.course.totalTopics = this.generalService.getCourseProgressById(this.course.courseId).totalTopics;


    /**update topics read-status  */
    let topic: any;
    for (let i = 0; i < this.selectedChapter.topics.length; i++) {

      topic = this.selectedChapter.topics[i];
      topic.read = this.generalService.topicWiseData[topic.topicId].read;
    }
  }

  overrideBackBtnFunctionality() {

    /**overide the defult behaviour of navbar back btn */
    this.navBar.backButtonClick = (ev: any) => {
      ev.preventDefault();
      ev.stopPropagation();
      this.topicCacheService.clearCachedData(); //extra functionality whiling popping this page
      this.navCtrl && this.navCtrl.pop();
    }

    /**handle the android hardware back btn for the same purpose*/
    if (this.platform.is('android')) {
      this.unregisterBackButtonActionForAndroid = this.platform.registerBackButtonAction(() => {

        this.topicCacheService.clearCachedData();
        this.navCtrl && this.navCtrl.pop();
      });
    }
  }

ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonActionForAndroid && this.unregisterBackButtonActionForAndroid();
}

}

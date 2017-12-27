import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, NavParams, Navbar } from 'ionic-angular';
import { CustomService } from '../../../services/custom.service';
import { GeneralService } from '../../../services/general.service';
import { BackBtnService } from '../../../services/backBtn.service';
import { TopicCacheService } from '../../../services/topicCache.service';



@IonicPage()
@Component({
    selector: 'temp_1',
    templateUrl: './template_1.html',

})
export class Template_1 {
    @ViewChild(Navbar) navBar: Navbar;
    unregisterBackButtonActionForAndroid: any;

    topic: any; //contains only the basic data for topic such as name,id template etc..
    data: any;
    constructor(
        private navParams: NavParams,
        private navCtrl: NavController,
        private generalService: GeneralService,
        private backBtnService: BackBtnService,
        private topicCacheService: TopicCacheService,
        private customService: CustomService
    ) {
        this.topic = this.generalService.getDataByTopicId(this.navParams.get('topicId'));
        this.getTopicData();
    }

    getTopicData() {

        /**first check if the topic's content is present in topicCache stored in TopicCacheService */
        let d: any = this.topicCacheService.getCachedTopicDataById(this.topic.topicId);
        if (d) {
            this.data = d;
            return;
        }

        /**if cached not found, load from server and then store in cache for future use */
        this.customService.showLoader();
        this.generalService.getTopicData(this.topic.template, this.topic.record, this.topic.topicId)
            .subscribe((res: any) => {
                this.data = res.data;
                this.topicCacheService.cacheTopicData(this.topic.topicId,res.data);
                this.updateCourseProgress();
                this.customService.hideLoader();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });


    }

    /**for showing the upated progress on course-detail page */
    updateCourseProgress() {

        if (!this.topic.read) {
            this.generalService.updateTopicReadStatus(this.topic.topicId);
            this.generalService.updateCourseProgressById(this.topic.courseId);
        }
    }


    /**COPY THESE IONVIEWDIDLOAD AND IONVIEWWILLENTER CALBACKS IN EACH TEMPLATE 
     * WHERE DEFAULT BEHAVIOUR OF NAVBAR BACK BTN IS TO BE OVERRIDEN */
    ionViewDidLoad() {
        this.backBtnService.overrideBackBtnFunctionality(this);
    }

    ionViewWillLeave() {
        // Unregister the custom back button action for this page
        this.unregisterBackButtonActionForAndroid && this.unregisterBackButtonActionForAndroid();
    }


    goToPrevTopic() {
        if (this.topic.prevTopicId) {
            let template = this.generalService.getDataByTopicId(this.topic.prevTopicId).template;
            let templatePageName = this.generalService.getTemplatePageName(template);
            this.navCtrl.push(templatePageName, { 'topicId': this.topic.prevTopicId });
        } else {
            this.goToContentPage();
        }
    }

    goToContentPage() {

        this.navCtrl.popTo(this.navCtrl.getByIndex(1));
    }

    goToNextTopic() {
        if (this.topic.nextTopicId) {
            let template = this.generalService.getDataByTopicId(this.topic.nextTopicId).template;
            let templatePageName = this.generalService.getTemplatePageName(template);
            this.navCtrl.push(templatePageName, { 'topicId': this.topic.nextTopicId });
        } else {
            this.goToContentPage();
        }
    }
}
import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, NavParams, Navbar } from 'ionic-angular';
import { CustomService } from '../../../services/custom.service';
import { GeneralService } from '../../../services/general.service';
import { BackBtnService } from '../../../services/backBtn.service';
import { TopicCacheService } from '../../../services/topicCache.service';


@IonicPage()
@Component({
    selector: 'temp_3',
    templateUrl: './template_3.html',
    styles: [`
        p{
            background:white;
        }
    `]

})
export class Template_3 {

    @ViewChild(Navbar) navBar: Navbar;
    topic: any;
    data: any;
    questAnsObject: any;
    selectedAnsObj: any = {};
    correctAnswerDescription: any;
    submitPressed: Array<boolean> = [];// store wheather each question has been aswered or not

    unregisterBackButtonActionForAndroid: any;

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

    ionViewDidLoad() {
        this.backBtnService.overrideBackBtnFunctionality(this);
    }

    ionViewWillLeave() {
        // Unregister the custom back button action for this page
        this.unregisterBackButtonActionForAndroid && this.unregisterBackButtonActionForAndroid();
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
                this.data.questionnaire && this.data.questionnaire.length != 0 && this.setquestAnsObject(this.data.questionnaire[0].questions);
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

    setquestAnsObject(questions: Array<any>) {

        this.questAnsObject = {};
        this.correctAnswerDescription = {};

        questions.forEach((ques: any, i: number) => {

            this.questAnsObject[ques.questionId] = {};
            ques.type == "MULTIPLECHOICE" && (this.selectedAnsObj[ques.questionId] = {});
            ques.oneOptionSelected = undefined; // this property will be used for enableing/disabling submit btn for multiple choice questions
            ques.options.forEach((option: any, index: number) => {

                this.questAnsObject[ques.questionId][option.optionsId] = option.isCorrect;
                /**each option has same description, hence only first option is used to extract the description for a particular question */
                index == 0 && (this.correctAnswerDescription[ques.questionId] = option.description);
            });

            this.submitPressed[i] = false;// description of each question shud remain hidden before pressing submit
        });

        // console.log('quesAns obj', this.questAnsObject);
        // console.log('selectedAnsObj', this.selectedAnsObj);

    }

    checkAnswer(question: any, index: number) {

        if (question.type == "SINGLECHOICE") {
            let selectedOptionId = this.selectedAnsObj[question.questionId];
            if (this.questAnsObject[question.questionId][selectedOptionId]) {
                question.correctOrIncorrect = "CORRECT";
                question.correctOrIncorrectIcon = "assets/icon/right.png";
            } else {
                question.correctOrIncorrect = "INCORRECT";
                question.correctOrIncorrectIcon = "assets/icon/wrong.png";
            }
        } else if (question.type == "MULTIPLECHOICE") {
            let correctOptionsObj = this.questAnsObject[question.questionId], selectedOptionsObj = this.selectedAnsObj[question.questionId];

            let correctAnswer = true;
            for (let optionId in correctOptionsObj) {

                if (correctOptionsObj[optionId] !== selectedOptionsObj[optionId]) {
                    correctAnswer = false;
                    break;
                }
            }
            if (correctAnswer) {
                question.correctOrIncorrect = "CORRECT";
                question.correctOrIncorrectIcon = "assets/icon/right.png";
            } else {
                question.correctOrIncorrect = "INCORRECT";
                question.correctOrIncorrectIcon = "assets/icon/wrong.png";
            }
        }

        this.submitPressed[index] = true;
    }

    changeSubmitBtnStatus(ques: any) {

        let oneOptionSelected = false;
        for (let optionId in this.selectedAnsObj[ques.questionId]) {
            if (this.selectedAnsObj[ques.questionId][optionId]) {
                oneOptionSelected = true;
                break;
            }
        }
        ques.oneOptionSelected = oneOptionSelected;
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
import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, NavParams, ViewController, Slides } from 'ionic-angular';
import { CustomService } from '../../../services/custom.service';
import { GeneralService } from '../../../services/general.service';


/**TEMPLATE_4 IS USED FOR FOR QUIZ */
@IonicPage()
@Component({
    selector: 'temp_4',
    templateUrl: './template_4.html',

})
export class Template_4 {

    @ViewChild(Slides) slides: Slides;
    topic: any;
    questions: Array<any>;
    nextBtnEnabled: boolean = false;
    prevBtnEnabled: boolean = false;

    questAnsObject: any;
    selectedAnsObj: any = {};
    correctAnswerDescription: any;
    submitPressed: Array<boolean> = [];// store wheather each question has been aswered or not

    constructor(
        private navParams: NavParams,
        private viewCtrl: ViewController,
        private navCtrl: NavController,
        private generalService: GeneralService,
        private customService: CustomService
    ) {
        this.topic = this.generalService.getDataByTopicId(this.navParams.get('topicId'));
        this.getTopicData();
    }

    ngAfterViewInit() {

        this.slides.lockSwipes(true);
    }

    getTopicData() {

        this.customService.showLoader();
        this.generalService.getTopicData(this.topic.template, this.topic.record, this.topic.topicId)
            .subscribe((res: any) => {
                this.questions = res.data.questions;
                this.setquestAnsObject(this.questions);
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
        this.resetBtnsStatus();
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


    onSlideChange() {
        console.log('slide changed////');

        this.resetBtnsStatus();
    }

    resetBtnsStatus() {
        let currentIndex = this.slides.getActiveIndex();
        this.nextBtnEnabled = this.submitPressed[currentIndex] && (currentIndex < this.questions.length);
        this.prevBtnEnabled = currentIndex != 0;
    }

    goToPrevQuestion() {
        this.slides.lockSwipes(false);
        this.slides.slidePrev();
        this.slides.lockSwipes(true);
    }

    goToNextQuestion() {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.nextBtnEnabled = false;
        this.slides.lockSwipes(true);

    }
}
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ModalController } from 'ionic-angular';
import { CustomService } from '../../../services/custom.service';
import { GeneralService } from '../../../services/general.service';


@IonicPage()
@Component({
    selector: 'temp_3',
    templateUrl: './template_3.html',

})
export class Template_3 {

    topic: any;
    data: any;
    questAnsObject: any;
    selectedAnsObj: any = {};
    correctAnswerDescription: any;
    submitPressed: Array<boolean> = [];// store wheather each question has been aswered or not


    constructor(
        private navParams: NavParams,
        private modalCtrl: ModalController,
        private navCtrl: NavController,
        private generalService: GeneralService,
        private customService: CustomService
    ) {
        this.topic = this.generalService.getDataByTopicId(this.navParams.get('topicId'));
        this.getTopicData();
    }

    getTopicData() {

        this.customService.showLoader();
        this.generalService.getTopicData(this.topic.template, this.topic.record)
            .subscribe((res: any) => {

                this.data = res.data;
                this.setquestAnsObject(this.data.questionnaire[0].questions);
                this.customService.hideLoader();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
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


}
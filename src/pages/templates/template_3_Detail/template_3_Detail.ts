import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ViewController } from 'ionic-angular';
import { CustomService } from '../../../services/custom.service';
import { GeneralService } from '../../../services/general.service';


@IonicPage()
@Component({
    selector: 'temp_3_Detail',
    templateUrl: './template_3_Detail.html',

})
export class Template_3_Detail {

    caseStudy: any;
    caseStudyNumber: number;
    questAnsObject: any;
    selectedAnsObj: any = {};
    correctAnswerDescription: any;
    submitPressed: Array<boolean> = [];

    constructor(
        private navParams: NavParams,
        private viewCtrl: ViewController,
        private navCtrl: NavController,
        private generalService: GeneralService
    ) {
        this.caseStudy = this.navParams.get('caseStudy');
        this.caseStudyNumber = this.navParams.get('number');
        console.log(this.caseStudy);
        if (this.caseStudy.questionnaire && this.caseStudy.questionnaire.length != 0) {

            this.setquestAnsObject(this.caseStudy.questionnaire[0].questions);
        }
    }

    setquestAnsObject(questions: Array<any>) {

        this.questAnsObject = {};
        this.correctAnswerDescription = {};

        questions.forEach((ques: any, i: number) => {

            this.questAnsObject[ques.questionId] = {};
            ques.options.forEach((option: any, index: number) => {

                this.questAnsObject[ques.questionId][option.optionsId] = option.isCorrect;
                /**each option has same description, hence only first option is used to extract the description for a particular question */
                index == 0 && (this.correctAnswerDescription[ques.questionId] = option.description);
            });

            this.submitPressed[i] = false;// description of each question shud remain hidden before pressing submit
        });

        console.log('quesAns obj', this.questAnsObject);
        console.log('descr', this.correctAnswerDescription);
    }

    checkAnswer(question: any, index: number) {

        if (question.type == "SINGLECHOICE") {
            let selectedOptionId = this.selectedAnsObj[question.questionId];
            if (this.questAnsObject[question.questionId][selectedOptionId]) {
                question.correctOrIncorrect = "CORRECT";
            } else {
                question.correctOrIncorrect = "INCORRECT";
            }
        }

        this.submitPressed[index] = true;
    }


}
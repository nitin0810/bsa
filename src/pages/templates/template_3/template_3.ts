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

    data: any;
    chapterName: string; //to show in the navbar heading
    constructor(
        private navParams: NavParams,
        private modalCtrl: ModalController,
        private navCtrl: NavController,
        private generalService: GeneralService
    ) {
        this.data = this.generalService.getDataByTopicId(this.navParams.get('topicId'));
        this.chapterName = this.navParams.get('chapterName');
    }

    openCaseStudy(caseStudy: any,numb:number) {
        this.navCtrl.push("Template_3_Detail", { 'caseStudy': caseStudy,'number': numb});
    }
}
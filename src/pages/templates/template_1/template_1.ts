import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, NavParams, Navbar } from 'ionic-angular';
import { CustomService } from '../../../services/custom.service';
import { GeneralService } from '../../../services/general.service';


@IonicPage()
@Component({
    selector: 'temp_1',
    templateUrl: './template_1.html',
    styles: [
        `
        ion-label{
            white-space:pre-line;
        }
        `
    ]

})
export class Template_1 {
    @ViewChild(Navbar) navBar: Navbar;
    topic: any;
    data: any;
    constructor(
        private navParams: NavParams,
        private navCtrl: NavController,
        private generalService: GeneralService
    ) {
        this.topic = this.generalService.getDataByTopicId(this.navParams.get('topicId'));
        this.data = this.topic.data;
    }

    ionViewDidLoad() {
        this.navBar.backButtonClick = (ev: any) => {
            console.log('asddddddddddddddddddd');
            ev.preventDefault();
            ev.stopPropagation();
            this.navCtrl && this.navCtrl.popTo(this.navCtrl.getByIndex(1));
        }
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
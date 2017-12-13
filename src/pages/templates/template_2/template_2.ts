import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, NavParams, ModalController, Navbar } from 'ionic-angular';
import { CustomService } from '../../../services/custom.service';
import { GeneralService } from '../../../services/general.service';


@IonicPage()
@Component({
    selector: 'temp_2',
    templateUrl: './template_2.html',

})
export class Template_2 {

    @ViewChild(Navbar) navBar: Navbar;
    topic: any;
    data: any;
    constructor(
        private navParams: NavParams,
        private modalCtrl: ModalController,
        private navCtrl: NavController,
        private generalService: GeneralService,
        private customService:CustomService
    ) {
        this.topic = this.generalService.getDataByTopicId(this.navParams.get('topicId'));
        this.getTopicData();
    }

    getTopicData() {

        this.customService.showLoader();
        this.generalService.getTopicData(this.topic.template, this.topic.record)
            .subscribe((res: any) => {
                this.data = res.data;
                this.customService.hideLoader();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
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
        this.navCtrl.popTo(this.navCtrl.getByIndex(0));
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

    openModel(buttonData: any) {
        const modal = this.modalCtrl.create("Template_2_modal", { 'data': { data: buttonData, type: this.data.type } });
        modal.present();
    }

}
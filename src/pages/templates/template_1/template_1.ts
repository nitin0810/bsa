import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, NavParams, Navbar } from 'ionic-angular';
import { CustomService } from '../../../services/custom.service';
import { GeneralService } from '../../../services/general.service';
import { Platform } from 'ionic-angular/platform/platform';


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
        private platform: Platform,
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
        // let a = this.platform.platforms();
        // alert(JSON.stringify(a));

        if (this.platform.is('android')) {
            console.log('ANDROID');
            this.unregisterBackButtonActionForAndroid = this.platform.registerBackButtonAction(() => {
                this.navCtrl && this.navCtrl.popTo(this.navCtrl.getByIndex(1));

            });

        }
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